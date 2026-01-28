(function() {
    // 1. СРАЗУ РАЗВОРАЧИВАЕМ ТЕЛЕГУ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* КАРТОЧКИ: Прозрачный фон */
        .card {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(10px);
            border: 1px solid #edb432 !important;
        }

        /* МАЛЕНЬКИЙ ЖЕЛТЫЙ КРУГ (60 пикселей - это ОЧЕНЬ мало) */
        #hero-avatar-circle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 60px !important; 
            height: 60px !important;
            border: 3px solid #ffcc00 !important; /* Яркий желтый */
            border-radius: 50% !important;
            overflow: hidden !important;
            display: none; 
            z-index: 999999;
            background: transparent !important;
            pointer-events: none;
        }

        #avatar-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
        }
    `;
    document.head.appendChild(style);

    // Создаем элемент круга, если его нет
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // ЛОГИКА ПОДСТАНОВКИ ЛИЦ (face_1, face_2, face_3)
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src) {
            let faceNum = "";
            
            // Прямая проверка: что в основной картинке, то и в круге
            if (mainHero.src.includes('tsar')) faceNum = "1";
            else if (mainHero.src.includes('sultan')) faceNum = "2";
            else if (mainHero.src.includes('king')) faceNum = "3";

            if (faceNum !== "") {
                const newFace = 'face_' + faceNum + '.png';
                if (!avatarImg.src.includes(newFace)) {
                    avatarImg.src = newFace;
                    circle.style.display = 'block';
                }
            }
        }
    }, 300); // Проверка 3 раза в секунду для скорости
})();
