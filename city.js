const CityManager = {
    container: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: -500,
    currentY: -400,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Создаем небо (фон за картой)
        const sky = document.createElement('div');
        sky.id = 'sky-bg';
        castleScreen.appendChild(sky);

        const viewport = document.createElement('div');
        viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';

        viewport.appendChild(this.container);
        castleScreen.appendChild(viewport);

        this.applyStyles();
        this.initEvents(viewport);
        
        // Добавляем тестовую изометрическую ячейку
        this.addSlot(1500, 1500); 
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #sky-bg {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%);
                z-index: 1;
            }

            #map-viewport {
                width: 100vw; height: 100vh;
                overflow: hidden;
                position: relative;
                z-index: 2;
                /* Эффект солнечного света сверху */
                box-shadow: inset 0 100px 150px -50px rgba(255,255,150,0.4);
            }

            #city-map {
                position: absolute;
                width: 3000px; height: 3000px;
                background-color: #348c31;
                /* Изометрическая сетка ромбами */
                background-image: 
                    linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)),
                    linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1));
                background-size: 100px 100px;
                background-position: 0 0, 50px 50px;
                transform-origin: top left;
            }

            /* Изометрическая ячейка под здание */
            .slot {
                position: absolute;
                width: 120px;
                height: 70px;
                background: rgba(237, 180, 50, 0.3);
                border: 2px solid #edb432;
                /* Превращаем квадрат в ромб */
                clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #edb432;
                font-weight: bold;
                font-size: 10px;
                transition: background 0.3s;
            }

            .slot:active {
                background: rgba(237, 180, 50, 0.6);
            }
        `;
        document.head.appendChild(style);
    },

    addSlot(x, y) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.style.left = x + 'px';
        slot.style.top = y + 'px';
        slot.innerText = 'BUILD';
        this.container.appendChild(slot);
    },

    initEvents(viewport) {
        const start = (e) => {
            this.isDragging = true;
            const pageX = e.pageX || e.touches[0].pageX;
            const pageY = e.pageY || e.touches[0].pageY;
            this.startX = pageX - this.currentX;
            this.startY = pageY - this.currentY;
        };

        const move = (e) => {
            if (!this.isDragging) return;
            const pageX = e.pageX || e.touches[0].pageX;
            const pageY = e.pageY || e.touches[0].pageY;
            this.currentX = pageX - this.startX;
            this.currentY = pageY - this.startY;
            
            this.container.style.left = this.currentX + 'px';
            this.container.style.top = this.currentY + 'px';
        };

        const stop = () => { this.isDragging = false; };

        viewport.addEventListener('mousedown', start);
        viewport.addEventListener('touchstart', start);
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, {passive: false});
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchend', stop);
    }
};

// Запуск
window.addEventListener('load', () => {
    const check = setInterval(() => {
        if (document.getElementById('selection-screen').style.display === 'none') {
            CityManager.init();
            clearInterval(check);
        }
    }, 500);
});
