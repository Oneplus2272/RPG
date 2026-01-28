(function() {
    // 1. РАЗВОРАЧИВАЕМ ТЕЛЕГУ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* КАРТОЧКИ: Делаем их полупрозрачными, чтобы был виден фон сзади */
        .card {
            background: rgba(20, 20, 20, 0.7) !important; /* Темный прозрачный фон */
            backdrop-filter: blur(10px);
            border: 2px solid #edb432 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }

        /* КАРТИНКИ В КАРТОЧКАХ: Убираем серые/белые фоны, если они были */
        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* МАЛЕНЬКИЙ ЖЕЛТЫЙ КРУГ В УГЛУ */
        #hero-avatar-circle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 65px; 
            height: 65px;
            border: 3px solid #edb432; 
            border-radius: 50%;
            overflow: hidden;
            display: none; 
            z-index: 999999;
            background: rgba(0,0,0,0.3); /* Легкая подложка, чтобы не было дырки */
            pointer-events: none;
        }

        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    `;
    document.head.appendChild(style);

    // Создаем круг
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // ЛОГИКА ПОДСТАНОВКИ ЛИЦ
    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src) {
            let faceNum = "";
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
    }, 400);
})();
