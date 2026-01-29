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

        /* КАРТОЧКИ: Полностью убираем любые фоны, кроме темной прозрачности */
        .card {
            background: rgba(0, 0, 0, 0.75) !important;
            backdrop-filter: blur(12px);
            border: 2px solid #edb432 !important;
            background-image: none !important;
        }

        .card img {
            background: transparent !important;
            background-image: none !important;
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

        /* ГЛОБУС: ЕЩЕ БОЛЬШЕ (140px) И В ЛЕВОМ УГЛУ */
        #world-map-btn {
            position: absolute; /* Внутри контейнера замка */
            bottom: 40px;
            left: 20px;
            width: 140px; 
            height: 140px;
            z-index: 1000000;
            cursor: pointer;
        }

        #world-map-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            animation: pulse-yellow-large 2s infinite;
        }

        @keyframes pulse-yellow-large {
            0% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.8); transform: scale(1); }
            70% { box-shadow: 0 0 0 25px rgba(255, 204, 0, 0); transform: scale(1.02); }
            100% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0); transform: scale(1); }
        }

        #world-map-btn:active { transform: scale(0.9); }
    `;
    document.head.appendChild(style);

    // Функция создания глобуса именно в замке
    function injectGlobe() {
        const castleScreen = document.getElementById('castle-screen');
        if (castleScreen && !document.getElementById('world-map-btn')) {
            const globeBtn = document.createElement('div');
            globeBtn.id = 'world-map-btn';
            globeBtn.innerHTML = '<img src="globe.png" alt="Map">';
            castleScreen.appendChild(globeBtn); // Добавляем СТРОГО в экран замка
            
            globeBtn.onclick = () => {
                if (window.Telegram.WebApp.HapticFeedback) {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
                }
            };
        }
    }

    // Создаем аватар в body (он общий)
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" style="width:100%;height:100%;object-fit:cover;" src="">';
        document.body.appendChild(div);
    }

    setInterval(() => {
        const castleScreen = document.getElementById('castle-screen');
        const selectionScreen = document.getElementById('selection-screen');
        
        // 1. Управляем глобусом: показываем только если экран выбора скрыт
        if (selectionScreen && selectionScreen.style.display === 'none') {
            injectGlobe();
        } else {
            const oldGlobe = document.getElementById('world-map-btn');
            if (oldGlobe) oldGlobe.remove(); // Удаляем на корню, если мы на выборе
        }

        // 2. Логика аватара
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
