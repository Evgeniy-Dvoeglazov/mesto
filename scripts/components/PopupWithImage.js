import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { image, title }) {
    super(popupSelector);
    this._title = title;
    this._image = image;
    this._altImage = "фотография " + title;
  }

  open() {
    const largePhoto = this._popup.querySelector('.popup__large-photo');
    const caption = this._popup.querySelector('.popup__caption');

    largePhoto.src = this._image;
    largePhoto.alt = this._altImage;
    caption.textContent = this._title;

    super.open();
  }
}
