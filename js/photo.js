'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserUser = document.querySelector('#avatar');
  var previewUser = document.querySelector('.ad-form-header__preview img');

  var fileChooserHousing = document.querySelector('#images');
  var previewHousing = document.querySelector('.ad-form__photo');

  var getAvatar = function () {
    var fileAvatar = fileChooserUser.files[0];
    var fileName = fileAvatar.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewUser.src = reader.result;
      });

      reader.readAsDataURL(fileAvatar);
    }
  };

  var getPhoto = function () {
    var img = document.createElement('img');
    img.width = 100;
    previewHousing.appendChild(img);

    var filePhoto = fileChooserHousing.files[0];
    var fileName = filePhoto.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(filePhoto);
    }
  };

  fileChooserUser.addEventListener('change', getAvatar);
  fileChooserHousing.addEventListener('change', getPhoto);
})();
