import {
  getPhotosData,
  renderThumbs,
} from './thumb.js';

import {
  showAlert,
} from './util.js';

import {
  showFilterMenu,
} from './filter.js';

const createLoader = () => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      getPhotosData(photos);
      renderThumbs(photos);

      showFilterMenu();

      showAlert('Все данные успешно загружены. Поздравляем!', 'green');
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Что-то пошло не так', 'red');
    });
};

export {
  createLoader,
};
