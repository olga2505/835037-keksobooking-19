'use strict';
// модуль служебный
(function () {
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

  window.utilities = {
    generateRandomNumber: generateRandomNumber,
    getRandomElement: getRandomElement,
    getRandomSet: getRandomSet
  };
})();
