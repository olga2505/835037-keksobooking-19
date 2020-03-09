'use strict';
// перетаскивание метки
(function () {
  var MAP_PIN_CIRCLE = 65;
  var MAP_PIN_HEIGHT = 84;
  var pinMain = document.querySelector('.map__pin--main');
  var ENTER_KEY = 'Enter';
  var address = document.querySelector('#address');


  var onPinMainMousedown = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      window.map.getAddressAndUnlockForm();
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (startCoords.x > 0 && startCoords.x <= 1200 && startCoords.y >= 130 && startCoords.y <= 630) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

        address.value = Math.ceil(startCoords.x + MAP_PIN_CIRCLE / 2) + ', ' + Math.ceil(startCoords.y + MAP_PIN_HEIGHT);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  var onPinMainKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.map.getAddressAndUnlockForm();
    }
  };

  pinMain.addEventListener('mousedown', onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);
})();
