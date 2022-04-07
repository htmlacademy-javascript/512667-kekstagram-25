import { getData, } from './api.js';
import { getPhotosData, renderThumbs, } from './thumb.js';
import { showFilterMenu, setFilterDefault, setFilterRandom, setFilterDiscussed, } from './filter.js';
import { filterDefault, filterRandom, filterDiscussed, } from './sort.js';
import { showModal, } from './modal.js';
import { showAlert, debounce, } from './util.js';
import './pristine.js';
import './slider.js';

const RERENDER_DELAY = 500;

getData(
  (photos) => {
    getPhotosData(photos);
    renderThumbs(photos);

    setFilterDefault(debounce(
      () => filterDefault(photos),
      RERENDER_DELAY,
    ));

    setFilterRandom(debounce(
      () => filterRandom(photos),
      RERENDER_DELAY,
    ));

    setFilterDiscussed(debounce(
      () => filterDiscussed(photos),
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
