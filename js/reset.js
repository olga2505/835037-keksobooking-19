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

  var onButtonEscMessage = function (evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };
  // Очистка формы
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');
  var buttonFormReset = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var resetForm = function () {
    form.reset();
    mapFilters.reset();
  };

  var deactivatePage = function () {
    window.map.setAddressAndBlockingForm();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    // var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    // var successMessageElement = successMessageTemplate.cloneNode(true);
    // main.appendChild(successMessageElement);
    // document.addEventListener('click', onMessageCloseClick);
    // document.addEventListener('keydown', onButtonEscMessage);

    // var mapCard = document.querySelector('.map__card');
    // if (mapCard) {
    //   mapCard.parentNode.removeChild(mapCard);
    // }

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

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessageElement);
    document.addEventListener('click', onMessageCloseClick);
    document.addEventListener('keydown', onButtonEscMessage);

    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
    }
  };

  var onFormReset = function () {
    deactivatePage();
    resetForm();
  };

  var onSuccess = function () {
    deactivatePage();
    showSuccessMessage();

  };

  buttonFormReset.addEventListener('click', onFormReset);
  buttonFormReset.addEventListener('keydown', onFormReset);

  form.addEventListener('reset', onFormReset);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(form), onSuccess, window.pin.onError);
    document.removeEventListener('click', onMessageCloseClick);
    document.removeEventListener('keydown', onButtonEscMessage);
    resetForm();
  });
})();
