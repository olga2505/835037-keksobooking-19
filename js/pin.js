'use strict';
// модуль создания меток на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPins = document.querySelector('.map__pins');

  var renderPin = function (pin) {

    var onPinElementClick = function () {
      window.card.renderAd(pin);
      var popupClose = document.querySelector('.popup__close');
      var mapCard = document.querySelector('.map__card');
      var closeCard = function () {
        mapCard.parentNode.removeChild(mapCard);
        document.removeEventListener('keydown', onButtonEscapeDown);
      };

      var onPopupCloseClick = function () {
        closeCard();
      };

      var onButtonEscapeDown = function (evt) {
        if (evt.key === 'Escape') {
          closeCard();
        }
      };
      popupClose.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onButtonEscapeDown);
    };
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.titles;

    pinElement.addEventListener('click', onPinElementClick);

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
  };
})();

