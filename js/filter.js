'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');

  var setFiltration = function (pins) {

    var onMapFiltersChange = function () {
      var mapCard = document.querySelector('.map__card');
      var housingTypeValue = housingType.value;

      var filterByType = function (pin) {
        if (housingTypeValue === 'any') {
          return true;
        }
        return housingTypeValue === pin.offer.type;
      };

      var filtratadPins = pins.filter(filterByType);
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
