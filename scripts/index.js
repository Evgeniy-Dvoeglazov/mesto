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
const inputName = document.querySelector('#popup__text_type_name');
const inputInfo = document.querySelector('#popup__text_type_info');
const inputPlaceName = document.querySelector('#popup__text_type_placeName');
const inputPlaceSrc = document.querySelector('#popup__url_type_placeSrc');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.classList.add('popup_opened');
  popup.classList.add('popup_opened');
}

function closePopup() {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup_opened');
}

closeEditFormBtn.addEventListener('click', closePopup);

/* ------- Открытие попапа с информацией о профиле --------*/

function openFormEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
}

function addProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  closePopup();
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

  closeLargePhotoBtn.addEventListener('click', closePopup);

  return card;
};

elementsContainer.append(...initialCards.map(createElement));

/* ------- Форма добавления карточки --------*/

function openFormAdd() {
  openPopup(popupAdd);

  inputPlaceName.value = '';
  inputPlaceSrc.value = '';
}

placeAddBtn.addEventListener('click', openFormAdd);

closeAddFormBtn.addEventListener('click', closePopup);

/* ------- Добавление карточки --------*/

const addCard = (place) => {
  elementsContainer.prepend(createElement(place));
};

function addPlace(evt) {
  evt.preventDefault();
  const cardContent = {
    name: inputPlaceName.value,
    link: inputPlaceSrc.value
  };

  addCard(cardContent);
  closePopup();
}

addForm.addEventListener('submit', addPlace);
