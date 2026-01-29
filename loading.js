(function() {
    // 1. Стили для анимации блеска
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
    `;
    document.head.appendChild(style);

    // 2. Основной контейнер (Фон - битва)
    const loader = document.createElement('div');
    loader.id = 'game-loader-screen';
    Object.assign(loader.style, {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: '#000',
        backgroundImage: "url('Loading_screen_war_of_kings.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        zIndex: '1000000', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between', padding: '60px 0'
    });

    // 3. ЛОГОТИП (Фото с названием - Сделано больше)
    const logo = document.createElement('div');
    Object.assign(logo.style, {
        width: '90%', // Увеличено
        height: '300px', // Увеличено
        backgroundImage: "url('war_of_kings_legacy_logo.png')",
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'drop-shadow(0px 0px 20px rgba(0,0,0,0.8))'
    });

    // 4. Контейнер для нижних элементов (текст + шкала)
    const bottomContainer = document.createElement('div');
    Object.assign(bottomContainer.style, {
        width: '85%', textAlign: 'center'
    });

    const percentText = document.createElement('div');
    percentText.innerText = '0%';
    Object.assign(percentText.style, {
        color: '#f9e27d', fontSize: '24px', fontWeight: 'bold',
        marginBottom: '10px', textShadow: '2px 2px 5px #000', fontFamily: 'serif'
    });

    // Внешняя часть шкалы
    const progressWrapper = document.createElement('div');
    Object.assign(progressWrapper.style, {
        width: '100%', height: '20px', background: 'rgba(0,0,0,0.8)',
        border: '2px solid #d4af37', borderRadius: '10px',
        overflow: 'hidden', position: 'relative', boxShadow: '0 0 15px rgba(212, 175, 55, 0.5)'
    });

    // Внутренняя часть шкалы (заполнение)
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar-inner';
    Object.assign(progressBar.style, {
        width: '0%', height: '100%',
        background: 'linear-gradient(90deg, #8b6d11, #d4af37, #f9e27d)',
        transition: 'width 0.2s ease-out', position: 'relative'
    });

    // Собираем всё вместе
    progressWrapper.appendChild(progressBar);
    bottomContainer.appendChild(percentText);
    bottomContainer.appendChild(progressWrapper);
    
    loader.appendChild(logo);
    loader.appendChild(bottomContainer);
    document.body.appendChild(loader);

    // 5. Логика загрузки
    let curProgress = 0;
    const interval = setInterval(() => {
        // Рандомная скорость загрузки для реализма
        curProgress += Math.floor(Math.random() * 4) + 1;
        
        if (curProgress >= 100) {
            curProgress = 100;
            clearInterval(interval);
            finishLoading();
        }
        
        progressBar.style.width = curProgress + '%';
        percentText.innerText = `Загрузка империи: ${curProgress}%`;
    }, 120);

    function finishLoading() {
        setTimeout(() => {
            loader.style.transition = 'opacity 1s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                // Автоматический вызов выбора чемпионов
                if (typeof initChampionSelection === "function") {
                    initChampionSelection();
                } else {
                    console.log("Система: Переход к выбору фракции...");
                    // Вызываем твой стартовый метод из других файлов
                    startSelectionFlow(); 
                }
            }, 1000);
        }, 500);
    }

    // Заглушка, если функции еще нет в других файлах
    function startSelectionFlow() {
        // Здесь будет код появления Царя, Султана и Короля
        document.body.style.backgroundColor = "#1a1a1a";
    }

})();
