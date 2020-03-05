'use strict';
// модуль разблокировки страницы
(function () {
  var ENTER_KEY = 'Enter';
  var MAP_PIN_CIRCLE = 65;
  var MAP_PIN_HEIGHT = 84;
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var NUMBER_OF_ADS = 8;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var allFieldsetsForm = document.querySelectorAll('fieldset');
  var mapFilterSelect = document.querySelectorAll('.map__filters select');
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var offers = window.data.createAdvertisements(NUMBER_OF_ADS); // массив

  var setAddressAndBlockingForm = function () {
    allFieldsetsForm.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    mapFilterSelect.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    address.value = Math.ceil(MAP_PIN_X + MAP_PIN_CIRCLE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_CIRCLE / 2);
  };

  var getAddressAndUnlockForm = function () { // функция разблокировки и запись адреса
    map.classList.remove('map--faded');
    allFieldsetsForm.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFilterSelect.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    adForm.classList.remove('ad-form--disabled');
    address.value = Math.ceil(MAP_PIN_X + MAP_PIN_CIRCLE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_HEIGHT);
    window.pin.render(offers);
    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  };

  var onPinMainMousedown = function (evt) {
    if (evt.button === 0) {
      getAddressAndUnlockForm();
    }
  };

  var onPinMainKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      getAddressAndUnlockForm();
    }
  };

  pinMain.addEventListener('mousedown', onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);

  setAddressAndBlockingForm();
})();
