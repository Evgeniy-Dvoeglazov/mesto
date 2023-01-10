const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const popupPhoto = document.querySelector('#popup_photo');
const editForm = document.querySelector('#popup__form_edit');
const addForm = document.querySelector('#popup__form_add');
const closeAddFormBtn = document.querySelector('#popup__close-btn_add');
const closeEditFormBtn = document.querySelector('#popup__close-btn_edit');
const closeLargePhotoBtn = document.querySelector('#popup__close-btn_largePhoto');
const profileName = document.querySelector('.profile__title-text');
const profileInfo = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('#popup__input_name');
const inputInfo = document.querySelector('#popup__input_info');
const inputPlaceName = document.querySelector('#popup__input_placename');
const inputPlaceSrc = document.querySelector('#popup__input_placesrc');
const popupAddButtonSubmit = document.querySelector('#popupAdd__button');
const popupEditButtonSubmit = document.querySelector('#popupEdit__button');
///////////////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add('popup_opened');
  deleteError();

  if (popup.classList.contains('popup_opened')) {

    /* ------- Закрытие попапа нажатием на Esc --------*/

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    });

    /* ------- Закрытие попапа кликом на оверлей --------*/

    popup.addEventListener('click', (evt) => {
      if (evt.target.id === popup.id) {
        closePopup(popup);
      }
    });
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeEditFormBtn.addEventListener('click', () => closePopup(popupEdit));

/* ------- Открытие попапа с информацией о профиле --------*/

function openFormEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  popupEditButtonSubmit.classList.remove('popup__button_disabled');
}

function addProfileInfo() {
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  closePopup(popupEdit);
}

profileEditBtn.addEventListener('click', openFormEdit);

editForm.addEventListener('submit', addProfileInfo);

/* ------- Шесть карточек «из коробки» --------*/

const elementsContainer = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);

const createElement = (place) => {
  const card = elementTemplate.cloneNode(true);
  card.querySelector('.element__image').src = place.link;
  card.querySelector('.element__image').alt = "фотография " + place.name;
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

  const largePhoto = document.querySelector('.popup__large-photo');
  const caption = document.querySelector('.popup__caption');

  function openLargePhoto() {
    openPopup(popupPhoto);
    largePhoto.src = place.link;
    largePhoto.alt = "фотография " + place.name;
    caption.textContent = place.name;
  }

  card.querySelector('.element__image').addEventListener('click', openLargePhoto);

  closeLargePhotoBtn.addEventListener('click', () => closePopup(popupPhoto));

  return card;
};

elementsContainer.append(...initialCards.map(createElement));

/* ------- Форма добавления карточки --------*/

function openFormAdd() {
  openPopup(popupAdd);
  addForm.reset();
  popupAddButtonSubmit.classList.add('popup__button_disabled');
}

placeAddBtn.addEventListener('click', openFormAdd);

closeAddFormBtn.addEventListener('click', () => closePopup(popupAdd));

/* ------- Добавление карточки --------*/

const addCard = (place) => {
  elementsContainer.prepend(createElement(place));
};

function addPlace() {
  const cardContent = {
    name: inputPlaceName.value,
    link: inputPlaceSrc.value
  };

  addCard(cardContent);
  closePopup(popupAdd);
}

addForm.addEventListener('submit', addPlace);

/* ------- Удаление ошибок при повторном открытии попапа --------*/

function deleteError() {
  const inputListWithError = Array.from(document.querySelectorAll('.popup__input'));

  inputListWithError.forEach((inputElementWithError) => {
    const inputError = document.querySelector(`.${inputElementWithError.id}-error`);
    inputError.textContent = '';
    inputError.classList.remove('popup__error_visible');
    inputElementWithError.classList.remove('popup__input_type_error');
  });
}

/* ------- Запуск валидации форм --------*/


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
