const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    currentX: -300, 
    currentY: -300,
    scale: 1.0, 
    
    mapSize: 1200, // Чуть увеличил для запаса хода
    minScale: 1.0, // Чтобы карта не была меньше экрана
    maxScale: 1.8,

    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Фон неба (остается неподвижным)
        const sky = document.createElement('div');
        sky.id = 'sky-layer';
        castleScreen.appendChild(sky);

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        // Солнечный блик на траве
        const sunGlare = document.createElement('div');
        sunGlare.id = 'sun-glare';
        this.container.appendChild(sunGlare);
        
        this.viewport.appendChild(this.container);
        castleScreen.appendChild(this.viewport);

        this.applyStyles();
        this.initEvents();
        this.updatePosition();
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #sky-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 10%, #2c5364, #203a43, #0f2027);
                z-index: 1;
            }

            #map-viewport {
                position: absolute;
                top: 0; left: 0; width: 100vw; height: 100vh;
                overflow: hidden;
                z-index: 2;
                perspective: 1000px;
                touch-action: none;
            }

            #city-map {
                position: absolute;
                width: ${this.mapSize}px;
                height: ${this.mapSize}px;
                background-color: #1b3012;
                /* Ландшафт с тенями */
                background-image: 
                    radial-gradient(circle at 20% 20%, rgba(61, 106, 42, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(22, 41, 15, 0.5) 0%, transparent 50%);
                
                transform-origin: 0 0;
                transform: rotateX(55deg) rotateZ(45deg);
                will-change: left, top, transform;
                box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
            }

            /* Солнечный свет на поверхности */
            #sun-glare {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 0%, rgba(255,255,200,0.15) 0%, transparent 60%);
                pointer-events: none;
            }

            /* Дымка у горизонта (скрывает стык) */
            #map-viewport::after {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 40%;
                background: linear-gradient(to top, transparent, rgba(15, 32, 39, 0.8));
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    },

    updatePosition() {
        const s = this.scale;
        
        // Важно: учитываем поворот и наклон при расчете границ
        // В изометрии реальная занимаемая площадь на экране меняется
        const viewW = window.innerWidth;
        const viewH = window.innerHeight;

        // Жесткие границы: камера не выходит за пределы карты
        const limitX = viewW - (this.mapSize * s * 0.7); // 0.7 - поправка на rotate
        const limitY = viewH - (this.mapSize * s * 0.5); 

        if (this.currentX > 0) this.currentX = 0;
        if (this.currentY > -100) this.currentY = -100; // Немного опускаем от верха
        
        if (this.currentX < limitX) this.currentX = limitX;
        if (this.currentY < limitY) this.currentY = limitY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
        this.container.style.transform = `scale(${s}) rotateX(55deg) rotateZ(45deg)`;
    },

    initEvents() {
        const handleStart = (e) => {
            const touch = e.touches ? e.touches[0] : e;
            this.isDragging = true;
            this.startX = touch.pageX - this.currentX;
            this.startY = touch.pageY - this.currentY;
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
                const touch = e.touches ? e.touches[0] : e;
                this.currentX = touch.pageX - this.startX;
                this.currentY = touch.pageY - this.startY;
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
            const delta = e.deltaY > 0 ? 0.95 : 1.05;
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
