'use strict';
// перетаскивание метки
(function () {
  var MAP_PIN_CIRCLE = 65;
  var MAP_PIN_HEIGHT = 75;
  var ENTER_KEY = 'Enter';
  var PIN_COORDS = {
    xCord: {
      min: 0,
      max: 1200
    },
    yCord: {
      min: 130,
      max: 630
    }
  };
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var map = document.querySelector('.map');

  var onPinMainMousedown = function (evt) {
    if (map.classList.contains('map--faded')) {
      if (evt.button === 0) {
        window.map.getAddressAndUnlockForm();
      }
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinateAddressX = parseInt(pinMain.style.left, 10) + Math.round(MAP_PIN_CIRCLE / 2) - shift.x;
      var coordinateAddressY = parseInt(pinMain.style.top, 10) + MAP_PIN_HEIGHT - shift.y;

      if (coordinateAddressX >= PIN_COORDS.xCord.min && coordinateAddressX <= PIN_COORDS.xCord.max) {

        pinMain.style.left = (coordinateAddressX - MAP_PIN_CIRCLE / 2) + 'px';
      } else {
        coordinateAddressX += shift.x;
      }

      if (coordinateAddressY >= PIN_COORDS.yCord.min && coordinateAddressY <= PIN_COORDS.yCord.max) {
        pinMain.style.top = (coordinateAddressY - MAP_PIN_HEIGHT) + 'px';
      } else {
        coordinateAddressY += shift.y;
      }

      address.value = coordinateAddressX + ', ' + coordinateAddressY;
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onPinMainKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      document.map.getAddressAndUnlockForm();
    }
  };

  pinMain.addEventListener('mousedown', onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);
})();
