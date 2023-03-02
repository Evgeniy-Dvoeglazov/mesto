const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '0071e523-0a93-4518-84fa-22ae645aeded',
    'Content-Type': 'application/json'
  }
}

const largePhoto = document.querySelector('.popup__large-photo');
const caption = document.querySelector('.popup__caption');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const avatarBtn = document.querySelector('.profile__avatar-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__title-text');
const profileInfo = document.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements__list');
const avatar = document.querySelector('.profile__avatar-image');

///////////////////////////////////////////////////////

export {
  largePhoto,
  caption,
  profileEditBtn,
  placeAddBtn,
  profileName,
  profileInfo,
  elementsContainer,
  validationConfig,
  avatar,
  avatarBtn,
  apiConfig
};
