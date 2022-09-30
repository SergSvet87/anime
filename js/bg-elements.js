// Инкапсуляция переменной
const bgElements = () => {
  // Получаем все элементы с классами set-bg
  const elements = document.querySelectorAll('.set-bg');

  // Перебираем полученные элементы

  // С помощью цикла for
  // for (let index = 0; index < elements.length; index++) {
  //   // Получаем дата атрибут этих элементов
  //   const src = elements[index].dataset.setbg;

  //   // Устаналиваем картинку с нужным атрибутом в html
  //   elements[index].style.backgroundImage = `url(${src})`;
  // }

  // с помощью метода forEach
  elements.forEach((elem) => {
    elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
  })
}

// Вызов функции
bgElements()