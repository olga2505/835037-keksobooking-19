'use strict';
// модуль создания карточек объявлений
(function () {
  var map = document.querySelector('.map');
  var dictionaryListMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var endingNormalize = function (number, forms) {
    number = Number(number);
    if (number % 100 === 11) {
      return forms[0];
    }
    var remainder = number % 10;
    switch (true) {
      case remainder === 0 || remainder > 4:
        return forms[0];
      case remainder === 1:
        return forms[1];
      default:
        return forms[2];
    }
  };

  var roomsEndingNormalize = function (number) {
    var forms = ['комнат', 'комната', 'комнаты'];
    return endingNormalize(number, forms);
  };

  var guestsEndingNormalize = function (number) {
    var forms = ['гостей', 'гостя', 'гостей'];
    return endingNormalize(number, forms);
  };

  var renderFeature = function (feature) { // функция для li_______
    var featureElement = document.createElement('LI');
    featureElement.className = 'popup__feature popup__feature--' + feature;
    return featureElement;
  };

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      fragment.appendChild(renderFeature(feature));
    });
    return fragment;
  };

  var renderPhoto = function (photo) { // функция для IMG_______
    var photoElement = document.createElement('IMG');
    photoElement.setAttribute('width', 45);
    photoElement.setAttribute('height', 40);
    photoElement.setAttribute('src', photo);
    photoElement.className = 'popup__photo';
    return photoElement;
  };

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });
    return fragment;
  };

  var renderAd = function (item) { // показ объявлений___________
    var mapCard = document.querySelector('.map__card');
    if (map.contains(mapCard)) {
      mapCard.parentNode.removeChild(mapCard);
    }

    var quantityRoomsGuest = item.offer.rooms + ' ' + roomsEndingNormalize(item.offer.rooms) + ' для ' + item.offer.guests + ' ' + guestsEndingNormalize(item.offer.guests);
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var adsTemplate = document.querySelector('#card')
      .content
      .querySelector('article');
    var adsElement = adsTemplate.cloneNode(true);

    adsElement.querySelector('.popup__title').textContent = item.offer.title;
    adsElement.querySelector('.popup__text--address').textContent = item.offer.address;
    adsElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
    adsElement.querySelector('.popup__type').textContent = dictionaryListMap[item.offer.type];
    adsElement.querySelector('.popup__text--capacity').textContent = quantityRoomsGuest;
    adsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    adsElement.querySelector('.popup__features').innerHTML = '';
    adsElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
    adsElement.querySelector('.popup__description').textContent = item.offer.description;
    adsElement.querySelector('.popup__photos').innerHTML = '';
    adsElement.querySelector('.popup__photos').appendChild(renderPhotos(item.offer.photos));
    adsElement.querySelector('.popup__avatar').src = item.author.avatar;

    mapFiltersContainer.insertAdjacentElement('beforebegin', adsElement);
  };

  window.card = {
    renderAd: renderAd,
  };
})();
