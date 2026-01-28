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
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
        }

        /* ЖЁЛТЫЙ КРУГ (АВАТАРКА) В ЛЕВОМ УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: 270px; 
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none; /* Появится после выбора героя */
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

    // ОПТИМИЗИРОВАННАЯ ЛОГИКА (Проверка раз в секунду, чтобы не лагало)
    const checkAvatar = setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        // Если экран замка открыт и есть герой
        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            const idMatch = mainHero.src.match(/hero_([a-z]+)/);
            if (idMatch) {
                const id = idMatch[1];
                const facePath = 'face_' + id + '.png';
                
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    circle.style.display = 'block';
                }
            }
        }
    }, 1000); // Увеличил до 1 сек для быстрой загрузки
})();
