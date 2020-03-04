'use strict';
// модуль создания данных
(function () {
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

  var createAdvertisements = function (length) { // заполнение массива
    var ads = [];
    for (var i = 1; i <= length; i++) {
      var locationX = window.utilities.generateRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX);
      var locationY = window.utilities.generateRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
      var characteristics = {
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'titles': window.utilities.getRandomElement(TITLES),
          'address': locationX + ', ' + locationY,
          'price': window.utilities.generateRandomNumber(1000, 10000),
          'type': window.utilities.getRandomElement(TYPES),
          'rooms': window.utilities.generateRandomNumber(1, 10),
          'guests': window.utilities.generateRandomNumber(1, 10),
          'checkin': window.utilities.getRandomElement(CHECKINS),
          'checkout': window.utilities.getRandomElement(CHECKOUTS),
          'features': window.utilities.getRandomSet(FEATURES),
          'description': '',
          'photos': window.utilities.getRandomSet(PHOTOS)

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

  window.data = {
    createAdvertisements: createAdvertisements,
  };
})();
