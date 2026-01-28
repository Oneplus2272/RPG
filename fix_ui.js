(function() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА ГЕРОЕВ */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
        }

        /* КАРТОЧКИ: Прозрачный стиль */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            border-radius: 15px !important;
        }

        /* ГЕРОИ В КАРТОЧКАХ: Используем твои PNG (hero_1.png и т.д.) */
        .card img {
            background: transparent !important; 
            object-fit: contain !important;
            transform: scale(1.1); /* Чуть крупнее для красоты */
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
        }

        /* ГИГАНТСКИЙ ЗОЛОТОЙ КРУГ В УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; 
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none;
            z-index: 99999;
            pointer-events: none;
        }

        /* ЛИЦО (face_X.png) ВНУТРИ КРУГА */
        #avatar-img {
            width: 78%;
            height: 78%;
            margin: 11%;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
        }

        /* ЭКРАНЫ ЗАМКОВ: Твои bg_1, bg_2, bg_3 остаются на месте */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
        }

        /* ГЕРОЙ В ЦЕНТРЕ ЗАМКА */
        #main-hero-img {
            display: block !important;
            height: 55vh !important;
        }
    `;
    document.head.appendChild(style);

    // Добавляем круг в HTML-разметку
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // Логика автоматической подмены лица
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            const idMatch = mainHero.src.match(/hero_(\d+)/);
            if (idMatch) {
                const facePath = 'face_' + idMatch[1] + '.png';
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
