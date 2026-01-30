(function() {
    // Создаем элемент изображения
    const img = document.createElement('img');
    
    // Устанавливаем путь к файлу с расширением .png
    img.src = 'tsar-castle.png';
    
    // Атрибуты и стили
    img.alt = 'Замок Царя';
    img.id = 'tsar-castle-img';
    
    // Стили: центрирование и золотая рамка
    img.style.display = 'block';
    img.style.margin = '20px auto';
    img.style.maxWidth = '90%';
    img.style.border = '5px solid #ffd700'; // Золотой цвет
    img.style.borderRadius = '15px';
    img.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)'; // Свечение

    // Добавляем картинку в body
    document.body.appendChild(img);
})();
