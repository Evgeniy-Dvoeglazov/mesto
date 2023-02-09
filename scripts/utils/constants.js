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

const popupPhoto = document.querySelector('#popup_photo');
const largePhoto = document.querySelector('.popup__large-photo');
const caption = document.querySelector('.popup__caption');
const buttonCloseForm = document.querySelector('.popup__close-btn');
export { popupPhoto, largePhoto, caption, initialCards, buttonCloseForm };
