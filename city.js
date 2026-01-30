const CityManager = {
    container: null,
    viewport: null,
    castleImg: null, // Ссылка на элемент замка
    isDragging: false,
    
    currentX: 0, 
    currentY: 0,
    targetScale: 0.8, // Целевой зум для плавности
    scale: 0.8,       // Текущий зум
    
    mapSize: 2500, 
    minScale: 0.5,
    maxScale: 2.0,

    lastDist: 0,
    startX: 0, startY: 0,

    // База данных скинов для героев - ЗДЕСЬ ПРОПИСАНЫ ПУТИ К ФОТО
    skins: {
        tsar: {
            island: '#2e5a1c',     // Зеленая трава
            ocean: '#1a4e66',      // Глубокий синий
            castle: 'tsar-castle.png'
        },
        sultan: {
            island: '#d2b48c',     // Песок
            ocean: '#20b2aa',      // Бирюзовая вода
            castle: 'sultan-palace.png'
        },
        king: {
            island: '#458b00',     // Темный лес
            ocean: '#000080',      // Темно-синий
            castle: 'king-fortress.png'
        }
    },

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. Океан
        if(!document.getElementById('ocean-layer')) {
            const ocean = document.createElement('div');
            ocean.id = 'ocean-layer';
            castleScreen.appendChild(ocean);
        }

        this.viewport = document.createElement('div');
        this.viewport.id = 'map-viewport';
        
        // 2. Остров
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        
        const sunLight = document.createElement('div');
        sunLight.id = 'sun-light';
        this.container.appendChild(sunLight);
        
        // 3. Создаем замок внутри контейнера
        this.createCastle();

        this.viewport.appendChild(this.container);
        castleScreen.appendChild(this.viewport);

        this.applyStyles();
        this.centerMap();
        this.initEvents();
        this.animate(); // Запуск цикла плавной анимации
    },

    // Метод создания элемента замка
    createCastle() {
        this.castleImg = document.createElement('img');
        this.castleImg.id = 'tsar-castle-img';
        
        Object.assign(this.castleImg.style, {
            position: 'absolute',
            left: '50%',
            top: '50%',
            // Компенсация изометрии: замок стоит вертикально
            transform: 'translate(-50%, -100%) rotateZ(-45deg) rotateX(-55deg)',
            transformOrigin: 'bottom center',
            width: '400px',
            zIndex: '10',
            pointerEvents: 'none',
            transition: 'all 0.5s ease'
        });

        this.container.appendChild(this.castleImg);
    },

    // Метод смены визуального стиля (ЗДЕСЬ ИСПОЛЬЗУЮТСЯ ПУТИ К ФОТО)
    updateSkin(heroType) {
        const skin = this.skins[heroType];
        if (!skin) return;

        // Меняем цвет острова
        if (this.container) {
            this.container.style.backgroundColor = skin.island;
            this.container.style.borderColor = this.adjustColor(skin.island, -20);
        }

        // Меняем цвет океана
        const ocean = document.getElementById('ocean-layer');
        if (ocean) {
            ocean.style.background = skin.ocean;
            ocean.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${this.adjustColor(skin.ocean, 10)} 0%, ${skin.ocean} 100%)`;
        }

        // МЕНЯЕМ ПУТЬ К КАРТИНКЕ ЗАМКА
        if (this.castleImg) {
            this.castleImg.src = skin.castle;
        }
    },

    // Вспомогательная функция для коррекции цвета бортов
    adjustColor(hex, amt) {
        let usePound = false;
        if (hex[0] === "#") { hex = hex.slice(1); usePound = true; }
        let num = parseInt(hex, 16);
        let r = (num >> 16) + amt;
        if (r > 255) r = 255; else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255; else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255; else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #ocean-layer {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: #1a4e66;
                background-image: radial-gradient(circle at 50% 50%, #205e7a 0%, #1a4e66 100%);
                z-index: 1;
                transition: background 1s ease;
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
                box-shadow: 0 50px 100px rgba(0,0,0,0.6);
                transform-origin: center center;
                will-change: transform, left, top;
                border-radius: 80px;
                border: 10px solid #3d6a2a;
                transition: background-color 1s ease, border-color 1s ease;
            }

            #sun-light {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 20%, rgba(255,255,230,0.3) 0%, transparent 80%);
                pointer-events: none;
                mix-blend-mode: overlay;
                border-radius: 80px;
            }

            #map-viewport::before {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%);
                pointer-events: none;
                z-index: 5;
            }
        `;
        document.head.appendChild(style);
    },

    centerMap() {
        this.currentX = (window.innerWidth / 2) - (this.mapSize / 2);
        this.currentY = (window.innerHeight / 2) - (this.mapSize / 2);
    },

    // Основной цикл анимации для плавного зума
    animate() {
        // Плавное приближение scale к targetScale (Lerp)
        const lerpFactor = 0.15;
        this.scale += (this.targetScale - this.scale) * lerpFactor;

        this.updatePosition();
        requestAnimationFrame(() => this.animate());
    },

    updatePosition() {
        const s = this.scale;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Динамический расчет границ: позволяем видеть воду на 20% от размера экрана
        const margin = Math.min(vw, vh) * 0.2; 

        const minX = vw - (this.mapSize * s) - margin;
        const maxX = margin;
        const minY = vh - (this.mapSize * s) - margin;
        const maxY = margin;

        // Ограничение перемещения
        if (this.currentX > maxX) this.currentX = maxX;
        if (this.currentY > maxY) this.currentY = maxY;
        if (this.currentX < minX) this.currentX = minX;
        if (this.currentY < minY) this.currentY = minY;

        this.container.style.left = this.currentX + 'px';
        this.container.style.top = this.currentY + 'px';
        // Изометрическая трансформация
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
                    let nextScale = this.targetScale * delta;
                    if (nextScale >= this.minScale && nextScale <= this.maxScale) {
                        this.targetScale = nextScale;
                    }
                }
                this.lastDist = dist;
            } else if (this.isDragging) {
                const t = e.touches ? e.touches[0] : e;
                this.currentX = t.pageX - this.startX;
                this.currentY = t.pageY - this.startY;
            }
        };

        const handleEnd = () => {
            this.isDragging = false;
            this.lastDist = 0;
        };

        this.viewport.addEventListener('mousedown', handleStart);
        this.viewport.addEventListener('touchstart', handleStart, {passive: false});
        
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', (e) => {
            if(e.touches.length === 2) e.preventDefault(); // Запрет системного зума браузера
            handleMove(e);
        }, {passive: false});

        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchend', handleEnd);

        this.viewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const nextScale = this.targetScale * delta;
            
            if (nextScale >= this.minScale && nextScale <= this.maxScale) {
                this.targetScale = nextScale;
            }
        }, {passive: false});

        // Адаптация при повороте экрана
        window.addEventListener('resize', () => this.updatePosition());
    }
};

window.addEventListener('load', () => {
    const check = setInterval(() => {
        const sel = document.getElementById('selection-screen');
        if (sel && (sel.style.display === 'none' || sel.classList.contains('hidden'))) {
            CityManager.init();
            clearInterval(check);
        }
    }, 500);
});
