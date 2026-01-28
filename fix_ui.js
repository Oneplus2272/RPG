(function() {
    // Разворачиваем Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* --- ЭКРАН ВЫБОРА (Твой фон с горами) --- */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
        }

        /* КАРТОЧКИ: Прозрачность и стиль */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            border-radius: 15px !important;
        }

        /* КАРТИНКИ В КАРТОЧКАХ: Ставим твои PNG без фона */
        .card img {
            background: transparent !important; /* Убираем старый фон */
            object-fit: contain !important;
            transform: scale(1.15); /* Чуть увеличиваем персонажа для красоты */
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.6));
        }

        /* --- ЗОЛОТОЙ КРУГ (АВАТАРКА) --- */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; 
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none;
            z-index: 10000;
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

        /* --- ЭКРАНЫ ЗАМКОВ (НЕ ТРОГАЕМ) --- */
        /* Здесь будут твои bg_1, bg_2, bg_3 */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
        }

        /* ГЛАВНЫЙ ГЕРОЙ В ЗАМКЕ (PNG без фона) */
        #main-hero-img {
            display: block !important;
            height: 55vh !important;
        }
    `;
    document.head.appendChild(style);

    // Создаем элемент круга
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<div style="position:relative;width:100%;height:100%;"><img id="avatar-img" src=""></div>';
        document.body.appendChild(div);
    }

    // Логика: связываем hero_X.png (карточки) с face_X.png (круг)
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
