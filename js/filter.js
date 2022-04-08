import { clearThumbs, renderFilterDefault, renderFilterRandom, renderFilterDiscussed, } from './sort.js';

const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButtons = filtersForm.querySelectorAll('.img-filters__button');

const clearActiveFilters = () => {
  filtersButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
};

const setActiveFilter = (filterId) => {
  const currentFilter = filtersForm.querySelector(`#${ filterId }`);
  currentFilter.classList.add('img-filters__button--active');
};

const isActiveFilter = (filterId) => {
  const currentFilter = filtersForm.querySelector(`#${ filterId }`);
  if (!currentFilter.className.match('img-filters__button--active')) {
    return false;
  }
  return true;
};

const renderActiveFilter = (filterId, photosData) => {
  switch (filterId) {
    case 'filter-random': {
      renderFilterRandom(photosData);
      break;
    }
    case 'filter-discussed': {
      renderFilterDiscussed(photosData);
      break;
    }
    case 'filter-default': {
      renderFilterDefault(photosData);
      break;
    }
    default: {
      clearThumbs();
    }
  }
};

const setFiltersForm = (callback) => {
  filtersForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    callback(evt.target.id);
  });
};

const showFilterMenu = () => {
  filter.classList.remove('img-filters--inactive');
};

export { showFilterMenu, setFiltersForm, clearActiveFilters, setActiveFilter, isActiveFilter, renderActiveFilter, };
