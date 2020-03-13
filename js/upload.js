'use strict';
// Отправка данных на сервер
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответ: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      var main = document.querySelector('main');
      var errorMessageTemplate = document.querySelector('#error').textContent.querySelector('.error');
      var errorMessageElement = errorMessageTemplate.cloneNode(true);
      main.appendChild(errorMessageElement);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
