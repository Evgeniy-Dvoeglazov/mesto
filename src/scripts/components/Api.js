const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // Получаем данные о пользователе с сервера

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(handleResponse);
  }

  // Получаем массив карточек с сервера

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(handleResponse);
  }

  // Изменяем данные о пользлвателе на сервере

  setUserInfo(getInputValue) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: getInputValue.name,
        about: getInputValue.info
      })
    })
      .then(handleResponse);
  }

  // Передаем данные новой карточки

  addCard(userCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: userCard.name,
        link: userCard.link
      })
    })
      .then(handleResponse);
  }

  // Удаляем данные карточки

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      })

      .then(handleResponse);
  }

  // Добавляем карточке лайк

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      })

      .then(handleResponse);
  }

  // Удаляем лайк

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      })

      .then(handleResponse);
  }

  // Отправляем ссылку на смену аватара

  changeAvatar(getInputValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: getInputValue.link
      })
    })

      .then(handleResponse);
  }
}
