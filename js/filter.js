const filter = document.querySelector('.img-filters');

const showFilterMenu = () => {
  filter.classList.remove('img-filters--inactive');
};

export {
  showFilterMenu,
};
