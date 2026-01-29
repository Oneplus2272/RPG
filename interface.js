const UIManager = {
    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. ОСНОВНАЯ ПАНЕЛЬ (Хлеб, Дерево, Камень, Железо, Серебро)
        const resourceBar = document.createElement('div');
        resourceBar.id = 'top-resource-bar';
        
        const resources = [
            { id: 'bread', icon: 'bread.png', value: '0' },
            { id: 'wood', icon: 'wood.png', value: '0' },
            { id: 'stone', icon: 'stone.png', value: '0' },
            { id: 'iron', icon: 'iron.png', value: '0' },
            { id: 'silver', icon: 'silver.png', value: '0' }
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

        // 2. ОТДЕЛЬНАЯ РАМКА ДЛЯ ЗОЛОТА
        const goldPanel = document.createElement('div');
        goldPanel.id = 'gold-special-panel';
        goldPanel.innerHTML = `
            <div class="gold-content">
                <img src="gold.png" alt="gold">
                <span id="gold-value">0</span>
            </div>
        `;

        castleScreen.appendChild(resourceBar);
        castleScreen.appendChild(goldPanel);
        this.applyStyles();
    },

    applyStyles() {
        if (document.getElementById('ui-styles')) return;
        const style = document.createElement('style');
        style.id = 'ui-styles';
        style.innerHTML = `
            /* ОСНОВНАЯ ПАНЕЛЬ */
            #top-resource-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 50px; /* Немного увеличил высоту под большие иконки */
                background: rgba(45, 30, 20, 0.8);
                border-bottom: 2px solid #edb432;
                display: flex;
                align-items: center;
                padding: 0 20px 0 100px;
                z-index: 2000000;
                backdrop-filter: blur(5px);
                box-sizing: border-box;
            }

            .resource-item {
                display: flex;
                align-items: center;
                margin-right: 25px; /* Увеличил отступ между ресурсами */
                color: #fff;
                font-family: sans-serif;
                font-size: 16px; /* Чуть крупнее шрифт */
                font-weight: bold;
                text-shadow: 1px 1px 2px #000;
            }

            .resource-item img {
                width: 32px; /* Увеличил фото ресурсов */
                height: 32px;
                margin-right: 8px;
                object-fit: contain;
            }

            /* РАМКА ПОД ЗОЛОТО (Справа под панелью) */
            #gold-special-panel {
                position: fixed;
                top: 55px; /* Сразу под основной панелью */
                right: 20px; /* У правого края */
                z-index: 2000000;
            }

            .gold-content {
                background: rgba(144, 238, 144, 0.3); /* Светло-зеленый фон внутри */
                border: 2px solid #90ee90;           /* Светло-зеленая рамка */
                border-radius: 10px;
                padding: 5px 15px;
                display: flex;
                align-items: center;
                min-width: 80px;
                justify-content: center;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            }

            .gold-content img {
                width: 35px; /* Золото чуть больше остальных */
                height: 35px;
                margin-right: 10px;
            }

            .gold-content span {
                color: #ffd700;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 18px;
                text-shadow: 1px 1px 2px #000;
            }
        `;
        document.head.appendChild(style);
    }
};

window.addEventListener('load', () => {
    const checkSelection = setInterval(() => {
        const sel = document.getElementById('selection-screen');
        if (sel && (sel.style.display === 'none' || sel.classList.contains('hidden'))) {
            UIManager.init();
            clearInterval(checkSelection);
        }
    }, 500);
});
