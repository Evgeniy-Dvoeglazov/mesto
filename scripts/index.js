const initialCards = [
  {
    name: 'Джилы-Су',
    link: './images/Jilly-Su.jpg'
  },
  {
    name: 'Красная Поляна',
    link: './images/Krasnaya-Polyana.jpg'
  },
  {
    name: 'Геленджик',
    link: './images/gelendzhik.jpg'
  },
  {
    name: 'Коктебель',
    link: './images/Koktebel.jpg'
  },
  {
    name: 'Йошкар-Ола',
    link: './images/yoshkar-ola.jpg'
  },
  {
    name: 'Судак',
    link: './images/sudak.jpg'
  }
];

const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popup = document.querySelector('.popup');
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
const inputPlaceSrc = document.querySelector('#popup__text_type_placeSrc');

function openFormEdit() {
  popupEdit.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
}

profileEditBtn.addEventListener('click', openFormEdit);

function addInformation(evt) {
  evt.preventDefault();
  console.log('работает');
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  console.log('работает');
  popupEdit.classList.remove('popup_opened');
}

editForm.addEventListener('submit', addInformation);

function closeForm() {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup_opened');
}

closeEditFormBtn.addEventListener('click', closeForm);

/* ------- Шесть карточек «из коробки» --------*/

const elementsContainer = document.querySelector('.elements__list');

const createElement = (place) => {
  const elementTemplate = document.querySelector('#element-template').content;
  const listElement = elementTemplate.querySelector('.element').cloneNode(true);
  listElement.querySelector('.element__image').src = place.link;
  listElement.querySelector('.element__text').textContent = place.name;

  /* ------- Удаление карточки --------*/

  listElement.querySelector('.element__delete-btn').addEventListener('click', () => {
    listElement.remove();
  });

  /* ------- Лайк карточки --------*/

  listElement.querySelector('.element__btn-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__btn-like_active');
  });

  /* ------- Открытие попапа с картинкой --------*/

  function openLargePhoto() {
    popupPhoto.classList.add('popup_opened');
    document.querySelector('.popup__large-photo').src = place.link;
    document.querySelector('.popup__caption').textContent = place.name;
  }

  listElement.querySelector('.element__image').addEventListener('click', openLargePhoto);

  closeLargePhotoBtn.addEventListener('click', closeForm);

  return listElement;
};

elementsContainer.append(...initialCards.map(createElement));

/* ------- Форма добавления карточки --------*/

function openFormAdd() {
  popupAdd.classList.add('popup_opened');
}

placeAddBtn.addEventListener('click', openFormAdd);

closeAddFormBtn.addEventListener('click', closeForm);

/* ------- Добавление карточки --------*/

const addCard = (place) => {
  elementsContainer.prepend(createElement(place));
};

function addPlace(evt) {
  evt.preventDefault();
  const elementContent = {
    name: inputPlaceName.value,
    link: inputPlaceSrc.value
  };

  addCard(elementContent);
  popupAdd.classList.remove('popup_opened');
}

addForm.addEventListener('submit', addPlace);
