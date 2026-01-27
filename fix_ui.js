(function() {
    // 1. РАЗВОРАЧИВАЕМ ТЕЛЕГРАМ НА ВЕСЬ ЭКРАН
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ФИКС ОБЩИХ РАЗМЕРОВ */
        html, body {
            height: 100vh !important;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        /* ТВОЙ ФОН НА ЭКРАН ВЫБОРА */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            height: 100vh !important;
        }

        /* КАРТОЧКИ (фон и чемпионы) */
        .card {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(8px);
            border: 1px solid #edb432 !important;
        }
        .card img {
            height: 130px !important;
            object-fit: contain !important;
        }

        /* ЗОЛОТОЙ КРУГ (УВЕЛИЧЕН В 2.5 РАЗА) */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 180px; /* Большой размер круга */
            height: 180px;
            background-image: url('frame.png'); /* Твоя золотая рамка */
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            display: none; 
            z-index: 10000;
            border-radius: 50%;
        }

        /* КОНТЕЙНЕР ДЛЯ ЛИЦА (чтобы ничего не вылезало за границы круга) */
        #avatar-container {
            width: 82%;
            height: 82%;
            margin: 9%;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
        }

        /* ЛИЦО ЧЕМПИОНА (СИЛЬНОЕ УВЕЛИЧЕНИЕ) */
        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top; /* Фокусируемся на голове */
            transform: scale(2.8); /* УВЕЛИЧИВАЕМ КАРТИНКУ, ЧТОБЫ БЫЛО ТОЛЬКО ЛИЦО */
            transform-origin: center 20%; /* Точка масштабирования на уровне лица */
        }

        /* ГЕРОЙ В ЗАМКЕ (после выбора) */
        #main-hero-img {
            height: 45vh !important;
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ КРУГ И КОНТЕЙНЕР ДЛЯ ЛИЦА
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<div id="avatar-container"><img id="avatar-img" src=""></div>';
        document.body.appendChild(div);
    }

    // ЛОГИКА ОБНОВЛЕНИЯ
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            if (avatarImg.src !== mainHero.src) {
                avatarImg.src = mainHero.src;
                circle.style.display = 'block';
            }
        }
    }, 500);
})();
