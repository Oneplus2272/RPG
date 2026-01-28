(function() {
    // 1. РАЗВОРАЧИВАЕМ TELEGRAM
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

        /* КАРТОЧКИ: Прозрачность и дизайн */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
            border-radius: 15px !important;
        }

        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* РИСУЕМ ЖЕЛТЫЙ КРУГ САМИ (БЕЗ ФОТО-РАМКИ) */
        #hero-avatar-circle {
            position: fixed;
            top: 15px;
            left: 15px;
            width: 150px; /* Размер можешь подправить под себя */
            height: 150px;
            
            /* Рисуем желтую границу */
            border: 5px solid #ffcc00; 
            border-radius: 50%;
            
            /* Обрезаем всё, что выходит за круг (лицо) */
            overflow: hidden; 
            
            display: none; /* Появляется после выбора героя */
            z-index: 100000;
            background: #000;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            pointer-events: none;
        }

        /* ФОТО ЛИЦА ВНУТРИ КРУГА */
        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Чтобы лицо заполняло весь круг */
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

    // ЛОГИКА: ПОДСТАВЛЯЕМ ЛИЦО (face_tsar.png, face_sultan.png, face_king.png)
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Определяем кто выбран: tsar, sultan или king
            const idMatch = mainHero.src.match(/hero_([a-z]+)/);
            if (idMatch) {
                const id = idMatch[1];
                const facePath = 'face_' + id + '.png';
                
                // Если картинка лица еще не установлена или сменилась
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
