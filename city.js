const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    currentX: 0, 
    currentY: 0,
    scale: 1.0, 
    
    mapSize: 2000, // Увеличенный размер для перекрытия углов
    minScale: 1.0,
    maxScale: 2.5,

    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Небо (фон)
        const sky = document.createElement('div');
        sky.id = 'sky-layer';
        castleScreen.appendChild(sky);

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        // Яркое освещение
        const sunLight = document.createElement('div');
        sunLight.id = 'sun-light';
        this.container.appendChild(sunLight);
        
        this.viewport.appendChild(this.container);
        castleScreen.appendChild(this.viewport);

        this.applyStyles();
        this.centerMap();
        this.initEvents();
        this.updatePosition();
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #sky-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: #4facfe; /* Цвет неба */
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
                transform-origin: center center;
                will-change: transform, left, top;
            }

            #sun-light {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                /* Мощное центральное освещение */
                background: radial-gradient(circle at 50% 50%, rgba(255,255,230,0.4) 0%, transparent 70%);
                pointer-events: none;
                mix-blend-mode: overlay;
            }

            /* Дымка у горизонта, чтобы скрыть стык */
            #map-viewport::after {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 40%;
                background: linear-gradient(to top, transparent, rgba(79, 172, 254, 0.8));
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    },

    centerMap() {
        // Устанавливаем камеру ровно в центр карты
        this.currentX = (window.innerWidth / 2) - (this.mapSize / 2);
        this.currentY = (window.innerHeight / 2) - (this.mapSize / 2);
    },

    updatePosition() {
        const s = this.scale;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Математический расчет границ для ромба:
        // Чтобы углы не вылезали, мы ограничиваем перемещение сильнее, чем просто по размеру
        const overflowX = (this.mapSize * s - vw) / 2;
        const overflowY = (this.mapSize * s - vh) / 2;

        // Коэффициент 0.35 — это магическое число для rotate(45deg), 
        // которое не дает углам зайти в видимую зону
        const margin = this.mapSize * s * 0.15; 

        const minX = vw - this.mapSize * s + margin;
        const maxX = -margin;
        const minY = vh - this.mapSize * s + margin;
        const maxY = -margin;

        if (this.currentX > maxX) this.currentX = maxX;
        if (this.currentY > maxY) this.currentY = maxY;
        if (this.currentX < minX) this.currentX = minX;
        if (this.currentY < minY) this.currentY = minY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
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
                    const newScale = this.scale * delta;
                    if (newScale >= this.minScale && newScale <= this.maxScale) {
                        this.scale = newScale;
                    }
                }
                this.lastDist = dist;
            } else if (this.isDragging) {
                const t = e.touches ? e.touches[0] : e;
                this.currentX = t.pageX - this.startX;
                this.currentY = t.pageY - this.startY;
            }
            this.updatePosition();
        };

        this.viewport.addEventListener('mousedown', handleStart);
        this.viewport.addEventListener('touchstart', handleStart, {passive: false});
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, {passive: false});
        window.addEventListener('mouseup', () => this.isDragging = false);
        window.addEventListener('touchend', () => {
            this.isDragging = false;
            this.lastDist = 0;
        });

        this.viewport.addEventListener('wheel', (e) => {
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = this.scale * delta;
            if (newScale >= this.minScale && newScale <= this.maxScale) {
                this.scale = newScale;
                this.updatePosition();
            }
        });
    }
};

window.addEventListener('load', () => {
    const check = setInterval(() => {
        const sel = document.getElementById('selection-screen');
        if (sel && sel.style.display === 'none') {
            CityManager.init();
            clearInterval(check);
        }
    }, 500);
});
