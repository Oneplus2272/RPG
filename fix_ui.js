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

        /* ФОН ДЛЯ ЭКРАНА ВЫБОРА */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            height: 100vh !important;
        }

        /* КАРТОЧКИ ГЕРОЕВ (Прозрачность и уменьшение картинок) */
        .card {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(8px);
            border: 1px solid #edb432 !important;
        }
        .card img {
            height: 130px !important;
            object-fit: contain !important;
        }

        /* ЗОЛОТОЙ КРУГ (АВАТАРКА) В УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: 80px;
            height: 80px;
            background-image: url('frame.png'); /* ТВОЯ ЗОЛОТАЯ РАМКА */
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            display: none; 
            z-index: 10000;
        }

        /* ЛИЦО ВНУТРИ КРУГА */
        #avatar-img {
            width: 76%;
            height: 76%;
            margin: 12%; 
            border-radius: 50%;
            object-fit: cover; /* Это обрежет картинку до лица */
            object-position: top; /* Фокус на голову чемпиона */
            position: absolute;
            z-index: -1; /* Лицо под рамкой */
        }

        /* ГЕРОЙ В ЗАМКЕ */
        #main-hero-img {
            height: 45vh !important;
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ КРУГ В HTML, ЕСЛИ ЕГО НЕТ
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // АВТОМАТИЧЕСКАЯ ПРОВЕРКА ВЫБОРА
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
