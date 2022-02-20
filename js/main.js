// ( used code from: https://learn.javascript.ru/task/random-int-min-max )

function randomInteger (min, max) {

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

randomInteger (0, 5);

function checkComment (comment = '', max = 140) {

  if (comment.length > max) {
    return false;
  }

  return true;

}

checkComment ('Комментарий от Кекса');
