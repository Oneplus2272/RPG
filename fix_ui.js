(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Твой основной фон bg.jpg на экран выбора */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
        }

        /* Делаем карточки прозрачными, чтобы фон просвечивал */
        .card {
            background: rgba(15, 15, 15, 0.8) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.3) !important;
        }

        /* УМЕНЬШАЕМ ЧЕМПИОНОВ НА КАРТОЧКАХ */
        .card img {
            height: 140px !important;
            object-fit: contain !important;
            background: transparent !important;
            margin-bottom: 10px !important;
        }

        /* УМЕНЬШАЕМ ЧЕМПИОНА В ЗАМКЕ */
        #main-hero-img {
            height: 48vh !important;
            filter: drop-shadow(0 0 20px rgba(0,0,0,0.8));
        }

        /* КРУГ С АВАТАРКОЙ В УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: 65px;
            height: 65px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid #edb432;
            border-radius: 50%;
            overflow: hidden;
            display: none; /* Скрыт до выбора героя */
            z-index: 1000;
            box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }

        #hero-avatar-circle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `;
    document.head.appendChild(style);

    // Создаем сам элемент круга и добавляем его в Body
    const avatarDiv = document.createElement('div');
    avatarDiv.id = 'hero-avatar-circle';
    avatarDiv.innerHTML = '<img id="avatar-img" src="">';
    document.body.appendChild(avatarDiv);

    // Логика автоматического обновления аватара при выборе
    // Мы следим за изменением src у главного героя
    const observer = new MutationObserver(() => {
        const mainHeroImg = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        if (mainHeroImg && mainHeroImg.src && avatarImg) {
            avatarImg.src = mainHeroImg.src;
            document.getElementById('hero-avatar-circle').style.display = 'block';
        }
    });

    // Запускаем слежку, как только появится главный герой
    const checkInterval = setInterval(() => {
        const target = document.getElementById('main-hero-img');
        if (target) {
            observer.observe(target, { attributes: true, attributeFilter: ['src'] });
            clearInterval(checkInterval);
        }
    }, 500);
})();
