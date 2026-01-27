(function() {
    // 1. РАЗВОРАЧИВАЕМ ТЕЛЕГРАМ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ОБЩИЕ НАСТРОЙКИ ЭКРАНА */
        html, body {
            height: 100vh !important;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        /* ФОН ДЛЯ ВЫБОРА */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            height: 100vh !important;
        }

        /* КАРТОЧКИ ГЕРОЕВ */
        .card {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(8px);
            border: 1px solid #edb432 !important;
        }
        .card img {
            height: 130px !important;
            object-fit: contain !important;
        }

        /* ГИГАНТСКИЙ ПУСТОЙ КРУГ В УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; /* Увеличен в 3.75 раза от исходного */
            height: 270px;
            background-image: url('frame.png') !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            display: none; /* Появится после выбора героя */
            z-index: 10000;
        }

        /* ЛИЦО ВНУТРИ ПОКА НЕ ПОКАЗЫВАЕМ (ОСТАВЛЯЕМ ПУСТЫМ) */
        #avatar-img {
            display: none !important; 
        }

        /* ОСНОВНОЙ ЧЕМПИОН (ОСТАВЛЯЕМ ЕГО ВИДИМЫМ) */
        #main-hero-img {
            display: block !important;
            height: 48vh !important;
            margin-top: auto;
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ КРУГ
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // ПОКАЗЫВАЕМ ПУСТУЮ РАМКУ ПОСЛЕ ВЫБОРА
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            circle.style.display = 'block'; // Показываем только рамку
        }
    }, 500);
})();
