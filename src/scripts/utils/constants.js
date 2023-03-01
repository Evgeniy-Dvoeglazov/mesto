const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const largePhoto = document.querySelector('.popup__large-photo');
const caption = document.querySelector('.popup__caption');
const inputName = document.querySelector('#name-input');
const inputInfo = document.querySelector('#info-input');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const avatarBtn = document.querySelector('.profile__avatar-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__title-text');
const profileInfo = document.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements__list');
const avatar = document.querySelector('.profile__avatar-image');
const popupEditBtn = document.querySelector('#popupEdit__button');
const popupAddBtn = document.querySelector('#popupAdd__button');
const popupAvatarBtn = document.querySelector('#popupChangeAvatar__button');


///////////////////////////////////////////////////////

export {
  largePhoto,
  caption,
  inputName,
  inputInfo,
  profileEditBtn,
  placeAddBtn,
  profileName,
  profileInfo,
  elementsContainer,
  validationConfig,
  avatar,
  avatarBtn,
  popupEditBtn,
  popupAddBtn,
  popupAvatarBtn
};
