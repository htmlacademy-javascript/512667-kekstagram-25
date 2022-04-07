import { photosData, } from './thumb.js';

const COMMENTS_LOADING_STEP = 5;

const commentsCounter = document.querySelector('.social__comment-count');
const spanCurrentContainer = document.createElement('span');
const spanCountContainer = document.createElement('span');
const spanTextContainer = document.createElement('span');
const commentsLoader = document.querySelector('.comments-loader');

commentsCounter.textContent = '';

spanCurrentContainer.classList.add('comments-current');
commentsCounter.append(spanCurrentContainer);

spanCountContainer.classList.add('comments-count');
commentsCounter.append(spanCountContainer);

spanTextContainer.classList.add('comments-text');
spanTextContainer.textContent = ' комментариев';
commentsCounter.append(spanTextContainer);

const onCommentsLoaderClickButton = () => {

  const socialComments = document.querySelectorAll('.social__comment');
  const commentsLength = socialComments.length;

  let commentsHiddenCounter = 0;
  let commentsShownCounter = 0;

  for (let i = 0; i < commentsLength; i++) {
    if (socialComments[i].classList.contains('hidden')) {
      socialComments[i].classList.remove('hidden');
      commentsHiddenCounter += 1;
    } else {
      commentsShownCounter += 1;
    }

    if (commentsHiddenCounter >= COMMENTS_LOADING_STEP) {
      break;
    }
  }

  const commentsCounterSum = commentsHiddenCounter + commentsShownCounter;
  spanCurrentContainer.textContent = `${ commentsCounterSum } из `;

  if (commentsLength === commentsCounterSum) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderComments = (values) => {
  const commentsList = document.querySelector('.social__comments');
  const templateFragment = document.querySelector('#comment').content;
  const template = templateFragment.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();

  let commentsCount = 0;

  values.comments.forEach(({id, avatar, name, message}) => {
    const element = template.cloneNode(true);
    element.id = `comment-${ parseFloat(id) + 1 }`;

    commentsCount++;
    if (commentsCount > COMMENTS_LOADING_STEP) {
      element.classList.add('hidden');
    }

    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;

    fragment.appendChild(element);
  });

  commentsList.textContent = '';
  commentsList.appendChild(fragment);
};

const renderPicture = (element, id) => {

  const commentsLength = photosData[id].comments.length;

  element.querySelector('.big-picture__img').children[0].src = photosData[id].url;
  element.querySelector('.big-picture__img').children[0].alt = `Фотография № ${ parseFloat(id) + 1 }`;
  element.querySelector('.social__caption').textContent = photosData[id].description;
  element.querySelector('.likes-count').textContent = photosData[id].likes;
  element.querySelector('.comments-count').textContent = commentsLength;

  if (commentsLength <= COMMENTS_LOADING_STEP) {
    spanCurrentContainer.textContent = `${ commentsLength } из `;
    commentsLoader.classList.add('hidden');
  } else {
    spanCurrentContainer.textContent = '5 из ';
    commentsLoader.classList.remove('hidden');
  }

  renderComments(photosData[id]);
};

export { COMMENTS_LOADING_STEP, commentsLoader, onCommentsLoaderClickButton, renderPicture, };
