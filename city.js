const CityManager = {
    container: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: -500, // Начальное смещение (чтобы не быть в углу)
    currentY: -500,
    mapWidth: 3000,  // Размер твоего мира
    mapHeight: 3000,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        const viewport = document.createElement('div');
        viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        // Устанавливаем начальную позицию
        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';

        viewport.appendChild(this.container);
        castleScreen.appendChild(viewport);

        this.applyStyles();
        this.initEvents(viewport);

        // Добавим что-нибудь в центр для ориентира
        this.addMarker();
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #map-viewport {
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                position: relative;
                background: #000;
            }

            #city-map {
                position: absolute;
                width: ${this.mapWidth}px;
                height: ${this.mapHeight}px;
                
                /* ГЕНЕРИРУЕМ ЛАНДШАФТ КОДОМ */
                background-color: #2d4c1e; /* Темно-зеленый */
                background-image: 
                    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
                background-size: 100px 100px; /* Клетки по 100 пикселей */
                
                will-change: transform; /* Оптимизация для мобилок */
            }

            /* Тестовый маркер центра */
            .center-marker {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                background: #edb432;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 20px #edb432;
            }
        `;
        document.head.appendChild(style);
    },

    addMarker() {
        const marker = document.createElement('div');
        marker.className = 'center-marker';
        this.container.appendChild(marker);
    },

    initEvents(viewport) {
        const start = (e) => {
            this.isDragging = true;
            const pageX = e.pageX || e.touches[0].pageX;
            const pageY = e.pageY || e.touches[0].pageY;
            this.startX = pageX - this.currentX;
            this.startY = pageY - this.currentY;
            viewport.style.cursor = 'grabbing';
        };

        const move = (e) => {
            if (!this.isDragging) return;
            const pageX = e.pageX || e.touches[0].pageX;
            const pageY = e.pageY || e.touches[0].pageY;
            
            this.currentX = pageX - this.startX;
            this.currentY = pageY - this.startY;

            // Ограничители, чтобы не улетать в пустоту
            const minX = window.innerWidth - this.mapWidth;
            const minY = window.innerHeight - this.mapHeight;
            
            if (this.currentX > 0) this.currentX = 0;
            if (this.currentY > 0) this.currentY = 0;
            if (this.currentX < minX) this.currentX = minX;
            if (this.currentY < minY) this.currentY = minY;

            this.container.style.left = this.currentX + 'px';
            this.container.style.top = this.currentY + 'px';
        };

        const stop = () => { 
            this.isDragging = false; 
            viewport.style.cursor = 'grab';
        };

        viewport.addEventListener('mousedown', start);
        viewport.addEventListener('touchstart', start, {passive: false});
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, {passive: false});
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchend', stop);
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
