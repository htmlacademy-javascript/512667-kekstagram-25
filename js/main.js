// ( used code from: https://learn.javascript.ru/task/random-int-min-max )

function getRandomInteger (min, max) {

  let maxNew = Math.floor(max);
  let minNew = Math.floor(min);

  if (maxNew < 0) {
    maxNew = 0;
  }

  if (minNew < 0) {
    minNew = 0;
  }

  if (minNew === maxNew) {
    return minNew;
  }

  if (minNew > maxNew) {
    maxNew = Math.floor(min);
    minNew = Math.floor(max);
  }

  return Math.floor(Math.random() * (maxNew + 1 - minNew)) + minNew;

}

getRandomInteger (0, 5);

function checkContentLength (content, max = 140) {

  if (content.length > max) {
    return false;
  }

  return true;

}

checkContentLength ('Комментарий от Кекса');
