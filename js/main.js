'use strict';

var ENTER_KEY = 'Enter';

// var PIN_WIDTH = 50;
// var PIN_HEIGHT = 70;
var MAP_PIN_CIRCLE = 65;
var MAP_PIN_HEIGHT = 84;
var MAP_PIN_X = 570;
var MAP_PIN_Y = 375;
var NUMBER_OF_ADS = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var TITLES = ['Уютное местечко 1', 'Уютное местечко 2', 'Уютное местечко 3'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');

var allForms = document.querySelectorAll('fieldset');
var mapFilters = document.querySelectorAll('.map__filters select');
var pinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var adForm = document.querySelector('.ad-form');
var costHousing = document.querySelector('#price');
var type = document.querySelector('#type');
var checkin = adForm.querySelector('#timein');
var checkout = adForm.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

// var mapPins = document.querySelector('.map__pins');

function generateRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

var getRandomElement = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var shuffleArray = function (array) {
  var tempArray = array.slice();
  for (var i = tempArray.length - 1; i > 0; i--) {
    var j = generateRandomNumber(0, i);
    var temp = tempArray[i];
    tempArray[i] = tempArray[j];
    tempArray[j] = temp;

  }
  return tempArray;
};

var getRandomSet = function (array) {
  return shuffleArray(array).slice(0, generateRandomNumber(1, array.length));
};

var createAdvertisements = function (length) { // заполнение массива
  var ads = [];
  for (var i = 1; i <= length; i++) {
    var locationX = generateRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = generateRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var characteristics = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'titles': getRandomElement(TITLES),
        'address': locationX + ', ' + locationY,
        'price': generateRandomNumber(1000, 10000),
        'type': getRandomElement(TYPES),
        'rooms': generateRandomNumber(1, 10),
        'guests': generateRandomNumber(1, 10),
        'checkin': getRandomElement(CHECKINS),
        'checkout': getRandomElement(CHECKOUTS),
        'features': getRandomSet(FEATURES),
        'description': '',
        'photos': getRandomSet(PHOTOS)

      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    ads.push(characteristics);

  }
  return ads;
};

// var renderPin = function (pin) {
//   var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//   var pinElement = pinTemplate.cloneNode(true);
//   pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
//   pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
//   pinElement.querySelector('img').src = pin.author.avatar;
//   pinElement.querySelector('img').alt = pin.offer.titles;

//   return pinElement;
// };

// var renderPins = function (pins) {
//   var fragment = document.createDocumentFragment();
//   pins.forEach(function (pin) {
//     fragment.appendChild(renderPin(pin));
//   });
//   mapPins.appendChild(fragment);
// };

// var offers = createAdvertisements(NUMBER_OF_ADS); // массив
createAdvertisements(NUMBER_OF_ADS); // массив  временно ()

// renderPins(offers);

// var dictionaryListMap = {
//   'flat': 'Квартира',
//   'bungalo': 'Бунгало',
//   'house': 'Дом',
//   'palace': 'Дворец',
// };

// var endingNormalize = function (number, forms) {
//   number = Number(number);
//   if (number % 100 === 11) {
//     return forms[0];
//   }
//   var remainder = number % 10;
//   switch (true) {
//     case remainder === 0 || remainder > 4:
//       return forms[0];
//     case remainder === 1:
//       return forms[1];
//     default:
//       return forms[2];
//   }
// };

// var roomsEndingNormalize = function (number) {
//   var forms = ['комнат', 'комната', 'комнаты'];
//   return endingNormalize(number, forms);
// };

// var guestsEndingNormalize = function (number) {
//   var forms = ['гостей', 'гостя', 'гостей'];
//   return endingNormalize(number, forms);
// };

// var renderFeature = function (feature) { // функция для li_______
//   var featureElement = document.createElement('LI');
//   featureElement.className = 'popup__feature popup__feature--' + feature;
//   return featureElement;
// };

// var renderFeatures = function (features) {
//   var fragment = document.createDocumentFragment();
//   features.forEach(function (feature) {
//     fragment.appendChild(renderFeature(feature));
//   });
//   return fragment;
// };


// var renderPhoto = function (photo) { // функция для IMG_______
//   var photoElement = document.createElement('IMG');
//   photoElement.setAttribute('width', 45);
//   photoElement.setAttribute('height', 40);
//   photoElement.setAttribute('src', photo);
//   photoElement.className = 'popup__photo';
//   return photoElement;
// };

// var renderPhotos = function (photos) {
//   var fragment = document.createDocumentFragment();
//   photos.forEach(function (photo) {
//     fragment.appendChild(renderPhoto(photo));
//   });
//   return fragment;
// };

// var renderAd = function (item) { // показ объявлений___________
//   var quantityRoomsGuest = item.offer.rooms + ' ' + roomsEndingNormalize(item.offer.rooms) + ' для ' + item.offer.guests + ' ' + guestsEndingNormalize(item.offer.guests);
//   var mapFiltersContainer = document.querySelector('.map__filters-container');
//   var adsTemplate = document.querySelector('#card')
//     .content
//     .querySelector('article');

//   var adsElement = adsTemplate.cloneNode(true);

//   adsElement.querySelector('.popup__title').textContent = item.offer.title;
//   adsElement.querySelector('.popup__text--address').textContent = item.offer.address;
//   adsElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
//   adsElement.querySelector('.popup__type').textContent = dictionaryListMap[item.offer.type];
//   adsElement.querySelector('.popup__text--capacity').textContent = quantityRoomsGuest;
//   adsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
//   adsElement.querySelector('.popup__features').innerHTML = '';
//   adsElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
//   adsElement.querySelector('.popup__description').textContent = item.offer.description;
//   adsElement.querySelector('.popup__photos').innerHTML = '';
//   adsElement.querySelector('.popup__photos').appendChild(renderPhotos(item.offer.photos));
//   adsElement.querySelector('.popup__avatar').src = item.author.avatar;

//   mapFiltersContainer.insertAdjacentElement('beforebegin', adsElement);
// };

// renderAd(offers[0]);

var blockingForm = function () {
  allForms.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });
  mapFilters.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });
  address.value = Math.ceil(MAP_PIN_X + MAP_PIN_CIRCLE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_CIRCLE / 2);
};

blockingForm();

var unlockForms = function () {
  allForms.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  mapFilters.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  adForm.classList.remove('ad-form--disabled');
  address.value = Math.ceil(MAP_PIN_X + MAP_PIN_CIRCLE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_HEIGHT);

};

pinMain.addEventListener('click', function (evt) {
  if (evt.button === 0) {
    map.classList.remove('map--faded');
    unlockForms();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    map.classList.remove('map--faded');
    unlockForms();
  }
});

type.addEventListener('change', function () {
  if (type.value === 'bungalo') {
    costHousing.setAttribute('placeholder', '0');
    costHousing.setAttribute('min', '0');
  } else if (type.value === 'flat') {
    costHousing.setAttribute('placeholder', '1000');
    costHousing.setAttribute('min', '1000');
  } else if (type.value === 'house') {
    costHousing.setAttribute('placeholder', '5000');
    costHousing.setAttribute('min', '5000');
  } else if (type.value === 'palace') {
    costHousing.setAttribute('placeholder', '10000');
    costHousing.setAttribute('min', '10000');
  }
});

adForm.addEventListener('change', function (evt) { // синхронизация времени заезда - выезда
  var target = evt.target;
  if (target.value === '12:00') {
    checkin.value = '12:00';
    checkout.value = '12:00';
  } else if (target.value === '13:00') {
    checkin.value = '13:00';
    checkout.value = '13:00';
  } else if (target.value === '14:00') {
    checkin.value = '14:00';
    checkout.value = '14:00';
  }
});

var validatesRoomsGuests = function () { // количество комнат и гостей
  var rooms = Number(roomNumber.value);
  var guests = Number(capacity.value);
  if (rooms === 1 && guests > 1) {
    roomNumber.setCustomValidity('Нужно большее количество комнат');
  } else if (rooms === 2 && guests > 2) {
    roomNumber.setCustomValidity('Нужно большее количество комнат');
  } else if (rooms === 3 && guests > 3) {
    roomNumber.setCustomValidity('Нужно большее количество комнат');
  } else if (rooms === 100 && guests > 0) {
    roomNumber.setCustomValidity('Не для гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
};

validatesRoomsGuests();
