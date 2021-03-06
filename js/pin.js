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
      window.pin.closeCard = function () {
        mapCard.parentNode.removeChild(mapCard);
        document.removeEventListener('keydown', onButtonEscapeDown);
      };

      var onPopupCloseClick = function () {
        window.pin.closeCard();
      };

      var onButtonEscapeDown = function (evt) {
        if (evt.key === 'Escape') {
          window.pin.closeCard();
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
    window.reset.deletePins();
    var fragment = document.createDocumentFragment();
    pins.slice(0, 5).forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });
    mapPins.appendChild(fragment);
  };

  var onSuccess = function (pins) {
    renderPins(pins);
    window.filter.set(pins);
  };

  var onMessageCloseClick = function () {
    closeMessage();
  };

  var onButtonEscMessage = function (evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  var closeMessage = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.parentNode.removeChild(error);
      document.removeEventListener('click', onMessageCloseClick);
      document.removeEventListener('keydown', onButtonEscMessage);

    }
  };

  var onError = function () {
    var main = document.querySelector('main');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessageElement);
    document.addEventListener('click', onMessageCloseClick);
    document.addEventListener('keydown', onButtonEscMessage);

  };

  window.pin = {
    renderPins: renderPins,
    onSuccess: onSuccess,
    onError: onError
  };
})();
