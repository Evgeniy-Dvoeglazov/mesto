import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValue() {
    this._inputList.forEach((inputElement) => {
      inputElement.name = inputElement.value;
    });

  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._getInputValue());
    })
  };

  close() {


    super.close();
  }
}
