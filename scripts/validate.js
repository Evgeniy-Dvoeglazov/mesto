const showInputError = (formElement, inputElement, errorMessage, validObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validObject.inputErrorClass);
  errorElement.classList.add(validObject.errorClass);
};

const hideInputError = (formElement, inputElement, validObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(validObject.inputErrorClass);
  errorElement.classList.remove(validObject.errorClass);
};

const checkInputValidity = (formElement, inputElement, validObject) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validObject);
  } else {
    hideInputError(formElement, inputElement, validObject);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validObject) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function setEventListeners(formElement, validObject) {
  const inputList = Array.from(formElement.querySelectorAll(validObject.inputSelector));
  const buttonElement = formElement.querySelector(validObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validObject);
      toggleButtonState(inputList, buttonElement, validObject);
    });
  });
}

const enableValidation = (validObject) => {
  const formList = Array.from(document.querySelectorAll(validObject.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validObject);
  });
};
