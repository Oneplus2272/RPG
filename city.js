const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    currentX: 0, currentY: 0,
    scale: 1.0, 
    
    mapSize: 1500, 
    minScale: 0.5, // Теперь можно отдалять сильнее, чтобы видеть воду
    maxScale: 2.0,

    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. Океан (вместо неба)
        const ocean = document.createElement('div');
        ocean.id = 'ocean-layer';
        castleScreen.appendChild(ocean);

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        // Свет на острове
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
            #ocean-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: #1a4e66;
                /* Эффект волн через градиент */
                background-image: radial-gradient(circle at 50% 50%, #205e7a 0%, #1a4e66 100%);
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
                background-color: #2e5a1c;
                /* Тень от острова на воде */
                box-shadow: 0 50px 100px rgba(0,0,0,0.5);
                transform-origin: center center;
                will-change: transform, left, top;
                /* Скругление краев, чтобы был похож на остров */
                border-radius: 40px;
                border: 10px solid #3d6a2a;
            }

            #sun-light {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 20%, rgba(255,255,230,0.4) 0%, transparent 80%);
                pointer-events: none;
                mix-blend-mode: overlay;
                border-radius: 40px;
            }

            /* Солнечная дорожка на воде */
            #map-viewport::before {
                content: "";
                position: absolute;
                top: 0; left: 50%; width: 200%; height: 100%;
                background: radial-gradient(ellipse at center top, rgba(255,255,255,0.2) 0%, transparent 50%);
                transform: translateX(-50%);
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    },

    centerMap() {
        this.currentX = (window.innerWidth / 2) - (this.mapSize / 2);
        this.currentY = (window.innerHeight / 2) - (this.mapSize / 2);
    },

    updatePosition() {
        const s = this.scale;
        // Ограничиваем скролл так, чтобы остров не уплывал совсем далеко, 
        // но даем увидеть воду (запас 200px)
        const margin = 200; 
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const minX = vw - this.mapSize * s - margin;
        const maxX = margin;
        const minY = vh - this.mapSize * s - margin;
        const maxY = margin;

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
        window.addEventListener('touchend', () => { this.isDragging = false; this.lastDist = 0; });

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
