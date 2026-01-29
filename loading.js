(function() {
    // 1. Стили для анимации блеска и адаптивности
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shine {
            0% { transform: translateX(-150%) skewX(-25deg); }
            100% { transform: translateX(150%) skewX(-25deg); }
        }
        .progress-bar-inner::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 40%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            animation: shine 2s infinite;
        }
        #logo-container {
            width: 95vw; /* Адаптивная ширина под экран */
            height: 40vh; /* Занимает до 40% высоты экрана */
            max-height: 400px; /* Ограничение для больших экранов */
            background-image: url('war_of_kings_legacy_logo.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center top;
            filter: drop-shadow(0px 0px 25px rgba(0,0,0,0.9));
            position: absolute;
            top: 20px; /* Отступ сверху */
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000001;
        }
    `;
    document.head.appendChild(style);

    // 2. Основной контейнер (Фон)
    const loader = document.createElement('div');
    loader.id = 'game-loader-screen';
    Object.assign(loader.style, {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: '#000',
        backgroundImage: "url('Loading_screen_war_of_kings.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        zIndex: '1000000', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '80px'
    });

    // 3. Создаем ЛОГОТИП
    const logo = document.createElement('div');
    logo.id = 'logo-container';

    // 4. Контейнер для прогресса (внизу)
    const bottomContainer = document.createElement('div');
    Object.assign(bottomContainer.style, {
        width: '85%', textAlign: 'center', z-index: '1000002'
    });

    const percentText = document.createElement('div');
    percentText.innerText = '0%';
    Object.assign(percentText.style, {
        color: '#f9e27d', fontSize: '22px', fontWeight: 'bold',
        marginBottom: '12px', textShadow: '2px 2px 5px #000', fontFamily: 'serif'
    });

    const progressWrapper = document.createElement('div');
    Object.assign(progressWrapper.style, {
        width: '100%', height: '18px', background: 'rgba(0,0,0,0.8)',
        border: '2px solid #d4af37', borderRadius: '10px',
        overflow: 'hidden', position: 'relative', boxShadow: '0 0 15px rgba(212, 175, 55, 0.5)'
    });

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar-inner';
    Object.assign(progressBar.style, {
        width: '0%', height: '100%',
        background: 'linear-gradient(90deg, #8b6d11, #d4af37, #f9e27d)',
        transition: 'width 0.2s ease-out', position: 'relative'
    });

    // Сборка
    progressWrapper.appendChild(progressBar);
    bottomContainer.appendChild(percentText);
    bottomContainer.appendChild(progressWrapper);
    
    loader.appendChild(logo);
    loader.appendChild(bottomContainer);
    document.body.appendChild(loader);

    // 5. Логика загрузки
    let curProgress = 0;
    const interval = setInterval(() => {
        curProgress += Math.floor(Math.random() * 4) + 1;
        if (curProgress >= 100) {
            curProgress = 100;
            clearInterval(interval);
            finishLoading();
        }
        progressBar.style.width = curProgress + '%';
        percentText.innerText = `Подготовка к битве: ${curProgress}%`;
    }, 100);

    function finishLoading() {
        setTimeout(() => {
            loader.style.transition = 'opacity 1s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                if (typeof initChampionSelection === "function") {
                    initChampionSelection();
                } else {
                    console.log("Загрузка завершена. Переход к выбору героев.");
                }
            }, 1000);
        }, 500);
    }
})();
