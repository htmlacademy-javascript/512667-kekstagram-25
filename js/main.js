import { getData, } from './api.js';
import { getPhotosData, renderThumbs, } from './thumb.js';
import { showFilterMenu, setFiltersForm, clearActiveFilters, setActiveFilter, isActiveFilter, renderActiveFilter, } from './filter.js';
import { showModal, } from './modal.js';
import { showAlert, debounce, } from './util.js';
import './pristine.js';
import './slider.js';

const RERENDER_DELAY = 500;

getData(
  (photosData) => {
    getPhotosData(photosData);
    renderThumbs(photosData);

    setFiltersForm(debounce(
      (filterId) => {
        if (!isActiveFilter(filterId)) {
          clearActiveFilters();
          setActiveFilter(filterId);
          renderActiveFilter(filterId, photosData);
        }
      },
      RERENDER_DELAY,
    ));

    showFilterMenu();
    showModal();

    showAlert('Все данные успешно загружены. Поздравляем!');
  },
  (err) => {
    showAlert(`${ err }. Не удалось загрузить данные. Что-то пошло не так`);
  },
);
