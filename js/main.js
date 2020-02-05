'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var NUMBER_OF_ADS = 8;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var mapShow = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var map = document.querySelector('.map__pins');

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

var createAdvertisements = function (length) {
  var LOCATION_X_MIN = PIN_WIDTH / 2;
  var LOCATION_X_MAX = 1200 - PIN_WIDTH / 2;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var ads = [];
  for (var i = 1; i <= length; i++) {
    var locationX = generateRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = generateRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var characteristics = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': '',
        'address': locationX + ', ' + locationY,
        'price': 5000,
        'type': getRandomElement(TYPES),
        'rooms': generateRandomNumber(1, 10),
        'guests': generateRandomNumber(0, 10),
        'checkin': getRandomElement(CHECKINS),
        'checkout': getRandomElement(CHECKOUTS),
        'features': getRandomSet(FEATURES),
        'description': '',
        'photos': getRandomSet(PHOTOS)

      },
      'location': {
        'x': locationX - PIN_WIDTH / 2,
        'y': locationY - PIN_HEIGHT
      }
    };
    ads.push(characteristics);

  }
  return ads;
};

var renderPin = function (pin) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  return pinElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  pins.forEach(function (pin) {
    fragment.appendChild(renderPin(pin));
  });
  map.appendChild(fragment);
};

var offers = createAdvertisements(NUMBER_OF_ADS);
renderPins(offers);

mapShow();
