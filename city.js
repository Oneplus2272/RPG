const CityManager = {
    container: null,
    isDragging: false,
    startX: 0, startY: 0,
    currentX: window.innerWidth / 2,
    currentY: 100, // Смещаем чуть вниз, чтобы видеть "небо"

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Небо с солнцем (фон)
        const sky = document.createElement('div');
        sky.id = 'sky-layer';
        castleScreen.appendChild(sky);

        const viewport = document.createElement('div');
        viewport.id = 'map-viewport';
        
        // Сама земля
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        viewport.appendChild(this.container);
        castleScreen.appendChild(viewport);

        this.applyStyles();
        this.initEvents(viewport);
        
        // Добавляем тестовую точку строительства
        this.addSlot(500, 500); 
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #sky-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 60%;
                background: linear-gradient(to bottom, #87ceeb 0%, #e0f6ff 100%);
                z-index: 1;
            }

            #map-viewport {
                width: 100vw; height: 100vh;
                overflow: hidden;
                position: relative;
                z-index: 2;
                perspective: 1200px; /* Создает эффект глубины */
            }

            #city-map {
                position: absolute;
                width: 4000px; height: 4000px;
                background-color: #3d6a2a;
                /* Сетка как в стратегии */
                background-image: 
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 100px 100px;
                
                /* МАГИЯ ИЗОМЕТРИИ: Наклон плоскости */
                transform: rotateX(60deg) rotateZ(45deg);
                transform-style: preserve-3d;
                transition: transform 0.1s ease-out;
                box-shadow: 0 0 500px rgba(0,0,0,0.5);
            }

            .slot {
                position: absolute;
                width: 100px; height: 100px;
                background: rgba(237, 180, 50, 0.4);
                border: 3px solid #edb432;
                display: flex;
                align-items: center; justify-content: center;
                color: #fff; font-weight: bold;
                /* Чтобы текст не был наклонен вместе с картой */
                transform: rotateZ(-45deg) rotateX(-60deg);
            }
        `;
        document.head.appendChild(style);
    },

    // Логика перемещения с учетом наклона
    initEvents(viewport) {
        const updatePos = () => {
            // Центрируем карту и применяем смещение
            this.container.style.left = (this.currentX - 2000) + 'px';
            this.container.style.top = (this.currentY - 2000) + 'px';
        };

        const start = (e) => {
            this.isDragging = true;
            const px = e.pageX || e.touches[0].pageX;
            const py = e.pageY || e.touches[0].pageY;
            this.startX = px - this.currentX;
            this.startY = py - this.currentY;
        };

        const move = (e) => {
            if (!this.isDragging) return;
            const px = e.pageX || e.touches[0].pageX;
            const py = e.pageY || e.touches[0].pageY;
            this.currentX = px - this.startX;
            this.currentY = py - this.startY;
            updatePos();
        };

        updatePos(); // Ставим карту в начальную позицию

        viewport.addEventListener('mousedown', start);
        viewport.addEventListener('touchstart', start);
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, {passive: false});
        window.addEventListener('mouseup', () => this.isDragging = false);
        window.addEventListener('touchend', () => this.isDragging = false);
    },

    addSlot(x, y) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.style.left = x + 'px';
        slot.style.top = y + 'px';
        slot.innerHTML = 'BUILD';
        this.container.appendChild(slot);
    }
};
