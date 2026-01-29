(function() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА */
        #selection-screen {
            background: url('bg.jpg') no-repeat center center !important;
            background-size: cover !important;
        }

        /* КАРТОЧКИ */
        .card {
            background: rgba(0, 0, 0, 0.75) !important;
            backdrop-filter: blur(12px);
            border: 2px solid #edb432 !important;
            background-image: none !important;
        }

        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* АВАТАРКА */
        #hero-avatar-circle {
            position: fixed;
            top: 50px; 
            left: 10px;
            width: 90px; 
            height: 90px;
            border: 4px solid #ffcc00; 
            border-radius: 50%;
            overflow: visible; 
            display: none; 
            z-index: 999999; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            background: #000; 
        }

        /* УРОВЕНЬ */
        #hero-level-badge {
            position: absolute;
            bottom: -5px;
            left: -5px;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, #ffcc00, #b8860b);
            border: 2px solid #fff;
            border-radius: 50%;
            color: #000;
            font-weight: bold;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000001;
            box-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }

        /* ИНФО-ПАНЕЛЬ */
        #hero-info-panel {
            position: fixed;
            top: 98px;      
            left: 70px;     
            width: 105px;   
            height: 38px;   
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            border-radius: 0 10px 10px 0;
            border: 1px solid rgba(255, 204, 0, 0.4);
            border-left: none;
            display: flex;
            flex-direction: column;
            justify-content: center; 
            padding-left: 36px;      
            color: #fff;
            z-index: 999990;    
        }

        .info-name {
            font-size: 12px;
            font-weight: bold;
            color: #ffcc00;
            margin: 0;
            padding: 0;
            line-height: 1.2;
            white-space: nowrap;
        }

        .info-power {
            font-size: 10px;
            color: #fff;
            margin: 0;
            padding: 0;
            line-height: 1;
            white-space: nowrap;
        }

        /* ГЛОБУС "МИР": УВЕЛИЧЕН В 2 РАЗА, БЕЗ ЧЕРНОЙ РАМКИ */
        #world-map-btn {
            position: absolute;
            bottom: 5px; 
            left: 5px; 
            width: 220px; /* Увеличено в 2 раза (было 110px) */
            height: 220px; /* Увеличено в 2 раза */
            z-index: 1000000;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            user-select: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
        }

        #world-map-btn img {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            border: 4px solid #edb432; /* Пропорционально увеличил толщину рамки */
            box-sizing: border-box;
        }

        .map-label-container {
            position: relative;
            z-index: 2;
            width: 100%;
            background: transparent; /* УБРАЛ ЧЕРНУЮ РАМКУ */
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 25px; /* Поднял текст чуть выше из-за увеличения размера */
        }

        .yellow-line {
            width: 45%; /* Сделал полоски короче для стиля */
            height: 2px;
            background: #edb432;
            box-shadow: 0 0 8px #edb432;
        }

        .map-label {
            color: #ffffff;
            font-size: 24px; /* Увеличил шрифт пропорционально кнопке */
            font-weight: bold;
            font-family: 'serif', 'Times New Roman';
            text-shadow: 2px 2px 5px #000; /* Усилил тень для читаемости без фона */
            padding: 4px 0;
        }

        #world-map-btn:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);

    function injectGlobe() {
        const castleScreen = document.getElementById('castle-screen');
        if (castleScreen && !document.getElementById('world-map-btn')) {
            const globeBtn = document.createElement('div');
            globeBtn.id = 'world-map-btn';
            globeBtn.setAttribute('tabindex', '-1');
            
            globeBtn.innerHTML = `
                <img src="globe.png" alt="Map" draggable="false">
                <div class="map-label-container">
                    <div class="yellow-line"></div>
                    <div class="map-label">Мир</div>
                    <div class="yellow-line"></div>
                </div>
            `;
            castleScreen.appendChild(globeBtn);
            
            globeBtn.onclick = (e) => {
                e.preventDefault(); 
                if (window.Telegram.WebApp.HapticFeedback) {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
                }
            };
        }
    }

    if (!document.getElementById('hero-avatar-circle')) {
        const circle = document.createElement('div');
        circle.id = 'hero-avatar-circle';
        circle.innerHTML = `
            <img id="avatar-img" style="width:100%;height:100%;object-fit:cover;border-radius:50%;position:relative;z-index:2;" src="">
            <div id="hero-level-badge">1</div>
        `;
        document.body.appendChild(circle);

        const infoPanel = document.createElement('div');
        infoPanel.id = 'hero-info-panel';
        infoPanel.style.display = 'none';
        infoPanel.innerHTML = `
            <p class="info-name">Никита</p>
            <p class="info-power">Сила 0</p>
        `;
        document.body.appendChild(infoPanel);
    }

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
            let faceNum = "";
            if (mainHero.src.includes('tsar')) faceNum = "1";
            else if (mainHero.src.includes('sultan')) faceNum = "2";
            else if (mainHero.src.includes('king')) faceNum = "3";

            if (faceNum !== "" && !avatarImg.src.includes('face_' + faceNum)) {
                avatarImg.src = 'face_' + faceNum + '.png';
                circle.style.display = 'block';
                if (infoPanel) infoPanel.style.display = 'flex';
            }
        }
    }, 400);
})();
