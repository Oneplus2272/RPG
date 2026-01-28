(function() {
    // 1. РАЗВОРАЧИВАЕМ ТЕЛЕГУ
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА: Возвращаем фон как он был в рабочем варианте */
        #selection-screen {
            background: url('bg.jpg') no-repeat center center !important;
            background-size: cover !important;
            height: 100vh !important;
            width: 100vw !important;
            display: flex !important;
        }

        /* КАРТОЧКИ: Прозрачность, чтобы не перекрывали bg.jpg */
        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 2px solid #edb432 !important;
        }

        /* МАЛЕНЬКИЙ ЖЕЛТЫЙ КРУГ (60px) */
        #hero-avatar-circle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 60px !important; 
            height: 60px !important;
            border: 3px solid #ffcc00 !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            display: none; 
            z-index: 999999;
            background: transparent !important;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        #avatar-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
        }

        /* ЭКРАН ЗАМКА */
        #castle-screen {
            background-size: cover !important;
            background-position: center !important;
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
