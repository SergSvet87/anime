// Инкапсуляция переменной
const preloader = () => {
  // Получаем элемент с html документа
  const preloader = document.getElementById('preloder');

  // Подключаем класс активности к элементу
  preloader.classList.add('active');

  // Устанавливаю время загрузки элемента
  setTimeout(() => {
    preloader.classList.remove('active');
  }, 500)
}

// Вызов функции
preloader()