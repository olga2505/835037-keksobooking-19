'use strict';
// загрузка похожих объявлений с сервера
(function () {
  var URL__LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL__UPLOAD = 'https://js.dump.academy/keksobooking';

  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var setuoXMLHttpRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.data = {
    download: function (onSuccess, onError) {
      var xhr = setuoXMLHttpRequest(onSuccess, onError);
      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open('GET', URL__LOAD);
      xhr.send();
    },

    upload: function (data, onSuccess, onError) {
      var xhr = setuoXMLHttpRequest(onSuccess, onError);
      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open('POST', URL__UPLOAD);
      xhr.send(data);
    }
  };
})();
