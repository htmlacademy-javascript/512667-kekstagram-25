const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(GET_URL,
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
      onSuccess(photos);
    })
    .catch((err) => {
      onError(err.message);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export { POST_URL, getData, sendData, };
