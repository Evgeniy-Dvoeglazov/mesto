/* ------- Создаем класс валидации формы --------*/

export default class FormValidator {
  constructor(validObject, formElement) {
    this._formSelector = validObject.formSelector;
    this._inputSelector = validObject.inputSelector;
    this._submitButtonSelector = validObject.submitButtonSelector;
    this._inactiveButtonClass = validObject.inactiveButtonClass;
    this._inputErrorClass = validObject.inputErrorClass;
    this._errorClass = validObject.errorClass;
    this._formElement = formElement;
  }

  /* ------- Методы показа и скрытия сообщения об ошибке валидации --------*/

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }

  /* ------- Метод проверки валидации --------*/

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /* ------- Методы изменения состояния кнопки --------*/

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  /* ------- Метод установки слушателя событий на поля формы --------*/

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /* ------- Публичный метод, запускающий валидацию --------*/

  enableValidation() {
    this._setEventListeners();
  }
}
