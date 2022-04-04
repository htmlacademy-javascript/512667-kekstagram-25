const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

const filterDefaultButton = filtersForm.querySelector('#filter-default');
const filterRandomButton = filtersForm.querySelector('#filter-random');
const filterDiscussedButton = filtersForm.querySelector('#filter-discussed');

filtersForm.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.className.match('img-filters__button')) {
    for (let i = 0; i < filtersButton.length; i++) {
      filtersButton[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  }
});

const setFilterDefault = (callback) => {
  filterDefaultButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    callback();
  });
};

const setFilterRandom = (callback) => {
  filterRandomButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    callback();
  });
};

const setFilterDiscussed = (callback) => {
  filterDiscussedButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    callback();
  });
};

const showFilterMenu = () => {
  filter.classList.remove('img-filters--inactive');
};

export { showFilterMenu, setFilterDefault, setFilterRandom, setFilterDiscussed, };
