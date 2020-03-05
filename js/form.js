'use strict';
// модуль работы с формой
(function () {
  var adForm = document.querySelector('.ad-form');
  var costHousing = document.querySelector('#price');
  var type = document.querySelector('#type');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var housingTypeMinPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  type.addEventListener('change', function () {
    costHousing.setAttribute('placeholder', housingTypeMinPriceMap[type.value]);
    costHousing.setAttribute('min', housingTypeMinPriceMap[type.value]);
  });

  checkin.addEventListener('change', function () { // синхронизация времени заезда - выезда
    checkout.value = checkin.value;
  });

  checkout.addEventListener('change', function () {
    checkin.value = checkout.value;
  });

  var validateRoomsGuests = function () { // количество комнат и гостей
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);
    if (rooms === 1 && guests > 1) {
      roomNumber.setCustomValidity('Нужно большее количество комнат');
    } else if (rooms === 2 && guests > 2) {
      roomNumber.setCustomValidity('Нужно большее количество комнат');
    } else if (rooms === 3 && guests > 3) {
      roomNumber.setCustomValidity('Нужно большее количество комнат');
    } else if (guests === 0 && rooms < 100) {
      roomNumber.setCustomValidity('Нужно большее количество комнат');
    } else if (rooms === 100 && guests > 0) {
      roomNumber.setCustomValidity('Не для гостей');
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', function () {
    validateRoomsGuests();
  });

  capacity.addEventListener('change', function () {
    validateRoomsGuests();
  });

  validateRoomsGuests();
})();
