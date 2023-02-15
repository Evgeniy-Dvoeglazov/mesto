import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._largePhoto = this._popup.querySelector('.popup__large-photo');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  // Публичный метод открытия попапа с фотографией

  open(image, title) {
    super.open();

    this._largePhoto.src = image;
    this._largePhoto.alt = "фотография " + image;
    this._caption.textContent = title;
  }
}
