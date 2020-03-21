'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  // var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  // var housingGuests = document.querySelector('#housing-guests');


  var setFiltration = function (pins) {

    var onMapFiltersChange = function () {
      var mapCard = document.querySelector('.map__card');
      var housingTypeValue = housingType.value;
      // var housingPriceValue = Number(housingPrice.value);
      var housingRoomsValue = Number(housingRooms.value);
      // var housingGuestsValue = Number(housingGuests.value);

      var filterByType = function (pin) {
        if (housingTypeValue === 'any') {
          return true;
        }
        return housingTypeValue === pin.offer.type;
      };

      // var filterByPrice = function (pin) {
      //   switch (pin) {
      //     case 'low':
      //       return pin.offer.price < 10000;

      //     case 'middle':
      //       return pin.offer.price > 10000 && pin.offer.price < 50000;

      //     case 'high':
      //       return pin.offer.price > 50000;

      //     default:
      //       return pin.offer.price;
      //   }
      // };

      var housingByRooms = function (pin) {
        if (housingRoomsValue === 'any') {
          return true;
        }
        return housingRoomsValue === pin.offer.rooms;
      };

      // var housingByGuests = function (pin) {
      //   if (housingGuestsValue === 'any') {
      //     return true;
      //   }
      //   return housingGuestsValue === pin.offer.guests;
      // };

      var filtratadPins = pins.filter(filterByType)
                              .filter(housingByRooms);
        // .filter(housingByGuests);
      window.pin.renderPins(filtratadPins);

      if (mapCard) {
        window.pin.closeCard();
      }
    };

    window.filter.unSetFiltration = function () {
      mapFilters.addEventListener('change', onMapFiltersChange);
    };
    window.filter.unSetFiltration();
  };

  window.filter = {
    set: setFiltration
  };
})();
