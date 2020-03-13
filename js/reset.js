'use strict';
// Сообщение об отпрвке данных на сервер и его закрытие
(function () {
  var closeMessage = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.parentNode.removeChild(success);
    }
  };

  var onMessageCloseClick = function () {
    closeMessage();
  };

  var onBattonEscMessage = function (evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };
  // Очистка формы
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');
  var buttonFormReset = document.querySelector('.ad-form__reset');

  var resetForm = function () {
    form.reset();
    window.map.setAddressAndBlockingForm();
    map.classList.add('map--faded');
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessageElement);
    document.addEventListener('click', onMessageCloseClick);
    document.addEventListener('keydown', onBattonEscMessage);

    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
    }

    var mapPin = document.querySelector('.map__pin');
    mapPin.style.left = window.map.MAP_PIN_X + 'px';
    mapPin.style.top = window.map.MAP_PIN_Y + 'px';

    var mapPinAll = document.querySelectorAll('.map__pin');
    mapPinAll.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.parentNode.removeChild(item);
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      resetForm();
    });
    evt.preventDefault();
  });

  buttonFormReset.addEventListener('click', function (evt) {
    resetForm();
    evt.preventDefault();
  });
})();
