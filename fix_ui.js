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

        /* КАРТОЧКИ БЕЗ ФОНА */
        .card {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(10px);
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
            top: 10px;
            left: 10px;
            width: 60px; 
            height: 60px;
            border: 3px solid #ffcc00; 
            border-radius: 50%;
            overflow: hidden;
            display: none; 
            z-index: 999999;
        }

        /* ГЛОБУС (УВЕЛИЧЕН В 1.5 РАЗА И ПЕРЕНЕСЕН ВЛЕВО) */
        #world-map-btn {
            position: fixed;
            bottom: 30px;
            left: 20px;
            width: 105px; /* Было 70px * 1.5 = 105px */
            height: 105px;
            z-index: 1000000;
            cursor: pointer;
            display: none; /* По умолчанию скрыт */
        }

        #world-map-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            animation: pulse-yellow 2s infinite;
        }

        @keyframes pulse-yellow {
            0% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.7); transform: scale(1); }
            70% { box-shadow: 0 0 0 20px rgba(255, 204, 0, 0); transform: scale(1.03); }
            100% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0); transform: scale(1); }
        }

        #world-map-btn:active { transform: scale(0.9); }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ ГЛОБУС
    if (!document.getElementById('world-map-btn')) {
        const globeBtn = document.createElement('div');
        globeBtn.id = 'world-map-btn';
        globeBtn.innerHTML = '<img src="globe.png" alt="Map">';
        document.body.appendChild(globeBtn);
        
        globeBtn.onclick = () => {
            if (window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            }
            console.log("Открытие карты мира...");
        };
    }

    // СОЗДАЕМ АВАТАР
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" style="width:100%;height:100%;object-fit:cover;" src="">';
        document.body.appendChild(div);
    }

    // ГЛАВНЫЙ ЦИКЛ ПРОВЕРКИ СОСТОЯНИЯ
    setInterval(() => {
        const selectionScreen = document.getElementById('selection-screen');
        const globeBtn = document.getElementById('world-map-btn');
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        // Логика видимости ГЛОБУСА:
        // Если экран выбора скрыт (display: none), значит мы в замке — показываем глобус
        if (selectionScreen && selectionScreen.style.display === 'none') {
            globeBtn.style.display = 'block';
        } else {
            globeBtn.style.display = 'none';
        }

        // Логика аватара
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
