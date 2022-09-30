// Инкапсуляция переменной
const mainData = () => {

  // Отображение списка категорий при наведении на кнопку "Категории"
  const renderGenreList = (genres) =>{
    // Получаю элемент для оторажения списка категорий с жанрами на странице
    const dropdownBlock = document.querySelector('.header__menu .dropdown')

    // Перебираю полученный массив с жанрами и отображаю их на странице
    genres.forEach(genre => {
      dropdownBlock.insertAdjacentHTML('beforeend', `
        <li><a href="categories.html?ganre=${genre}">${genre}</a></li>
      `)
    })
  }

  // Отрисовка элементов на странице по жанрам
  const renderAnimeList = (array, genres) => {
    // Получаю блок в html, где хранятся элементы по просмотрам
    const wrapper = document.querySelector('.product .col-lg-8')

    wrapper.innerHTML = '';

    // Перебираю полученный массив с жанрами для их отображения на странице
    genres.forEach((genre) => {
      // Создаю общий блок элемента с определенным жанром на странице
      const productBlock = document.createElement('div')
      // Создаю элемент на странице, где будут отображаться нужные элементы по жанру
      const listBlock = document.createElement('div')
      // Сортирую элементы по жанрам 
      const list = array.filter(item => item.ganre === genre)

      // Добавляю класс к созданному элементу
      listBlock.classList.add('row')

      // Добавляю отступ между созданными блоками
      productBlock.classList.add('mb-7')

      // Описываю блок по жанрам
      productBlock.insertAdjacentHTML('beforeend', `
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="section-title">
              <h4>${genre}</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="btn__all">
              <a href="categories.html?ganre=${genre}" class="primary-btn"
                >View All <span class="arrow_right"></span
              ></a>
            </div>
          </div>
        </div>
      `)

      // Описываю элемент, который будет находится в блоке выше
      list.forEach(item => {

        // Добавляю список
        const tagsBlock = document.createElement('ul')

        item.tags.forEach(tag => {
          tagsBlock.insertAdjacentHTML('beforeend', `
            <li>${tag}</li>
          `)
        })

        

        listBlock.insertAdjacentHTML('beforeend', `
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
              <div
                class="product__item__pic set-bg"
                data-setbg="${item.image}"
              >
                <div class="ep">${item.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
              </div>
              <div class="product__item__text">
                ${tagsBlock.outerHTML}
                <h5>
                  <a href="anime-details.html?itemId=${item.id}"
                    >${item.title}</a
                  >
                </h5>
              </div>
            </div>
          </div>
        `)
      })

      // Добавляю в блок с жанром подходящие элементы
      productBlock.append(listBlock)
      // Отрисовываю сам блок на странице
      wrapper.append(productBlock)

      // Перебираю картинки для их отображения в элементы с жанрами
      wrapper.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
      })
    })

  }

  // Отрисовка топ-5 элементов на странице
  const renderTopAnime = (array) => {
    // Получаю блок в html, где хранятся элементы по просмотрам
    const wrapper = document.querySelector('.filter__gallery')

    // Перебираю полученный массив с элементами для их отображения на странице
    array.forEach((item) => {
      wrapper.insertAdjacentHTML('beforeend', `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
            <div class="ep">${item.rating} / 10</div>
            <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
            <h5><a href="anime-details.html?itemId=${item.id}">${item.title}</a></h5>
        </div>
      `)
    });

    // Перебираю картинки для их отображения в топ-5
    wrapper.querySelectorAll('.set-bg').forEach((elem) => {
      elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    })
  }


  // Получаю данные из firebase, где загружена база даннных
  fetch('https://anime-site-1bcb6-default-rtdb.firebaseio.com/anime.json')
    .then(response => response.json())
    .then((data) => {
      // Получаю коллекцию из жанров
      const genres = new Set()

      // Перебираю массив и добавляю в коллекцию жанры
      data.forEach((item) => {
        genres.add(item.ganre)
      })

      // Вызываю функцию и сортирую элементы в массиве, чтобы получить топ-5 элементов по промотрам
      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));

      // Вызываю функцию для отображение элементов на странице по жанрам
      renderAnimeList(data, genres)

      // Вызываю функцию для отображение списка элементов Категорий по жанрам
      renderGenreList(genres)
    })
}

// Вызываю функцию
mainData() 