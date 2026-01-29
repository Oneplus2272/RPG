const UIManager = {
    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. ОСНОВНАЯ ПАНЕЛЬ
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

        // 2. РАМКА ЗОЛОТА
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
                height: 50px;
                /* ДВУХСЛОЙНЫЙ ФОН: Верх — тусклое золото, Низ — прозрачный темный */
                background: linear-gradient(180deg, 
                    rgba(139, 101, 8, 0.8) 0%,   /* Верх: приглушенный золотой */
                    rgba(139, 101, 8, 0.8) 50%,  /* Середина */
                    rgba(0, 0, 0, 0.4) 50%,      /* Резкий переход в прозрачность */
                    rgba(0, 0, 0, 0.4) 100%      /* Низ: темный прозрачный */
                );
                border-bottom: 1px solid rgba(237, 180, 50, 0.3);
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
                margin-right: 15px;
                color: #fff;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: bold;
                text-shadow: 1px 1px 2px #000;
                /* Центрируем иконки в верхней «золотой» части */
                height: 50%; 
                margin-top: -15px; 
            }

            .resource-item img {
                width: 24px;
                height: 24px;
                margin-right: 4px;
                object-fit: contain;
            }

            .big-stone img {
                width: 32px;
                height: 32px;
                transform: translateY(2px);
            }

            /* ЗОЛОТО СО СКРИНШОТА */
            #gold-special-panel {
                position: fixed;
                top: 5px; 
                right: 10px;
                z-index: 2000001;
            }

            .gold-container {
                background: linear-gradient(180deg, #1a3c1a 0%, #0d240d 100%);
                border: 2px solid #edb432;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2px 0 15px;
                min-width: 110px;
                height: 36px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.8);
            }

            #gold-value {
                color: #fff;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 16px;
                text-shadow: 1px 1px 2px #000;
            }

            .gold-icon-wrapper img {
                width: 38px;
                height: 38px;
            }

            .plus-button {
                position: absolute;
                right: -2px;
                bottom: -2px;
                background: #ffcc00;
                color: #000;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                font-weight: bold;
                border: 1px solid #000;
            }

            /* МОБИЛЬНАЯ АДАПТАЦИЯ */
            @media (max-width: 600px) {
                .resource-item { margin-right: 8px; font-size: 11px; }
                .resource-item img { width: 20px; height: 20px; }
                .gold-container { min-width: 90px; height: 30px; }
                .gold-icon-wrapper img { width: 32px; height: 32px; }
            }
        `;
        document.head.appendChild(style);
    }
};
