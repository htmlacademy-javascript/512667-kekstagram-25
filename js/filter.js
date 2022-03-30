import {
  clearThumbs,
  filterDefault,
  filterRandom,
  filterDiscussed,
} from './sort.js';

import {
  photosData,
} from './thumb.js';

const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

const showActiveButton = (evt) => {
  evt.preventDefault();

  if (!evt.target.className.match('img-filters__button--active') && evt.target.className.match('img-filters__button')) {
    for (let i = 0; i < filtersButton.length; i++) {
      filtersButton[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    switch (evt.target.id) {
      case 'filter-random': {
        filterRandom(photosData);
        break;
      }
      case 'filter-discussed': {
        filterDiscussed(photosData);
        break;
      }
      case 'filter-default': {
        filterDefault();
        break;
      }
      default: {
        clearThumbs();
      }
    }
  }
};

const showFilterMenu = () => {
  filter.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', showActiveButton);
};

export {
  showFilterMenu,
};
