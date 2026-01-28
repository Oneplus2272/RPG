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

        /* КАРТОЧКИ: Прозрачность и рамки */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            border-radius: 15px !important;
        }

        /* Убираем любой фон у самих картинок в карточках */
        .card img {
            background: transparent !important;
            object-fit: contain !important;
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.8));
        }

        /* ЗОЛОТОЙ КРУГ В УГЛУ (270px) */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; 
            height: 270px;
            background: url('frame.png') no-repeat center/contain !important;
            display: none;
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

        /* ЭКРАНЫ ЗАМКОВ (НЕ ТРОГАЕМ СТИЛИ) */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
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

    // ГЛАВНЫЙ ЦИКЛ ОБНОВЛЕНИЯ
    setInterval(() => {
        // 1. ЗАМЕНЯЕМ КАРТИНКИ В КАРТОЧКАХ НА ПРОЗРАЧНЫЕ (hero_X.png)
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const img = card.querySelector('img');
            if (img) {
                const newSrc = `hero_${index + 1}.png`;
                if (!img.src.includes(newSrc)) {
                    img.src = newSrc;
                }
            }
        });

        // 2. ОБНОВЛЯЕМ КРУГ В УГЛУ (face_X.png)
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
