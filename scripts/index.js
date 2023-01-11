const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const popupPhoto = document.querySelector('#popup_photo');
const formEdit = document.querySelector('#popup__form_edit');
const formAdd = document.querySelector('#popup__form_add');
const buttonCloseFormAdd = document.querySelector('#popup__close-btn_add');
const buttonCloseFormEdit = document.querySelector('#popup__close-btn_edit');
const buttonCloseLargePhoto = document.querySelector('#popup__close-btn_largePhoto');
const profileName = document.querySelector('.profile__title-text');
const profileInfo = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('#name-input');
const inputInfo = document.querySelector('#info-input');
const inputPlaceName = document.querySelector('#placename-input');
const inputPlaceSrc = document.querySelector('#placesrc-input');
const buttonSubmitPopupAdd = document.querySelector('#popupAdd__button');
const buttonSubmitPopupEdit = document.querySelector('#popupEdit__button');
const largePhoto = document.querySelector('.popup__large-photo');
const caption = document.querySelector('.popup__caption');
const elementsContainer = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);

///////////////////////////////////////////////////////

const createElement = (place) => {
  const card = elementTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = place.link;
  cardImage.alt = "фотография " + place.name;
  card.querySelector('.element__text').textContent = place.name;

  /* ------- Удаление карточки --------*/

  card.querySelector('.element__delete-btn').addEventListener('click', () => {
    card.remove();
  });

  /* ------- Лайк карточки --------*/

  card.querySelector('.element__btn-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__btn-like_active');
  });

  /* ------- Открытие попапа с картинкой --------*/

  function openLargePhoto() {
    openPopup(popupPhoto);
    largePhoto.src = place.link;
    largePhoto.alt = "фотография " + place.name;
    caption.textContent = place.name;
  }

  cardImage.addEventListener('click', openLargePhoto);
  return card;
};

elementsContainer.append(...initialCards.map(createElement));

const addCard = (place) => {
  elementsContainer.prepend(createElement(place));
};

///////////////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

///////////////////////////////////////////////////////
/* ------- Закрытие попапа нажатием на Esc --------*/

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

///////////////////////////////////////////////////////
/* ------- Закрытие попапа кликом на оверлей --------*/

function closePopupOverlay(evt) {
  if (evt.srcElement === evt.target) {
    closePopup(evt.target);
  }
}

///////////////////////////////////////////////////////

function openFormEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  buttonSubmitPopupEdit.classList.remove('popup__button_disabled');
  buttonSubmitPopupEdit.disabled = false;
}

function openFormAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  buttonSubmitPopupAdd.classList.add('popup__button_disabled');
  buttonSubmitPopupAdd.disabled = true;
}

///////////////////////////////////////////////////////

function addProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  closePopup(popupEdit);
}

function addPlace(evt) {
  evt.preventDefault();
  const cardContent = {
    name: inputPlaceName.value,
    link: inputPlaceSrc.value
  };

  addCard(cardContent);
  closePopup(popupAdd);
}

///////////////////////////////////////////////////////
/* ------- Запуск валидации форм --------*/

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

///////////////////////////////////////////////////////

popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupPhoto.addEventListener('click', closePopupOverlay);

buttonCloseFormEdit.addEventListener('click', () => closePopup(popupEdit));
buttonCloseFormAdd.addEventListener('click', () => closePopup(popupAdd));
buttonCloseLargePhoto.addEventListener('click', () => closePopup(popupPhoto));

profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);

formEdit.addEventListener('submit', addProfileInfo);
formAdd.addEventListener('submit', addPlace);
