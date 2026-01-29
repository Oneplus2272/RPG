const UIManager = {
    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. ОСНОВНАЯ ПАНЕЛЬ РЕСУРСОВ (Теперь с желтым фоном)
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

        // 2. РАМКА ДЛЯ ЗОЛОТА (Под панелью)
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
            /* ВЕРХНЯЯ ПАНЕЛЬ С ЖЕЛТЫМ ФОНОМ */
            #top-resource-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 45px;
                /* Желто-золотистый градиент */
                background: linear-gradient(180deg, #ffcc33 0%, #d4a017 100%);
                border-bottom: 2px solid #8b6508;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 10px;
                z-index: 2000000;
                box-sizing: border-box;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            }

            .resource-item {
                display: flex;
                align-items: center;
                margin-right: 12px;
                /* Темный текст для контраста на желтом фоне */
                color: #2d1e14; 
                font-family: sans-serif;
                font-size: 13px;
                font-weight: bold;
                text-shadow: 0.5px 0.5px 0px rgba(255,255,255,0.5);
            }

            .resource-item img {
                width: 28px;
                height: 28px;
                margin-right: 3px;
                object-fit: contain;
                filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.3));
            }

            .big-stone img {
                width: 38px;
                height: 38px;
            }

            /* РАМКА ЗОЛОТА (Без изменений стиля, только позиция) */
            #gold-special-panel {
                position: fixed;
                top: 50px; 
                right: 15px;
                z-index: 2000001;
            }

            .gold-container {
                background: linear-gradient(180deg, #1a3c1a 0%, #0d240d 100%);
                border: 2px solid #edb432;
                border-radius: 25px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 2px 2px 2px 20px;
                min-width: 120px;
                height: 40px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.6);
            }

            #gold-value {
                color: #fff;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 18px;
                text-shadow: 1px 1px 2px #000;
            }

            .gold-icon-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                margin-left: 10px;
            }

            .gold-icon-wrapper img {
                width: 44px;
                height: 44px;
            }

            .plus-button {
                position: absolute;
                right: 0px;
                bottom: 2px;
                background: #f1c40f;
                color: #000;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
                border: 1.5px solid #000;
            }

            /* АДАПТИВНОСТЬ */
            @media (min-width: 768px) {
                #top-resource-bar { height: 60px; }
                #gold-special-panel { top: 65px; }
                .resource-item { font-size: 18px; margin-right: 30px; }
                .resource-item img { width: 38px; height: 38px; }
                .big-stone img { width: 48px; height: 48px; }
                .gold-container { height: 50px; min-width: 150px; }
                .gold-icon-wrapper img { width: 55px; height: 55px; }
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
