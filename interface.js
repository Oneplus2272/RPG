const UIManager = {
    init() {
        const castleScreen = document.getElementById('castle-screen');
        if (!castleScreen) return;

        // 1. ОСНОВНАЯ ПАНЕЛЬ РЕСУРСОВ (Хлеб, Дерево, Камень, Железо, Серебро)
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
            // Добавляем специальный класс для камня
            item.className = `resource-item ${res.id === 'stone' ? 'big-stone' : ''}`;
            item.innerHTML = `
                <img src="${res.icon}" alt="${res.id}">
                <span>${res.value}</span>
            `;
            resourceBar.appendChild(item);
        });

        // 2. ОТДЕЛЬНАЯ РАМКА ДЛЯ ЗОЛОТА (Справа под панелью)
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
            /* ВЕРХНЯЯ ПАНЕЛЬ */
            #top-resource-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 50px;
                background: rgba(45, 30, 20, 0.85);
                border-bottom: 2px solid #edb432;
                display: flex;
                align-items: center;
                justify-content: flex-start; /* Всегда прижимаем к левому краю */
                padding: 0 10px;
                z-index: 2000000;
                backdrop-filter: blur(5px);
                box-sizing: border-box;
                white-space: nowrap;
                overflow: hidden;
            }

            .resource-item {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                margin-right: 12px; /* Компактно для мобилок */
                color: #fff;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                font-weight: bold;
                text-shadow: 1px 1px 2px #000;
            }

            .resource-item img {
                width: 28px;
                height: 28px;
                margin-right: 4px;
                object-fit: contain;
            }

            /* УВЕЛИЧЕННЫЙ КАМЕНЬ */
            .big-stone img {
                width: 36px;
                height: 36px;
                transform: scale(1.1);
            }

            /* РАМКА ЗОЛОТА */
            #gold-special-panel {
                position: fixed;
                top: 55px; /* Сразу под баром */
                right: 10px; /* Прижато вправо */
                z-index: 2000000;
            }

            .gold-content {
                background: rgba(144, 238, 144, 0.35); /* Светло-зеленый прозрачный фон */
                border: 2px solid #90ee90;            /* Светло-зеленая рамка */
                border-radius: 12px;
                padding: 4px 12px;
                display: flex;
                align-items: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            }

            .gold-content img {
                width: 30px;
                height: 30px;
                margin-right: 8px;
            }

            .gold-content span {
                color: #ffd700;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 16px;
                text-shadow: 1px 1px 2px #000;
            }

            /* АДАПТИВНОСТЬ ДЛЯ ПЛАНШЕТОВ И ПК */
            @media (min-width: 768px) {
                #top-resource-bar {
                    padding: 0 25px;
                    height: 60px;
                }
                .resource-item {
                    margin-right: 30px;
                    font-size: 18px;
                }
                .resource-item img {
                    width: 38px;
                    height: 38px;
                }
                .big-stone img {
                    width: 48px;
                    height: 48px;
                }
                .gold-content {
                    padding: 6px 18px;
                }
                .gold-content img {
                    width: 40px;
                    height: 40px;
                }
                .gold-content span {
                    font-size: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Запуск при загрузке с проверкой экрана
window.addEventListener('load', () => {
    const checkSelection = setInterval(() => {
        const sel = document.getElementById('selection-screen');
        // Проверяем, что экран выбора скрыт, прежде чем рисовать интерфейс замка
        if (sel && (sel.style.display === 'none' || sel.classList.contains('hidden'))) {
            UIManager.init();
            clearInterval(checkSelection);
        }
    }, 500);
});
