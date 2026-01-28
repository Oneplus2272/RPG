(function() {
    // 1. РАЗВОРАЧИВАЕМ ТЕЛЕГУ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА: ПРИНУДИТЕЛЬНО ВОЗВРАЩАЕМ bg.jpg */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
        }

        /* КАРТОЧКИ: Делаем их прозрачными, чтобы фон bg.jpg был виден */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 2px solid #edb432 !important;
        }

        /* КАРТИНКИ В КАРТОЧКАХ */
        .card img {
            background: transparent !important;
            object-fit: contain !important;
        }

        /* МАЛЕНЬКИЙ ЖЕЛТЫЙ КРУГ В УГЛУ (АВАТАР) */
        #hero-avatar-circle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 60px; 
            height: 60px;
            border: 3px solid #ffcc00; 
            border-radius: 50%;
            overflow: hidden;
            display: none; 
            z-index: 999999;
            background: transparent;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        #avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    `;
    document.head.appendChild(style);

    // Создаем круг в HTML, если его нет
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // ЛОГИКА ПОДСТАНОВКИ ЛИЦ (face_1, 2, 3)
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
