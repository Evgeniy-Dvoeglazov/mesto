import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._errorList = Array.from(this._popup.querySelectorAll('.popup__error'));
  }

  // Собираем данные всех полей формы

  _getInputValue() {
    const inputData = {};
    this._inputList.forEach((inputElement) => {
      inputData[inputElement.name] = inputElement.value;
    });
    return inputData;
  }

  // Устанавливаем слушатели событий

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._getInputValue());
    });
  }

  // Добавляем в метод close очистку ифнормации об ошибках при повторном открытии попапа

  close() {
    super.close();
    this._errorList.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove('popup__input_type_error');
    });
  }
}
