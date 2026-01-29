(function() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА И КАРТОЧКИ (без изменений) */
        #selection-screen { background: url('bg.jpg') no-repeat center center !important; background-size: cover !important; }
        .card { background: rgba(0, 0, 0, 0.75) !important; backdrop-filter: blur(12px); border: 2px solid #edb432 !important; }
        .card img { background: transparent !important; object-fit: contain !important; }

        /* АВАТАРКА И ИНФО-ПАНЕЛЬ (сохранено) */
        #hero-avatar-circle {
            position: fixed; top: 50px; left: 10px; width: 90px; height: 90px;
            border: 4px solid #ffcc00; border-radius: 50%; z-index: 999999;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5); background: #000; display: none;
        }
        #hero-level-badge {
            position: absolute; bottom: -5px; left: -5px; width: 30px; height: 30px;
            background: radial-gradient(circle, #ffcc00, #b8860b); border: 2px solid #fff;
            border-radius: 50%; color: #000; font-weight: bold; font-size: 14px;
            display: flex; align-items: center; justify-content: center; z-index: 1000001;
        }
        #hero-info-panel {
            position: fixed; top: 98px; left: 70px; width: 105px; height: 38px;
            background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(5px);
            border-radius: 0 10px 10px 0; border: 1px solid rgba(255, 204, 0, 0.4);
            border-left: none; display: flex; flex-direction: column;
            justify-content: center; padding-left: 36px; color: #fff; z-index: 999990;
        }
        .info-name { font-size: 12px; font-weight: bold; color: #ffcc00; margin: 0; line-height: 1.2; }
        .info-power { font-size: 10px; color: #fff; margin: 0; line-height: 1; }

        /* ГЛОБУС С РАМКОЙ - ИСПРАВЛЕННЫЕ РАЗМЕРЫ */
        #world-map-btn {
            position: absolute;
            bottom: 10px; 
            left: 10px; 
            z-index: 1000000;
            cursor: pointer;
            user-select: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            /* Убираем синий/белый квадрат при клике */
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }

        .globe-wrapper {
            position: relative;
            width: 180px; /* Размер всей конструкции */
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .globe-frame-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%; /* Рамка занимает весь контейнер */
            height: 100%;
            z-index: 3; /* Поверх глобуса */
            pointer-events: none;
            object-fit: contain;
        }

        #world-map-btn .globe-img {
            width: 70%; /* Глобус теперь МЕНЬШЕ рамки, чтобы она была "надета" сверху */
            height: 70%;
            border-radius: 50%;
            object-fit: cover;
            z-index: 1; /* Под рамкой */
        }

        .map-label-container {
            margin-top: -20px; /* Надпись накладывается на нижнюю часть рамки */
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            pointer-events: none;
        }

        .yellow-line {
            width: 90px;
            height: 2px;
            background: #edb432;
            box-shadow: 0 0 6px #edb432;
        }

        .map-label {
            color: #ffffff;
            font-size: 22px;
            font-weight: bold;
            font-family: 'serif', 'Times New Roman';
            text-shadow: 2px 2px 4px #000;
            padding: 2px 0;
            text-transform: uppercase;
        }

        #world-map-btn:active { transform: scale(0.95); }
    `;
    document.head.appendChild(style);

    function injectGlobe() {
        const castleScreen = document.getElementById('castle-screen');
        if (castleScreen && !document.getElementById('world-map-btn')) {
            const globeBtn = document.createElement('div');
            globeBtn.id = 'world-map-btn';
            
            globeBtn.innerHTML = `
                <div class="globe-wrapper">
                    <img src="globe.png" class="globe-img" draggable="false">
                    <img src="globe-frame.png" class="globe-frame-img" draggable="false">
                </div>
                <div class="map-label-container">
                    <div class="yellow-line"></div>
                    <div class="map-label">Мир</div>
                    <div class="yellow-line"></div>
                </div>
            `;
            castleScreen.appendChild(globeBtn);
            
            globeBtn.onclick = (e) => {
                if (window.Telegram.WebApp.HapticFeedback) {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
                }
            };
        }
    }

    /* Интервал и логика отображения аватарок (без изменений) */
    setInterval(() => {
        const selectionScreen = document.getElementById('selection-screen');
        if (selectionScreen && selectionScreen.style.display === 'none') {
            injectGlobe();
        } else {
            const oldGlobe = document.getElementById('world-map-btn');
            if (oldGlobe) oldGlobe.remove();
        }
        
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');
        const infoPanel = document.getElementById('hero-info-panel');

        if (mainHero && mainHero.src) {
            let faceNum = mainHero.src.includes('tsar') ? "1" : mainHero.src.includes('sultan') ? "2" : mainHero.src.includes('king') ? "3" : "";
            if (faceNum !== "" && !avatarImg.src.includes('face_' + faceNum)) {
                avatarImg.src = 'face_' + faceNum + '.png';
                circle.style.display = 'block';
                if (infoPanel) infoPanel.style.display = 'flex';
            }
        }
    }, 400);

    if (!document.getElementById('hero-avatar-circle')) {
        const circle = document.createElement('div');
        circle.id = 'hero-avatar-circle';
        circle.innerHTML = `<img id="avatar-img" style="width:100%;height:100%;object-fit:cover;border-radius:50%;position:relative;z-index:2;" src=""><div id="hero-level-badge">1</div>`;
        document.body.appendChild(circle);

        const infoPanel = document.createElement('div');
        infoPanel.id = 'hero-info-panel';
        infoPanel.style.display = 'none';
        infoPanel.innerHTML = `<p class="info-name">Никита</p><p class="info-power">Сила 0</p>`;
        document.body.appendChild(infoPanel);
    }
})();
