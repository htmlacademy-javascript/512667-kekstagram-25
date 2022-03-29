const isEscapeKey = (evt) => evt.key === 'Escape';

const stopEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

export {
  isEscapeKey,
  stopEscPropagation,
};
