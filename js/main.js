'use strict';

// var autor = [];

// var title = [];
// var address = [];
// var price = ;
// var type = ['palace', 'flat', 'house', 'bungalo'];
// var rooms = ;
// var guests = ;
// var checkin = ['12:00', '13:00', '14:00'];
// var checkout = ['12:00', '13:00', '14:00'];
// var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var description = [];
// var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// var location = [
//   {
//     x: ;
//     y: ;
//   }
// ];
document.querySelector('.map').classList.remove('map--faded');

var map = document.querySelector('.map__pins');
var templateMap = document.querySelector('#card').content.querySelector('article');

var createAdvertisements = function (length) {

  for (var i = 0; i <= length; i++) {
    var element = templateMap.cloneNode(true);
    map.appendChild(element);
  }
};
createAdvertisements(8);
