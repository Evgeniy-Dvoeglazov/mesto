import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(this._cardId, this._cardElement);
    });
  }

}
