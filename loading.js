(function() {
    // 1. Создаем контейнер
    const loader = document.createElement('div');
    loader.id = 'game-loader';
    Object.assign(loader.style, {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: '#000',
        backgroundImage: "url('Loading_screen_war_of_kings.png')", // Твой фон с битвой
        backgroundSize: 'cover', backgroundPosition: 'center',
        zIndex: 100000, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif'
    });

    // 2. Добавляем ЛОГОТИП (твое фото с названием)
    const logo = document.createElement('div');
    Object.assign(logo.style, {
        width: '80%', height: '200px',
        backgroundImage: "url('war_of_kings_legacy_logo.png')", // Твое фото названия
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', marginBottom: 'auto', marginTop: '50px'
    });
    loader.appendChild(logo);

    // 3. Создаем шкалу загрузки
    const progressWrapper = document.createElement('div');
    Object.assign(progressWrapper.style, {
        width: '80%', height: '25px', background: 'rgba(0,0,0,0.7)',
        border: '2px solid #d4af37', borderRadius: '12px',
        position: 'relative', overflow: 'hidden', marginBottom: '100px'
    });

    const progressBar = document.createElement('div');
    Object.assign(progressBar.style, {
        width: '0%', height: '100%',
        background: 'linear-gradient(90deg, #8b6d11, #d4af37, #f9e27d)',
        transition: 'width 0.1s linear', position: 'relative'
    });

    // Анимация "Бегущий блеск"
    const flash = document.createElement('div');
    flash.innerHTML = '&nbsp;';
    Object.assign(flash.style, {
        position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        animation: 'shine 1.5s infinite'
    });
    
    // Добавляем стиль анимации в head
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shine { 
            0% { left: -100%; } 
            100% { left: 100%; } 
        }
    `;
    document.head.appendChild(style);

    const percentText = document.createElement('div');
    percentText.innerText = 'Загрузка империи: 0%';
    Object.assign(percentText.style, {
        color: '#fff', fontSize: '18px', marginBottom: '10px', textShadow: '2px 2px 4px #000'
    });

    progressBar.appendChild(flash);
    progressWrapper.appendChild(progressBar);
    loader.appendChild(percentText);
    loader.appendChild(progressWrapper);
    document.body.appendChild(loader);

    // 4. Логика загрузки
    let curProgress = 0;
    const interval = setInterval(() => {
        curProgress += Math.floor(Math.random() * 5) + 1;
        if (curProgress >= 100) {
            curProgress = 100;
            clearInterval(interval);
            finishLoading();
        }
        progressBar.style.width = curProgress + '%';
        percentText.innerText = `Загрузка империи: ${curProgress}%`;
    }, 150);

    function finishLoading() {
        setTimeout(() => {
            loader.style.transition = 'opacity 0.8s';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                startChampionSelection(); // Автомат. переход к выбору
            }, 800);
        }, 500);
    }

    function startChampionSelection() {
        console.log("Запуск выбора чемпионов...");
        // Если функция выбора чемпионов в interface.js или city.js, вызываем её:
        if (typeof openHeroSelect === "function") {
            openHeroSelect();
        } else {
            alert("Выберите своего чемпиона: Царь, Султан или Король!");
        }
    }
})();
