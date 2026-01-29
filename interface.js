const UIManager = {
    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // Создаем контейнер для верхней панели ресурсов
        const resourceBar = document.createElement('div');
        resourceBar.id = 'top-resource-bar';
        
        // Массив ресурсов (пока добавим только хлеб)
        const resources = [
            { id: 'bread', icon: 'bread.png', value: '2.08M' }
        ];

        resources.forEach(res => {
            const item = document.createElement('div');
            item.className = 'resource-item';
            item.innerHTML = `
                <img src="${res.icon}" alt="${res.id}">
                <span>${res.value}</span>
            `;
            resourceBar.appendChild(item);
        });

        castleScreen.appendChild(resourceBar);
        this.applyStyles();
    },

    applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* ВЕРХНЯЯ ПАНЕЛЬ РЕСУРСОВ */
            #top-resource-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 40px;
                background: rgba(45, 30, 20, 0.7); /* Прозрачная коричневая рамка */
                border-bottom: 2px solid #edb432; /* Золотистая кайма снизу */
                display: flex;
                align-items: center;
                padding: 0 100px; /* Отступ под аватарку */
                z-index: 2000000;
                backdrop-filter: blur(5px);
                box-sizing: border-box;
            }

            .resource-item {
                display: flex;
                align-items: center;
                margin-right: 15px;
                color: #fff;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: bold;
                text-shadow: 1px 1px 2px #000;
            }

            .resource-item img {
                width: 24px;
                height: 24px;
                margin-right: 5px;
                object-fit: contain;
            }
        `;
        document.head.appendChild(style);
    }
};

// Запуск после загрузки
window.addEventListener('load', () => {
    const checkSelection = setInterval(() => {
        const sel = document.getElementById('selection-screen');
        if (sel && (sel.style.display === 'none' || sel.classList.contains('hidden'))) {
            UIManager.init();
            clearInterval(checkSelection);
        }
    }, 500);
});
