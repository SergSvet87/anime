// Обработка элементов на странице "аниме-детали"
const detailData = () => {
  // Отображение списка категорий при наведении на кнопку "Категории"
  const renderGenreList = (genres) => {
    const dropdownBlock = document.querySelector('.header__menu .dropdown');

    // Перебираю полученный массив с жанрами и отображаю их на странице
    genres.forEach((genre) => {
      dropdownBlock.insertAdjacentHTML(
        'beforeend',
        `<li><a href="categories.html?ganre=${genre}">${genre}</a></li>`
      );
    });
  };

  // Отображаю описание карточки аниме на отдельной странице
  const renderAnimeDetails = (array, itemId) => {
    // Получаю элемент по id 
    const animeObj = array.find((item) => item.id == itemId);

    // Если элемент получен
    if (animeObj) {
      const imageBlock = document.querySelector('.anime__details__pic');
      const viewBlock = imageBlock.querySelector('.view');
      const titleBlock = document.querySelector('.anime__details__title h3');
      const subtitleBlock = document.querySelector(
        '.anime__details__title span'
      );
      const textBlock = document.querySelector('.anime__details__text p');
      const widgetList = document.querySelectorAll(
        '.anime__details__widget ul li'
      );

      const breadcrumb = document.querySelector('.breadcrumb__links span');

      imageBlock.dataset.setbg = animeObj.image;

      viewBlock.insertAdjacentHTML(
        'beforeend',
        `<i class="fa fa-eye"></i> ${animeObj.views}`
      );

      titleBlock.textContent = animeObj.title;
      subtitleBlock.textContent = animeObj['original-title'];

      textBlock.textContent = animeObj.description;

      widgetList[0].insertAdjacentHTML(
        'beforeend',
        `<span>Date aired:</span> ${animeObj.date}`
      );
      widgetList[1].insertAdjacentHTML(
        'beforeend',
        `<span>Rating:</span> ${animeObj.rating}`
      );
      widgetList[2].insertAdjacentHTML(
        'beforeend',
        `<span>Genre:</span> ${animeObj.tags.join(', ')}`
      );

      breadcrumb.textContent = animeObj.ganre;

      document.querySelectorAll('.set-bg').forEach((element) => {
        element.style.backgroundImage = `url(${element.dataset.setbg})`;
      });
    } else {
      console.log('Аниме отсутствует!');
    }
  };

  fetch(
    'https://anime-site-1bcb6-default-rtdb.firebaseio.com/anime.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const genres = new Set();
      const itemId = new URLSearchParams(window.location.search).get('itemId');

      data.forEach((item) => {
        genres.add(item.ganre);
      });

      if (itemId) {
        renderAnimeDetails(data, itemId);
      } else {
        console.log('Аниме отсутствует!');
      }

      renderGenreList(genres);
    });
};

detailData();