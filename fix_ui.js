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

        /* КАРТОЧКИ: Прозрачность без лишних фонов */
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

        /* ГЛОБУС: СМЕЩЕН ЛЕВЕЕ И БЕЗ АНИМАЦИИ */
        #world-map-btn {
            position: absolute;
            bottom: 40px;
            left: 5px; /* Максимально влево */
            width: 140px; 
            height: 140px;
            z-index: 1000000;
            cursor: pointer;
            /* Гарантируем отсутствие анимаций */
            animation: none !important;
            transform: none !important;
        }

        #world-map-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            animation: none !important; /* Убираем анимацию с самой картинки */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
        }

        /* Легкий эффект при нажатии для отклика */
        #world-map-btn:active {
            transform: scale(0.95) !important;
        }
    `;
    document.head.appendChild(style);

    function injectGlobe() {
        const castleScreen = document.getElementById('castle-screen');
        if (castleScreen && !document.getElementById('world-map-btn')) {
            const globeBtn = document.createElement('div');
            globeBtn.id = 'world-map-btn';
            globeBtn.innerHTML = '<img src="globe.png" alt="Map">';
            castleScreen.appendChild(globeBtn);
            
            globeBtn.onclick = () => {
                if (window.Telegram.WebApp.HapticFeedback) {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
                }
            };
        }
    }

    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" style="width:100%;height:100%;object-fit:cover;" src="">';
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
