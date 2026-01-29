const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    // Состояние камеры
    currentX: -200, // Начальное смещение
    currentY: -200,
    scale: 1, 
    
    // Настройки
    mapSize: 1000, 
    minScale: 0.8,
    maxScale: 2.0,

    // Для жестов
    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Небо
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
                background: #1a2a3a; /* Темный фон неба */
                z-index: 1;
            }

            #map-viewport {
                position: absolute;
                top: 0; left: 0; width: 100vw; height: 100vh;
                overflow: hidden;
                z-index: 2;
                perspective: 1200px;
                touch-action: none;
            }

            #city-map {
                position: absolute;
                width: ${this.mapSize}px;
                height: ${this.mapSize}px;
                background-color: #1b3012; /* Темно-зеленый */
                
                /* Мягкие переходы цвета */
                background-image: 
                    radial-gradient(circle at 50% 50%, #243d18 0%, transparent 70%),
                    radial-gradient(circle at 20% 80%, #16290f 0%, transparent 50%);
                
                transform-origin: 0 0;
                transform: rotateX(60deg) rotateZ(45deg);
                will-change: left, top, transform;
            }

            /* Легкий туман у горизонта */
            #map-viewport::after {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 40%;
                background: linear-gradient(to top, transparent, rgba(26, 42, 58, 0.9));
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    },

    updatePosition() {
        // Учитываем масштаб при расчете границ
        const s = this.scale;
        
        // Ограничение: не даем краю карты уйти внутрь экрана
        // Расчет границ (упрощенный для стабильности)
        const minX = window.innerWidth - this.mapSize * s;
        const minY = window.innerHeight - this.mapSize * s;

        if (this.currentX > 0) this.currentX = 0;
        if (this.currentY > 0) this.currentY = 0;
        
        // Если карта меньше экрана (при сильном зуме out), центрируем, иначе стопорим
        if (this.currentX < minX) this.currentX = minX;
        if (this.currentY < minY) this.currentY = minY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
        this.container.style.transform = `scale(${this.scale}) rotateX(60deg) rotateZ(45deg)`;
    },

    initEvents() {
        // Мышь и тач
        const handleStart = (e) => {
            const touch = e.touches ? e.touches[0] : e;
            this.isDragging = true;
            this.startX = touch.pageX - this.currentX;
            this.startY = touch.pageY - this.currentY;
        };

        const handleMove = (e) => {
            if (e.touches && e.touches.length === 2) {
                // Логика зума пальцами
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
                // Логика перемещения
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

        // Зум колесиком
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
