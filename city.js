const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    // Состояние камеры
    currentX: -500,
    currentY: -500,
    scale: 1, // Текущий зум
    
    // Настройки карты
    mapSize: 2500, 
    minScale: 0.5,
    maxScale: 1.5,

    // Для жестов
    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        const sky = document.createElement('div');
        sky.id = 'sky-layer';
        castleScreen.appendChild(sky);

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
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
                background: linear-gradient(to bottom, #1e3c72 0%, #2a5298 100%);
                z-index: 1;
            }

            #map-viewport {
                position: absolute;
                top: 0; left: 0; width: 100vw; height: 100vh;
                overflow: hidden;
                z-index: 2;
                perspective: 1500px;
                touch-action: none; /* Важно для мобильного зума */
            }

            #city-map {
                position: absolute;
                width: ${this.mapSize}px;
                height: ${this.mapSize}px;
                background-color: #2d4c1e;
                
                /* Чистый ландшафт без черных точек */
                background-image: 
                    radial-gradient(circle at 30% 30%, #3d6a2a 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, #4a7c36 0%, transparent 50%),
                    radial-gradient(circle at 50% 10%, #355d23 0%, transparent 40%);
                
                transform-origin: 0 0;
                /* Изометрия */
                transform: rotateX(60deg) rotateZ(45deg);
                will-change: left, top, transform;
            }

            #map-viewport::after {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 45%;
                background: linear-gradient(to top, transparent, rgba(30, 60, 114, 0.8));
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    },

    updatePosition() {
        // Рассчитываем границы с учетом текущего зума
        const scaledSize = this.mapSize * this.scale;
        const minX = window.innerWidth - this.mapSize;
        const minY = window.innerHeight - this.mapSize;

        // Ограничиваем перемещение (упор в края)
        if (this.currentX > 0) this.currentX = 0;
        if (this.currentY > 0) this.currentY = 0;
        if (this.currentX < minX) this.currentX = minX;
        if (this.currentY < minY) this.currentY = minY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
        
        // Применяем зум к изометрической трансформации
        this.container.style.transform = `scale(${this.scale}) rotateX(60deg) rotateZ(45deg)`;
    },

    initEvents() {
        // Обработка касаний (Зум и Драг)
        this.viewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.startX = e.touches[0].pageX - this.currentX;
                this.startY = e.touches[0].pageY - this.currentY;
            } else if (e.touches.length === 2) {
                this.isDragging = false;
                this.lastDist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        }, {passive: false});

        this.viewport.addEventListener('touchmove', (e) => {
            e.preventDefault();
            
            if (e.touches.length === 1 && this.isDragging) {
                // Перемещение
                this.currentX = e.touches[0].pageX - this.startX;
                this.currentY = e.touches[0].pageY - this.startY;
            } else if (e.touches.length === 2) {
                // Зум пальцами
                const dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                
                const delta = dist / this.lastDist;
                this.lastDist = dist;
                
                const newScale = this.scale * delta;
                if (newScale >= this.minScale && newScale <= this.maxScale) {
                    this.scale = newScale;
                }
            }
            this.updatePosition();
        }, {passive: false});

        this.viewport.addEventListener('touchend', () => {
            this.isDragging = false;
            this.lastDist = 0;
        });

        // Поддержка мышки (скролл колесиком для зума)
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
