'use strict';
// модуль создания меток на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_OF_ADS = 8;

  var mapPins = document.querySelector('.map__pins');

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment(pins);
    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
    mapPins.appendChild(fragment);
    var onPinElementClick = function () {
      window.card.renderAd(pins);
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
    pinElement.style.left = pins.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pins.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pins.author.avatar;
    pinElement.querySelector('img').alt = pins.offer.titles;

    pinElement.addEventListener('click', onPinElementClick);

    return pinElement;
  };

  window.load(function (pins) {
    renderPins(pins);
  });
})();

