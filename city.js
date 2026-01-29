const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    // Начальная позиция камеры (центр огромной карты)
    currentX: -2000, 
    currentY: -2000,
    mapWidth: 5000,
    mapHeight: 5000,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. Создаем слой неба
        const sky = document.createElement('div');
        sky.id = 'sky-layer';
        castleScreen.appendChild(sky);

        // 2. Создаем окно просмотра (Viewport)
        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        // 3. Создаем саму землю
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        this.viewport.appendChild(this.container);
        castleScreen.appendChild(this.viewport);

        this.applyStyles();
        this.initEvents();
        this.updatePosition();

        console.log("City Manager: Ландшафт в стиле 'Марш Империй' запущен");
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Небо на заднем плане */
            #sky-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(to bottom, #1e3c72 0%, #2a5298 100%);
                z-index: 1;
            }

            /* Окно, через которое мы смотрим на мир */
            #map-viewport {
                position: absolute;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                overflow: hidden;
                z-index: 2;
                perspective: 1500px; /* Глубина 3D */
            }

            /* Огромная земля */
            #city-map {
                position: absolute;
                width: ${this.mapWidth}px;
                height: ${this.mapHeight}px;
                background-color: #2d4c1e;
                
                /* Текстура земли: пятна травы и шум */
                background-image: 
                    radial-gradient(circle at 20% 30%, #3d6a2a 0%, transparent 40%),
                    radial-gradient(circle at 80% 70%, #4a7c36 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, #254018 0%, transparent 60%),
                    url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
                
                /* Тот самый наклон из стратегий */
                transform: rotateX(60deg) rotateZ(45deg);
                transform-style: preserve-3d;
                will-change: left, top; /* Ускоряет работу на телефонах */
            }

            /* Атмосферный туман у горизонта */
            #map-viewport::after {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 50%;
                background: linear-gradient(to top, transparent, rgba(30, 60, 114, 0.9));
                pointer-events: none; /* Чтобы туман не мешал кликать */
            }

            /* Золотой маркер, чтобы не потеряться в центре */
            .center-point {
                position: absolute;
                top: 50%; left: 50%;
                width: 40px; height: 40px;
                background: rgba(237, 180, 50, 0.5);
                border: 2px solid #edb432;
                transform: translate(-50%, -50%) rotateZ(-45deg) rotateX(-60deg);
                box-shadow: 0 0 15px #edb432;
            }
        `;
        document.head.appendChild(style);

        // Добавим маркер центра
        const marker = document.createElement('div');
        marker.className = 'center-point';
        this.container.appendChild(marker);
    },

    updatePosition() {
        // Ограничиваем, чтобы не уйти за край карты
        const minX = window.innerWidth - this.mapWidth;
        const minY = window.innerHeight - this.mapHeight;

        if (this.currentX > 0) this.currentX = 0;
        if (this.currentY > 0) this.currentY = 0;
        if (this.currentX < minX) this.currentX = minX;
        if (this.currentY < minY) this.currentY = minY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
    },

    initEvents() {
        const start = (e) => {
            this.isDragging = true;
            const px = e.pageX || e.touches[0].pageX;
            const py = e.pageY || e.touches[0].pageY;
            this.startX = px - this.currentX;
            this.startY = py - this.currentY;
        };

        const move = (e) => {
            if (!this.isDragging) return;
            // e.preventDefault(); // Можно раскомментировать, если страница дергается
            const px = e.pageX || e.touches[0].pageX;
            const py = e.pageY || e.touches[0].pageY;
            
            this.currentX = px - this.startX;
            this.currentY = py - this.startY;
            this.updatePosition();
        };

        const stop = () => { this.isDragging = false; };

        this.viewport.addEventListener('mousedown', start);
        this.viewport.addEventListener('touchstart', start, {passive: false});
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, {passive: false});
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchend', stop);
    }
};

// Запуск при переходе к экрану замка
window.addEventListener('load', () => {
    const checkStart = setInterval(() => {
        const selection = document.getElementById('selection-screen');
        // Если экран выбора скрыт, значит мы в игре
        if (selection && (selection.style.display === 'none' || selection.classList.contains('hidden'))) {
            CityManager.init();
            clearInterval(checkStart);
        }
    }, 500);
});
