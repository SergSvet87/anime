// Инкапсуляция переменной 
const scrollToTop = () => {
  // Кнопка для прокрутки к верху страницы (находится в самом низу, перед футером)
  const scrollToTop = document.querySelector('#scrollToTopButton')

  // Вешаем событие клик на кнопку
  scrollToTop.addEventListener('click', (event) => {
    // Отменяем обычное поведение ссылок
    event.preventDefault();

    // С помощью события seamless-scroll-polyfill(библиотека подключена с https://www.npmjs.com/package/seamless-scroll-polyfill) создаем плавную прокрутку вверх страницы
    seamless.scrollIntoView(document.querySelector(".header"), {
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  })
}

// Вызываю функцию
scrollToTop()