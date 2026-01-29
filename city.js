const CityManager = {
    container: null,
    viewport: null,
    isDragging: false,
    
    currentX: 0, 
    currentY: 0,
    scale: 1.0, 
    
    mapSize: 1500, 
    safeMargin: 60, // Барьер 60px от каждого края
    minScale: 1.0,
    maxScale: 2.5,

    lastDist: 0,
    startX: 0, startY: 0,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Фон неба (яркий дневной)
        const sky = document.createElement('div');
        sky.id = 'sky-layer';
        castleScreen.appendChild(sky);

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        // Слой яркого солнечного света
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
                background: #4facfe; /* Ясное небо */
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
                background-color: #2e5a1c; /* Яркий зеленый ландшафт */
                transform-origin: center center;
                transform: rotateX(55deg) rotateZ(45deg);
                will-change: left, top, transform;
            }

            /* Эффект палящего солнца */
            #sun-light {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 10%, rgba(255,255,230,0.4) 0%, rgba(255,255,200,0.1) 40%, transparent 70%);
                pointer-events: none;
                mix-blend-mode: screen;
            }

            /* Яркий горизонт */
            #map-viewport::after {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 35%;
                background: linear-gradient(to top, transparent, rgba(255, 255, 255, 0.4));
                pointer-events: none;
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
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Ограничители по 60px
        const limitX_right = vw - (this.mapSize * s) + this.safeMargin;
        const limitX_left = -this.safeMargin;
        
        const limitY_bottom = vh - (this.mapSize * s) + this.safeMargin;
        const limitY_top = -this.safeMargin;

        if (this.currentX > limitX_left) this.currentX = limitX_left;
        if (this.currentY > limitY_top) this.currentY = limitY_top;
        if (this.currentX < limitX_right) this.currentX = limitX_right;
        if (this.currentY < limitY_bottom) this.currentY = limitY_bottom;

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
