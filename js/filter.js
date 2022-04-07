const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

const filterDefaultButton = filtersForm.querySelector('#filter-default');
const filterRandomButton = filtersForm.querySelector('#filter-random');
const filterDiscussedButton = filtersForm.querySelector('#filter-discussed');

const setActiveFilterButton = (evt) => {
  if (evt.target.className.match('img-filters__button')) {
    filtersButton.forEach((element) => {
      element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  }
};

const setFilterDefault = (callback) => {
  filterDefaultButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (!evt.target.className.match('img-filters__button--active')) {
      setActiveFilterButton(evt);
      callback();
    }
  });
};

const setFilterRandom = (callback) => {
  filterRandomButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (!evt.target.className.match('img-filters__button--active')) {
      setActiveFilterButton(evt);
      callback();
    }
  });
};

const setFilterDiscussed = (callback) => {
  filterDiscussedButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (!evt.target.className.match('img-filters__button--active')) {
      setActiveFilterButton(evt);
      callback();
    }
  });
};

const showFilterMenu = () => {
  filter.classList.remove('img-filters--inactive');
};

export { showFilterMenu, setFilterDefault, setFilterRandom, setFilterDiscussed, };
