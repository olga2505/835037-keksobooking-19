'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var debouncedRenderPins = window.debounce(window.pin.renderPins);

  var setFiltration = function (pins) {

    var onMapFiltersChange = function () {
      var mapCard = document.querySelector('.map__card');
      var housingTypeValue = housingType.value;
      var housingPriceValue = housingPrice.value;
      var housingRoomsValue = housingRooms.value;
      var housingGuestsValue = housingGuests.value;
      var housingFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
      var selectedFeatures = housingFeatures.map(function (checkbox) {
        return checkbox.value;
      });
      var RoomPrice = {
        low: {
          MAX: 10000
        },
        middle: {
          MIN: 10000,
          MAX: 50000
        },
        high: {
          MIN: 50000
        }
      };

      var filterByType = function (pin) {
        if (housingTypeValue === 'any') {
          return true;
        }
        return pin.offer.type === housingTypeValue;
      };

      var filterByPrice = function (pin) {
        switch (housingPriceValue) {
          case 'any':
            return true;

          case 'low':
            return pin.offer.price < RoomPrice.low.MAX;

          case 'middle':
            return pin.offer.price >= RoomPrice.middle.MIN && pin.offer.price <= RoomPrice.middle.MAX;

          default:
            return pin.offer.price > RoomPrice.high.MIN;
        }
      };

      var filterByRooms = function (pin) {
        if (housingRoomsValue === 'any') {
          return true;
        }
        return pin.offer.rooms === Number(housingRoomsValue);
      };

      var filterByGuests = function (pin) {
        if (housingGuestsValue === 'any') {
          return true;
        }
        return pin.offer.guests === Number(housingGuestsValue);
      };

      var filterByFeatures = function (pin) {
        return selectedFeatures.every(function (feature) {
          return pin.offer.features.includes(feature);
        });
      };

      var filtratedPins = pins.filter(filterByType)
        .filter(filterByPrice)
        .filter(filterByRooms)
        .filter(filterByGuests)
        .filter(filterByFeatures);

      debouncedRenderPins(filtratedPins);

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
