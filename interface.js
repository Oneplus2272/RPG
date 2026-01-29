const UIManager = {
    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. ОСНОВНАЯ ПАНЕЛЬ РЕСУРСОВ
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
            item.className = `resource-item ${res.id === 'stone' ? 'big-stone' : ''}`;
            item.innerHTML = `
                <img src="${res.icon}" alt="${res.id}">
                <span>${res.value}</span>
            `;
            resourceBar.appendChild(item);
        });

        // 2. РАМКА ДЛЯ ЗОЛОТА (как на скриншоте)
        const goldPanel = document.createElement('div');
        goldPanel.id = 'gold-special-panel';
        goldPanel.innerHTML = `
            <div class="gold-container">
                <span id="gold-value">0</span>
                <div class="gold-icon-wrapper">
                    <img src="gold.png" alt="gold">
                    <div class="plus-button">+</div>
                </div>
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
            #top-resource-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 45px;
                background: rgba(20, 15, 10, 0.8);
                border-bottom: 1px solid #555;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 10px;
                z-index: 2000000;
                box-sizing: border-box;
            }

            .resource-item {
                display: flex;
                align-items: center;
                margin-right: 12px;
                color: #e0e0e0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: bold;
            }

            .resource-item img {
                width: 26px;
                height: 26px;
                margin-right: 3px;
                object-fit: contain;
            }

            .big-stone img {
                width: 34px;
                height: 34px;
            }

            /* СТИЛЬ ЗОЛОТА СО СКРИНШОТА */
            #gold-special-panel {
                position: fixed;
                top: 5px;   /* Оно на одном уровне с ресурсами, но справа */
                right: 10px;
                z-index: 2000001;
            }

            .gold-container {
                background: linear-gradient(180deg, #1a3c1a 0%, #0d240d 100%); /* Темно-зеленый градиент */
                border: 2px solid #edb432; /* Золотая кайма */
                border-radius: 20px;
                display: flex;
                align-items: center;
                padding: 2px 2px 2px 15px;
                min-width: 100px;
                height: 34px;
                box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
            }

            #gold-value {
                color: #fff;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 15px;
                margin-right: 10px;
                flex-grow: 1;
                text-align: center;
            }

            .gold-icon-wrapper {
                position: relative;
                display: flex;
                align-items: center;
            }

            .gold-icon-wrapper img {
                width: 32px;
                height: 32px;
            }

            .plus-button {
                position: absolute;
                right: -2px;
                bottom: -2px;
                background: #f1c40f;
                color: #000;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                border: 1px solid #000;
            }

            @media (min-width: 768px) {
                #top-resource-bar { height: 55px; }
                .resource-item { font-size: 16px; margin-right: 25px; }
                .resource-item img { width: 32px; height: 32px; }
                .big-stone img { width: 42px; height: 42px; }
                .gold-container { height: 40px; padding-left: 20px; }
                .gold-icon-wrapper img { width: 42px; height: 42px; }
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
