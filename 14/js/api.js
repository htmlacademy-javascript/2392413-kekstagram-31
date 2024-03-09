const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

// const makeRequest = (route, method, errorText, body = null) =>
const makeRequest = function (route, method, errorText, body = null) {
  return fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });
};

const getData = function () {
  return makeRequest(
    '/data',
    'GET',
    'Не удалось загрузить данные. Попробуйте обновить страницу'
  );
};

const sendData = function (body) {
  return makeRequest(
    '/',
    'POST',
    'Не удалось отправить данные. Попробуйте обновить страницу',
    body
  );
};

export { getData, sendData };
