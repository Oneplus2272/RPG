(function() {
    // Разворачиваем ТГ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА: твой фон bg.jpg */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
        }

        /* КАРТОЧКИ: прозрачность, где выбор и бонусы */
        .card {
            background: rgba(15, 15, 15, 0.7) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
        }

        /* КАРТИНКИ В КАРТОЧКАХ: без фона */
        .card img {
            height: 140px !important;
            object-fit: contain !important;
            background: transparent !important;
        }

        /* ГИГАНТСКИЙ КРУГ В УГЛУ (в 3.75 раза больше) */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; 
            height: 270px;
            background-image: url('frame.png') !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            display: none;
            z-index: 10000;
        }

        /* КОНТЕЙНЕР ДЛЯ ЛИЦА (face_X.png) */
        #avatar-container {
            width: 78%;
            height: 78%;
            margin: 11%;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
        }

        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* ФОНЫ ЗАМКОВ (НЕ ТРОГАЕМ!) */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
        }

        /* ГЕРОЙ В ЦЕНТРЕ (ОСТАЕТСЯ) */
        #main-hero-img {
            display: block !important;
            height: 50vh !important;
        }
    `;
    document.head.appendChild(style);

    // Создаем круг
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<div id="avatar-container"><img id="avatar-img" src=""></div>';
        document.body.appendChild(div);
    }

    // Логика: берем face_X.png на основе выбранного героя
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            const match = mainHero.src.match(/hero_(\d+)/);
            if (match) {
                const faceSrc = 'face_' + match[1] + '.png';
                if (avatarImg.src.indexOf(faceSrc) === -1) {
                    avatarImg.src = faceSrc;
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
