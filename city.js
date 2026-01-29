const CityManager = {
    container: null,
    tileW: 100, // Ширина плитки
    tileH: 50,  // Высота плитки (в 2 раза меньше ширины для изометрии)
    gridSize: 10, // Сетка 10x10

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        this.container = document.createElement('div');
        this.container.id = 'city-map';
        this.applyStyles();
        castleScreen.appendChild(this.container);

        this.createBaseMap();
        console.log("City Manager: Изометрическая карта готова");

        // Тестовое здание: Ратуша в центре (координаты 4, 4)
        this.addBuilding('main-hall', 'townhall', 4, 4, 2);
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #city-map {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2000px; /* Размер карты больше экрана для скролла */
                height: 2000px;
                transform: translate(-50%, -50%); /* Центрируем карту */
                background: #1a1a1a;
            }

            .tile {
                position: absolute;
                width: 100px;
                height: 50px;
                background: rgba(45, 76, 30, 0.5);
                border: 1px solid rgba(255,255,255,0.05);
                clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            }

            .building {
                position: absolute;
                z-index: 100;
                pointer-events: auto;
                transition: filter 0.2s;
            }

            .building img {
                width: 100%;
                height: auto;
                /* Сдвигаем картинку вверх, чтобы она «стояла» на плитке */
                transform: translateY(-50%); 
            }

            .building:hover {
                filter: brightness(1.2);
            }
        `;
        document.head.appendChild(style);
    },

    // Создаем сетку земли
    createBaseMap() {
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                // Перевод координат в изометрию
                const posX = (x - y) * (this.tileW / 2);
                const posY = (x + y) * (this.tileH / 2);

                tile.style.left = (1000 + posX) + 'px'; // 1000 - центр карты
                tile.style.top = (500 + posY) + 'px';
                
                this.container.appendChild(tile);
            }
        }
    },

    // Добавление изометрического здания
    addBuilding(id, type, gridX, gridY, size) {
        const b = document.createElement('div');
        b.id = id;
        b.className = 'building';
        
        // Расчет позиции (центрируем по клетке)
        const posX = (gridX - gridY) * (this.tileW / 2);
        const posY = (gridX + gridY) * (this.tileH / 2);

        b.style.width = (this.tileW * size) + 'px';
        b.style.left = (1000 + posX) + 'px';
        b.style.top = (500 + posY) + 'px';
        
        // Используем заглушку, пока нет ассетов
        b.innerHTML = `<img src="${type}.png" onerror="this.src='https://cdn-icons-png.flaticon.com/512/619/619043.png'">`;
        
        b.onclick = () => alert(`Здание: ${type} [${gridX}:${gridY}]`);
        this.container.appendChild(b);
    }
};

window.addEventListener('load', () => {
    const checkStart = setInterval(() => {
        const selection = document.getElementById('selection-screen');
        if (selection && selection.style.display === 'none') {
            CityManager.init();
            clearInterval(checkStart);
        }
    }, 500);
});
