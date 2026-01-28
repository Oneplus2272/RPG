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
        }

        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* ПРОСТО ЖЕЛТЫЙ КРУГ В УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 120px; /* Размер круга (можешь менять) */
            height: 120px;
            border: 4px solid #edb432; /* Тот самый желтый цвет */
            border-radius: 50%;
            overflow: hidden;
            display: none; /* Появится после выбора */
            z-index: 100000;
            background: #000; /* Фон за лицом, если фото не на весь круг */
            box-shadow: 0 0 15px rgba(237, 180, 50, 0.5);
            pointer-events: none;
        }

        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // ЛОГИКА ПОДСТАНОВКИ ЛИЦА (3 чемпиона)
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Вытаскиваем id: tsar, sultan или king
            const idMatch = mainHero.src.match(/hero_([a-z]+)/);
            if (idMatch) {
                const id = idMatch[1];
                // Ищем файл лица: face_tsar.png, face_sultan.png или face_king.png
                const facePath = 'face_' + id + '.png';
                
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
