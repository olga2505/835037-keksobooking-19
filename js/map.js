'use strict';
// модуль разблокировки страницы
(function () {
  var MAP_PIN_CIRCLE = 65;
  var MAP_PIN_HEIGHT = 84;
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var allFieldsetsForm = document.querySelectorAll('fieldset');
  var mapFilterSelect = document.querySelectorAll('.map__filters select');
  var address = document.querySelector('#address');

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
    window.load(window.pin.onSuccess, window.pin.onError);
  };

  setAddressAndBlockingForm();

  window.map = {
    getAddressAndUnlockForm: getAddressAndUnlockForm,
    setAddressAndBlockingForm: setAddressAndBlockingForm,
    MAP_PIN_X: MAP_PIN_X,
    MAP_PIN_Y: MAP_PIN_Y
  };
})();
