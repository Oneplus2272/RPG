(function() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
        }

        .card {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.4) !important;
        }

        /* МАЛЕНЬКИЙ ЖЕЛТЫЙ КРУГ */
        #hero-avatar-circle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 70px;  /* Компактный размер */
            height: 70px;
            border: 3px solid #edb432; 
            border-radius: 50%;
            overflow: hidden; 
            display: none; 
            z-index: 100000;
            background: transparent;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" src="">';
        document.body.appendChild(div);
    }

    // КАРТА СООТВЕТСТВИЯ: Имя из HTML -> Твоя цифра
    const faceMap = {
        'tsar': '1',
        'sultan': '2',
        'king': '3'
    };

    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src && mainHero.src.includes('hero_')) {
            // Вытаскиваем id (tsar, sultan или king)
            const idMatch = mainHero.src.match(/hero_([a-z]+)/);
            if (idMatch) {
                const name = idMatch[1];
                const faceNumber = faceMap[name]; // Получаем 1, 2 или 3
                const facePath = 'face_' + faceNumber + '.png';
                
                if (avatarImg.src.indexOf(facePath) === -1) {
                    avatarImg.src = facePath;
                    circle.style.display = 'block';
                }
            }
        }
    }, 500);
})();
