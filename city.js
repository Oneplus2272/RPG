const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    currentX: 0, 
    currentY: 0,
    targetScale: 0.8, // Целевой зум для плавности
    scale: 0.8,       // Текущий зум
    
    mapSize: 2500, 
    minScale: 0.5,
    maxScale: 2.0,

    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. Океан
        if(!document.getElementById('ocean-layer')) {
            const ocean = document.createElement('div');
            ocean.id = 'ocean-layer';
            castleScreen.appendChild(ocean);
        }

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        // 2. Остров
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        const sunLight = document.createElement('div');
        sunLight.id = 'sun-light';
        this.container.appendChild(sunLight);
        
        this.viewport.appendChild(this.container);
        castleScreen.appendChild(this.viewport);

        this.applyStyles();
        this.centerMap();
        this.initEvents();
        this.animate(); // Запуск цикла плавной анимации
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #ocean-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: #1a4e66;
                background-image: radial-gradient(circle at 50% 50%, #205e7a 0%, #1a4e66 100%);
                z-index: 1;
            }

            #map-viewport {
                position: absolute;
                top: 0; left: 0; width: 100vw; height: 100vh;
                overflow: hidden;
                z-index: 2;
                perspective: 2000px;
                touch-action: none;
            }

            #city-map {
                position: absolute;
                width: ${this.mapSize}px;
                height: ${this.mapSize}px;
                background-color: #2e5a1c;
                box-shadow: 0 50px 100px rgba(0,0,0,0.6);
                transform-origin: center center;
                will-change: transform, left, top;
                border-radius: 80px;
                border: 10px solid #3d6a2a;
            }

            #sun-light {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 20%, rgba(255,255,230,0.3) 0%, transparent 80%);
                pointer-events: none;
                mix-blend-mode: overlay;
                border-radius: 80px;
            }

            #map-viewport::before {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%);
                pointer-events: none;
                z-index: 5;
            }
        `;
        document.head.appendChild(style);
    },

    centerMap() {
        this.currentX = (window.innerWidth / 2) - (this.mapSize / 2);
        this.currentY = (window.innerHeight / 2) - (this.mapSize / 2);
    },

    // Основной цикл анимации для плавного зума
    animate() {
        // Плавное приближение scale к targetScale (Lerp)
        const lerpFactor = 0.15;
        this.scale += (this.targetScale - this.scale) * lerpFactor;

        this.updatePosition();
        requestAnimationFrame(() => this.animate());
    },

    updatePosition() {
        const s = this.scale;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Динамический расчет границ: позволяем видеть воду на 20% от размера экрана
        const margin = Math.min(vw, vh) * 0.2; 

        const minX = vw - (this.mapSize * s) - margin;
        const maxX = margin;
        const minY = vh - (this.mapSize * s) - margin;
        const maxY = margin;

        // Ограничение перемещения
        if (this.currentX > maxX) this.currentX = maxX;
        if (this.currentY > maxY) this.currentY = maxY;
        if (this.currentX < minX) this.currentX = minX;
        if (this.currentY < minY) this.currentY = minY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
        // Изометрическая трансформация
        this.container.style.transform = `scale(${s}) rotateX(55deg) rotateZ(45deg)`;
    },

    initEvents() {
        const handleStart = (e) => {
            const t = e.touches ? e.touches[0] : e;
            this.isDragging = true;
            this.startX = t.pageX - this.currentX;
            this.startY = t.pageY - this.currentY;
        };

        const handleMove = (e) => {
            if (e.touches && e.touches.length === 2) {
                this.isDragging = false;
                const dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                if (this.lastDist > 0) {
                    const delta = dist / this.lastDist;
                    let nextScale = this.targetScale * delta;
                    if (nextScale >= this.minScale && nextScale <= this.maxScale) {
                        this.targetScale = nextScale;
                    }
                }
                this.lastDist = dist;
            } else if (this.isDragging) {
                const t = e.touches ? e.touches[0] : e;
                this.currentX = t.pageX - this.startX;
                this.currentY = t.pageY - this.startY;
            }
        };

        const handleEnd = () => {
            this.isDragging = false;
            this.lastDist = 0;
        };

        this.viewport.addEventListener('mousedown', handleStart);
        this.viewport.addEventListener('touchstart', handleStart, {passive: false});
        
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', (e) => {
            if(e.touches.length === 2) e.preventDefault(); // Запрет системного зума браузера
            handleMove(e);
        }, {passive: false});

        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchend', handleEnd);

        this.viewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const nextScale = this.targetScale * delta;
            
            if (nextScale >= this.minScale && nextScale <= this.maxScale) {
                this.targetScale = nextScale;
            }
        }, {passive: false});

        // Адаптация при повороте экрана
        window.addEventListener('resize', () => this.updatePosition());
    }
};

window.addEventListener('load', () => {
    const check = setInterval(() => {
        const sel = document.getElementById('selection-screen');
        if (sel && (sel.style.display === 'none' || sel.classList.contains('hidden'))) {
            CityManager.init();
            clearInterval(check);
        }
    }, 500);
});
