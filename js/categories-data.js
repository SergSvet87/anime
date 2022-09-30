// Обработка элементов на странице "категории"
const categoriesData = () => {

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

  // Отрисовка элементов на странице по жанрам
  const renderAnimeList = (array, genres) => {
    const wrapper = document.querySelector('.product-page .col-lg-8');

    genres.forEach((genre) => {
      const productBlock = document.createElement('div');
      const listBlock = document.createElement('div');
      const list = array.filter((item) => item.tags.includes(genre));

      listBlock.classList.add('row');
      productBlock.classList.add('mb-7');

      productBlock.insertAdjacentHTML(
        'beforeend',
        `
			  <div class="row">
				  <div class="col-lg-8 col-md-8 col-sm-8">
					  <div class="section-title">
						  <h4>${genre}</h4>
					  </div>
				  </div>
				  <div class="col-lg-4 col-md-4 col-sm-4">
					  <div class="btn__all">
					  <a href="categories.html?genre=${genre}" class="primary-btn">View All <span class="arrow_right"></span></a>
					  </div>
				  </div>
			  </div>
		  `
      );

      list.forEach((item) => {
        const tagsBlock = document.createElement('ul');

        item.tags.forEach((tag) => {
          tagsBlock.insertAdjacentHTML('beforeend', `<li>${tag}</li>`);
        });

        listBlock.insertAdjacentHTML(
          'beforeend',
          `
				  <div class="col-lg-4 col-md-6 col-sm-6">
					  <div class="product__item">
						  <div class="product__item__pic set-bg" data-setbg="${item.image}">
							  <div class="ep">${item.rating} / 10</div>
							  <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
						  </div>
						  <div class="product__item__text">
							  ${tagsBlock.outerHTML}
							  <h5>
								  <a href="anime-details.html?itemId=${item.id}">${item.title}</a>
							  </h5>
						  </div>
					  </div>
				  </div>
			  `
        );
      });

      productBlock.append(listBlock);
      wrapper.append(productBlock);

      wrapper.querySelectorAll('.set-bg').forEach((element) => {
        element.style.backgroundImage = `url(${element.dataset.setbg})`;
      });
    })
  }

  // Отрисовка топ-5 элементов на странице
  const renderTopAnime = (array) => {
    const wrapper = document.querySelector('.filter__gallery');

    array.forEach((item) => {
      wrapper.insertAdjacentHTML(
        'beforeend',
        `
			  <div class="product__sidebar__view__item set-bg" data-setbg="${item.image}">
				  <div class="ep">${item.rating} / 10</div>
				  <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
				  <h5><a href="anime-details.html?itemId=${item.id}">${item.title}</a></h5>
				 </div>
			  `
      );
    });

    wrapper.querySelectorAll('.set-bg').forEach((element) => {
      element.style.backgroundImage = `url(${element.dataset.setbg})`;
    });
  };

  // Получаю данные из firebase, где загружена база даннных
  fetch(
    'https://anime-site-1bcb6-default-rtdb.firebaseio.com/anime.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const genres = new Set();

      // Получаю ссылку с элементами, в которых есть ключ  "ganre" из БД
      const genreParams = new URLSearchParams(window.location.search).get(
        'ganre'
      );

      data.forEach((item) => {
        genres.add(item.ganre);
      });

      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));

      // Если есть такой ключ у элемента, то показываю его на сайте, согласно жанра
      if (genreParams) {
        renderAnimeList(data, [genreParams]);
        const viewAllLink = document.querySelector('.product-page .col-lg-4');
        viewAllLink.innerHTML = '';
      } else {
        renderAnimeList(data, genres);
      }

      renderGenreList(genres);
    });
}

// Вызываю функцию
categoriesData()