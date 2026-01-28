(function() {
    // 1. РАЗВОРАЧИВАЕМ ТЕЛЕГРАМ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ОБЩИЕ НАСТРОЙКИ */
        html, body {
            height: 100vh !important;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
        }

        /* ОСНОВНОЙ ФОН */
        #selection-screen, #castle-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            height: 100vh !important;
        }

        /* КАРТОЧКИ ЧЕМПИОНОВ */
        .card {
            background: rgba(15, 15, 15, 0.7) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.5) !important;
            border-radius: 15px !important;
            transition: transform 0.2s;
        }

        /* ФОТО БЕЗ ФОНА В КАРТОЧКАХ */
        .card img {
            height: 150px !important;
            object-fit: contain !important;
            background: transparent !important; /* Убираем любой фон у картинок */
            filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5)); /* Добавляем тень персонажу */
        }

        /* ГИГАНТСКИЙ КРУГ С ЛИЦОМ (Увеличен в 3.75 раза) */
        #hero-avatar-circle {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 270px; 
            height: 270px;
            background-image: url('frame.png') !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            display: none;
            z-index: 10000;
        }

        /* КОНТЕЙНЕР ДЛЯ ЛИЦА ВНУТРИ РАМКИ */
        #avatar-container {
            width: 78%;
            height: 78%;
            margin: 11%;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
        }

        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Идеально вписываем обрезанное лицо */
        }

        /* ГЛАВНЫЙ ГЕРОЙ В ЦЕНТРЕ (БЕЗ ФОНА) */
        #main-hero-img {
            display: block !important;
            height: 50vh !important;
            filter: drop-shadow(0 0 30px rgba(0,0,0,0.8));
        }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ КРУГ В HTML
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<div id="avatar-container"><img id="avatar-img" src=""></div>';
        document.body.appendChild(div);
    }

    // ЛОГИКА АВТОМАТИЧЕСКОГО ОБНОВЛЕНИЯ
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Берем ID из имени основного файла (например, из hero_1.png берем цифру 1)
            const heroId = mainHero.src.match(/hero_(\d+)/);
            
            if (heroId) {
                const faceSrc = 'face_' + heroId[1] + '.png'; // Формируем путь к лицу
                
                if (avatarImg.src.indexOf(faceSrc) === -1) {
                    avatarImg.src = faceSrc;
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
