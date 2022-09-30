// Инкапуляция переменной swiper
const slider = () => {
  // Получаю элемент swiper из html
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,  //Цикличность
    effect: 'fade', //Затухание
    speed: 1000,  //Скорость прокрутки

    // If we need pagination
    pagination: {
      el: '.swiper-pagination', //Включение пагинации
    },

    // Navigation arrows (стрелки перелистывания)
    navigation: {
      nextEl: '.swiper-button-next', //Стрелка вправо
      prevEl: '.swiper-button-prev', //Стрелка влево
    },
  });
}

// Вызов функции
slider()