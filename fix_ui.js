(function() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* ЭКРАН ВЫБОРА */
        #selection-screen {
            background: url('bg.jpg') no-repeat center center !important;
            background-size: cover !important;
        }

        /* КАРТОЧКИ: Убираем фон замков, оставляем только чистую прозрачность */
        .card {
            background: rgba(0, 0, 0, 0.7) !important; /* Темная подложка */
            backdrop-filter: blur(10px);
            border: 2px solid #edb432 !important;
            background-image: none !important; /* Принудительно убираем любые картинки фона */
        }

        /* Убираем фон у самих изображений героев внутри карточек */
        .card img {
            background: transparent !important;
            background-image: none !important;
            object-fit: contain !important;
        }

        /* АВАТАРКА В ВЕРХНЕМ ЛЕВОМ УГЛУ */
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
        }

        /* ГЛОБУС В НИЖНЕМ ЛЕВОМ УГЛУ */
        #world-map-btn {
            position: fixed;
            bottom: 20px;
            left: 20px; /* Перенес на лево */
            width: 70px;
            height: 70px;
            z-index: 1000000;
            cursor: pointer;
        }

        #world-map-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            animation: pulse-yellow 2s infinite;
        }

        /* Анимация желтой обводки (сжимается/разжимается) */
        @keyframes pulse-yellow {
            0% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.7); transform: scale(1); }
            70% { box-shadow: 0 0 0 15px rgba(255, 204, 0, 0); transform: scale(1.05); }
            100% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0); transform: scale(1); }
        }

        #world-map-btn:active { transform: scale(0.9); }
    `;
    document.head.appendChild(style);

    // СОЗДАЕМ ГЛОБУС
    if (!document.getElementById('world-map-btn')) {
        const globeBtn = document.createElement('div');
        globeBtn.id = 'world-map-btn';
        globeBtn.innerHTML = '<img src="globe.png" alt="Map">';
        document.body.appendChild(globeBtn);
        
        globeBtn.onclick = () => console.log("Map clicked");
    }

    // ЛОГИКА АВАТАРКИ
    if (!document.getElementById('hero-avatar-circle')) {
        const div = document.createElement('div');
        div.id = 'hero-avatar-circle';
        div.innerHTML = '<img id="avatar-img" style="width:100%;height:100%;object-fit:cover;" src="">';
        document.body.appendChild(div);
    }

    setInterval(() => {
        const mainHero = document.getElementById('main-hero-img');
        const avatarImg = document.getElementById('avatar-img');
        const circle = document.getElementById('hero-avatar-circle');

        if (mainHero && mainHero.src) {
            let faceNum = "";
            if (mainHero.src.includes('tsar')) faceNum = "1";
            else if (mainHero.src.includes('sultan')) faceNum = "2";
            else if (mainHero.src.includes('king')) faceNum = "3";

            if (faceNum !== "" && !avatarImg.src.includes('face_' + faceNum)) {
                avatarImg.src = 'face_' + faceNum + '.png';
                circle.style.display = 'block';
            }
        }
    }, 500);
})();
