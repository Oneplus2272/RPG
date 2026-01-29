(function() {
    // 1. Стили: Логотип вверху, медленный блеск только по золоту
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shine {
            0% { left: -150%; }
            100% { left: 150%; }
        }
        .shiny-effect {
            position: absolute;
            top: 0; width: 60px; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
            transform: skewX(-25deg);
            animation: shine 3.5s infinite ease-in-out; /* Замедлил до 3.5 секунд */
        }
        #logo-container {
            width: 95vw;
            height: 45vh; /* Чуть больше высоты */
            max-height: 500px;
            background-image: url('war_of_kings_legacy_logo.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center top;
            position: absolute;
            top: 5px; /* Максимально вверх */
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000001;
        }
    `;
    document.head.appendChild(style);

    // 2. Фон
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

    // 3. Логотип
    const logo = document.createElement('div');
    logo.id = 'logo-container';

    // 4. Прогресс-бар
    const bottomContainer = document.createElement('div');
    Object.assign(bottomContainer.style, { width: '85%', textAlign: 'center', zIndex: '1000002' });

    const percentText = document.createElement('div');
    percentText.innerText = '0%';
    Object.assign(percentText.style, {
        color: '#f9e27d', fontSize: '20px', fontWeight: 'bold',
        marginBottom: '10px', textShadow: '2px 2px 5px #000', fontFamily: 'serif'
    });

    const progressWrapper = document.createElement('div');
    Object.assign(progressWrapper.style, {
        width: '100%', height: '22px', background: 'rgba(0,0,0,0.85)',
        border: '2px solid #d4af37', borderRadius: '12px',
        overflow: 'hidden', position: 'relative'
    });

    const progressBar = document.createElement('div');
    Object.assign(progressBar.style, {
        width: '0%', height: '100%',
        background: 'linear-gradient(90deg, #8b6d11, #d4af37, #f9e27d)',
        transition: 'width 0.3s ease-out', position: 'relative', overflow: 'hidden'
    });

    // Тот самый блеск — теперь он внутри progressBar
    const shine = document.createElement('div');
    shine.className = 'shiny-effect';
    progressBar.appendChild(shine);

    progressWrapper.appendChild(progressBar);
    bottomContainer.appendChild(percentText);
    bottomContainer.appendChild(progressWrapper);
    
    loader.appendChild(logo);
    loader.appendChild(bottomContainer);
    document.body.appendChild(loader);

    // 5. Логика
    let curProgress = 0;
    const interval = setInterval(() => {
        curProgress += Math.floor(Math.random() * 3) + 1;
        if (curProgress >= 100) {
            curProgress = 100;
            clearInterval(interval);
            finishLoading();
        }
        progressBar.style.width = curProgress + '%';
        percentText.innerText = `Подготовка к битве: ${curProgress}%`;
    }, 150);

    function finishLoading() {
        setTimeout(() => {
            loader.style.transition = 'opacity 1s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                if (typeof initChampionSelection === "function") initChampionSelection();
            }, 1000);
        }, 500);
    }
})();
