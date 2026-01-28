(function() {
    // 1. РАЗВОРАЧИВАЕМ TELEGRAM
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

        /* КАРТОЧКИ: Прозрачность и дизайн */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            box-shadow: none !important;
        }

        /* КАРТИНКИ В КАРТОЧКАХ: только стили отображения */
        .card img {
            background: transparent !important;
            object-fit: contain !important;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
            transform: scale(1.1);
        }

        /* ГИГАНТСКИЙ КРУГ (270px) */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; 
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none; /* Ждет выбора героя */
            z-index: 100000;
            pointer-events: none;
        }

        #avatar-img {
            width: 78%;
            height: 78%;
            margin: 11%;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
        }

        /* ЭКРАН ЗАМКА: фоны подтянутся из HTML */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
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

    // ЛОГИКА ТОЛЬКО ДЛЯ КРУГА (Face_X.png)
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Вытаскиваем id из названия файла в замке (hero_tsar.png -> tsar)
            const id = mainHero.src.split('hero_')[1].split('.png')[0];
            const facePath = 'face_' + id + '.png';
            
            if (avatarImg.src.indexOf(facePath) === -1) {
                avatarImg.src = facePath;
                circle.style.display = 'block';
            }
        }
    }, 500);
})();
