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

        /* АВАТАРКА: ОПУЩЕНА НИЖЕ (top: 50px) */
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
        }

        /* УРОВЕНЬ ЧЕМПИОНА */
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

        /* ИНФО-ПАНЕЛЬ (ИМЯ И СИЛА) - СПРЯТАНА ЧУТЬ ПОД КРУГ */
        #hero-info-panel {
            position: absolute;
            left: 60px; /* Сдвинута влево, чтобы заходить под круг */
            bottom: 5px;   
            width: 130px;
            height: 45px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            border-radius: 0 10px 10px 0;
            border: 1px solid rgba(255, 204, 0, 0.3);
            border-left: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 35px; /* Увеличено, так как часть панели под кругом */
            color: #fff;
            z-index: 999998; /* Ниже, чем аватарка */
        }

        .info-name {
            font-size: 14px;
            font-weight: bold;
            color: #ffcc00;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .info-power {
            font-size: 12px;
            color: #fff;
            margin: 0;
        }

        /* ГЛОБУС */
        #world-map-btn {
            position: absolute;
            bottom: 10px; 
            left: 5px; 
            width: 140px; 
            height: 140px;
            z-index: 1000000;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            user-select: none;
            animation: none !important;
            transform: none !important;
        }

        #world-map-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            box-shadow: none !important; 
            filter: none !important;
            animation: none !important;
            -webkit-user-drag: none; 
        }

        #world-map-btn:active {
            transform: scale(0.96) !important;
            outline: none;
        }
    `;
    document.head.appendChild(style);

    function injectGlobe() {
        const castleScreen = document.getElementById('castle-screen');
        if (castleScreen && !document.getElementById('world-map-btn')) {
            const globeBtn = document.createElement('div');
            globeBtn.id = 'world-map-btn';
            globeBtn.setAttribute('tabindex', '-1');
            globeBtn.innerHTML = '<img src="globe.png" alt="Map" draggable="false">';
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
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = `
            <img id="avatar-img" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" src="">
            <div id="hero-level-badge">1</div>
            <div id="hero-info-panel">
                <p class="info-name">Никита</p>
                <p class="info-power">Сила 0</p>
            </div>
        `;
        document.body.appendChild(div);
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

        if (mainHero && mainHero.src) {
            let faceNum = "";
            if (mainHero.src.includes('tsar')) faceNum = "1";
            else if (mainHero.src.includes('sultan')) faceNum = "2";
            else if (mainHero.src.includes('king')) faceNum = "3";

            if (faceNum !== "" && !avatarImg.src.includes('face_' + faceNum)) {
                avatarImg.src = 'face_' + faceNum + '.png';
                circle.style.display = 'block';
            }
        }
    }, 400);
})();
