(function() {
    // 1. РАЗВОРАЧИВАЕМ TELEGRAM
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* --- ЭКРАН ВЫБОРА (Карточки) --- */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
        }

        /* Делаем карточки прозрачными, чтобы они не перекрывали фон */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            border-radius: 15px !important;
        }
        
        /* ГЕРОИ В КАРТОЧКАХ: Убираем серый/черный фон у самих картинок */
        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* --- ЗОЛОТОЙ КРУГ (АВАТАРКА) --- */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; /* Твой размер (в 3.75 раза больше базы) */
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none; /* Появится только после выбора */
            z-index: 99999;
            pointer-events: none; /* Чтобы не мешал нажимать на кнопки под ним */
        }

        /* ЛИЦО ВНУТРИ КРУГА */
        #avatar-img {
            width: 78%;
            height: 78%;
            margin: 11%;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
        }

        /* --- ЭКРАН ЗАМКА (НЕ ТРОГАЕМ ФОНЫ!) --- */
        /* Здесь будут отображаться твои bg_1.jpg, bg_2.jpg и т.д. */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
        }

        /* ГЛАВНЫЙ ГЕРОЙ В ЗАМКЕ */
        #main-hero-img {
            display: block !important;
            height: 50vh !important;
            z-index: 5;
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ КРУГ В HTML
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // ЛОГИКА: СЛЕДИМ ЗА ВЫБОРОМ ГЕРОЯ
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Берем ID (например, 1 из hero_1.png)
            const idMatch = mainHero.src.match(/hero_(\d+)/);
            if (idMatch) {
                const heroId = idMatch[1];
                const facePath = 'face_' + heroId + '.png'; // Формируем путь к лицу
                
                // Если картинка в круге еще не та, меняем её
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    circle.style.display = 'block'; // Показываем круг
                }
            }
        }
    }, 500);
})();
