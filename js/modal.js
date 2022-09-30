// Инкапсуляция переменной
const modal = () => {
  // Получаю модальное окно поиска
  const modal = document.querySelector('.search-model');

  // Получаю кнопку открывания модального окна
  const modalBtn = document.querySelector('.icon_search');

  // Получаю нопку закрывания модального окна, уже в самом модальном окне
  const modalClose = modal.querySelector('.search-close-switch');

  // Вешаю клик на кнопку и открываю модальное окно
  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  })

  // Вешаю клик на кнопку Закрыть и закрываю модальное окно
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  })
}

// Вызов функции
modal()