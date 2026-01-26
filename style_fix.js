(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Ставим твой фон bg.jpg на экран выбора */
        #selection-screen {
            background-image: url('bg.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
        }

        /* Делаем карточки прозрачными, чтобы фон просвечивал */
        .card {
            background: rgba(15, 15, 15, 0.8) !important;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(237, 180, 50, 0.3) !important;
        }

        /* УМЕНЬШАЕМ ЧЕМПИОНОВ НА КАРТОЧКАХ */
        .card img {
            height: 140px !important;
            object-fit: contain !important;
            background: transparent !important;
            margin-bottom: 10px !important;
        }

        /* УМЕНЬШАЕМ ЧЕМПИОНА В ЗАМКЕ (после выбора) */
        #main-hero-img {
            height: 48vh !important;
            filter: drop-shadow(0 0 20px rgba(0,0,0,0.8));
        }
    `;
    document.head.appendChild(style);
})();
