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

        /* ГЛОБУС: ОПУЩЕН НИЖЕ */
        #world-map-btn {
            position: absolute;
            bottom: 10px; /* Было 40px, теперь 10px — глобус стал ниже */
            left: 5px; 
            width: 140px; 
            height: 140px;
            z-index: 1000000;
            cursor: pointer;
            
            /* Убираем выделение квадратом при нажатии */
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
            
            /* Убираем все тени и свечения вокруг */
            box-shadow: none !important; 
            filter: none !important;
            
            animation: none !important;
            -webkit-user-drag: none; /* Чтобы картинку нельзя было потянуть */
        }

        /* Только легкое изменение масштаба при клике без рамок */
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
            // Добавил атрибуты, чтобы браузер не пытался выделить элемент
            globeBtn.setAttribute('tabindex', '-1');
            globeBtn.innerHTML = '<img src="globe.png" alt="Map" draggable="false">';
            castleScreen.appendChild(globeBtn);
            
            globeBtn.onclick = (e) => {
                e.preventDefault(); // Защита от лишних срабатываний браузера
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
