(function() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ФОН И КАРТОЧКИ (БЕЗ ИЗМЕНЕНИЙ) */
        #selection-screen {
            background: url('bg.jpg') no-repeat center center !important;
            background-size: cover !important;
        }

        /* АВАТАРКА В УГЛУ (БЕЗ ИЗМЕНЕНИЙ) */
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

        /* КНОПКА ГЛОБУСА (НИЖНИЙ ПРАВЫЙ УГОЛ) */
        #world-map-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            z-index: 1000000;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #world-map-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            /* Анимация пульсирующей обводки */
            animation: pulse-border 2s infinite;
        }

        @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(237, 180, 50, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(237, 180, 50, 0); }
            100% { box-shadow: 0 0 0 0 rgba(237, 180, 50, 0); }
        }

        /* Эффект при нажатии */
        #world-map-btn:active {
            transform: scale(0.9);
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ ГЛОБУС В HTML
    if (!document.getElementById('world-map-btn')) {
        const globeBtn = document.createElement('div');
        globeBtn.id = 'world-map-btn';
        globeBtn.innerHTML = '<img src="globe.png" alt="Map">';
        document.body.appendChild(globeBtn);

        // Клик по глобусу (пока просто лог, потом привяжем переход)
        globeBtn.onclick = function() {
            console.log("Переход на карту мира...");
            // Здесь будет код открытия карты
        };
    }

    // ЛОГИКА АВАТАРКИ (БЕЗ ИЗМЕНЕНИЙ)
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" style="width:100%;height:100%;object-fit:cover;" src="">';
        document.body.appendChild(div);
    }

    setInterval(() => {
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
    }, 500);
})();
