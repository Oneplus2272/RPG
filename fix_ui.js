(function() {
    // 1. РАЗВОРАЧИВАЕМ TELEGRAM
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
        }

        /* КАРТОЧКИ: Прозрачность */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            box-shadow: none !important;
        }

        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* ЖЁЛТЫЙ КРУГ (АВАТАРКА) - СДВИНУТ В УГОЛ */
        #hero-avatar-circle {
            position: fixed;
            top: 5px;   /* Сдвинул выше */
            left: 5px;  /* Сдвинул левее */
            width: 270px; 
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none;
            z-index: 100000;
            pointer-events: none;
        }

        /* УБИРАЕМ БЕЛЫЙ КВАДРАТ (Стили для картинки внутри круга) */
        #avatar-img {
            width: 78%;
            height: 78%;
            margin: 11%;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
            background: transparent !important; /* Убирает белый фон */
            border: none !important;            /* Убирает возможную рамку */
            outline: none !important;
        }

        /* Прячем картинку, пока нет пути, чтобы не было квадрата */
        #avatar-img[src=""], #avatar-img:not([src]) {
            opacity: 0;
        }

        /* ЭКРАН ЗАМКА */
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
        div.innerHTML = '<img id="avatar-img" src="" alt="">';
        document.body.appendChild(div);
    }

    // ЛОГИКА ПОДСТАНОВКИ ЛИЦА
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Извлекаем id: tsar, sultan или king
            const idMatch = mainHero.src.match(/hero_([a-z]+)/);
            if (idMatch) {
                const id = idMatch[1];
                const facePath = 'face_' + id + '.png';
                
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    avatarImg.style.opacity = "1"; // Показываем картинку
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
