(function() {
    // 1. РАЗВОРАЧИВАЕМ НА ВЕСЬ ЭКРАН (Telegram)
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.ready();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ФИКС НА ВЕСЬ ЭКРАН */
        html, body {
            height: 100vh !important;
            width: 100vw !important;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        /* Твой фон bg.jpg на экран выбора */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            height: 100vh !important;
        }

        /* Прозрачные карточки */
        .card {
            background: rgba(15, 15, 15, 0.8) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.3) !important;
        }

        /* Уменьшаем героев в карточках */
        .card img {
            height: 140px !important;
            object-fit: contain !important;
        }

        /* КРУГ С ЧЕМПИОНОМ (Левый верхний угол) */
        #hero-avatar-circle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: 65px;
            height: 65px;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #edb432;
            border-radius: 50%;
            overflow: hidden;
            display: none; /* Скрыт, пока не выберут */
            z-index: 9999;
            box-shadow: 0 0 15px rgba(0,0,0,0.7);
        }

        #hero-avatar-circle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* Фикс размера героя в замке */
        #main-hero-img {
            height: 48vh !important;
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ КРУГ В HTML
    const avatarDiv = document.createElement('div');
    avatarDiv.id = 'hero-avatar-circle';
    avatarDiv.innerHTML = '<img id="avatar-img" src="">';
    document.body.appendChild(avatarDiv);

    // ЛОГИКА ПОКАЗА КРУГА
    function updateAvatar() {
        const mainHeroImg = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHeroImg && mainHeroImg.src && mainHeroImg.src.indexOf('hero_') !== -1) {
            avatarImg.src = mainHeroImg.src;
            circle.style.display = 'block';
        }
    }

    // Проверяем каждую секунду, выбрал ли пользователь героя
    setInterval(updateAvatar, 500);
})();
