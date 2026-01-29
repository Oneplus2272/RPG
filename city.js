const CityManager = {
    // Контейнер города
    container: null,

    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Создаем обертку для карты города
        this.container = document.createElement('div');
        this.container.id = 'city-map';
        this.applyStyles();
        
        castleScreen.appendChild(this.container);

        // Добавляем фоновый ландшафт
        this.setLandscape('landscape.jpg'); // Замени на свое имя файла, когда будет готов

        console.log("City Manager: Система города инициализирована");
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #city-map {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                overflow: hidden;
            }

            .building {
                position: absolute;
                cursor: pointer;
                transition: transform 0.2s;
                -webkit-tap-highlight-color: transparent;
            }

            .building:active {
                transform: scale(0.95);
            }

            .building img {
                width: 100%;
                height: auto;
                display: block;
            }
        `;
        document.head.appendChild(style);
    },

    setLandscape(imageUrl) {
        // Если файла ландшафта пока нет, сделаем темно-зеленый фон (трава)
        this.container.style.backgroundColor = '#2d4c1e'; 
        // Если картинка есть, раскомментируй строку ниже:
        // this.container.style.backgroundImage = \`url('\${imageUrl}')\`;
    },

    // Функция для добавления здания на карту
    addBuilding(id, type, x, y, size) {
        const b = document.createElement('div');
        b.id = id;
        b.className = 'building';
        b.style.left = x + 'px';
        b.style.top = y + 'px';
        b.style.width = size + 'px';
        
        // Вставляем заглушку здания
        b.innerHTML = `<img src="${type}_lv1.png" alt="${type}">`;
        
        b.onclick = () => {
            console.log(`Нажато здание: ${type}`);
            // Тут позже добавим меню улучшения
        };

        this.container.appendChild(b);
    }
};

// Запуск при загрузке
window.addEventListener('load', () => {
    // Ждем, пока скроется экран выбора, чтобы инициализировать город
    const checkStart = setInterval(() => {
        const selection = document.getElementById('selection-screen');
        if (selection && selection.style.display === 'none') {
            CityManager.init();
            clearInterval(checkStart);
        }
    }, 500);
});
