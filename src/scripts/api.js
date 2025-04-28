// Токен: 4f87bd4a-fcea-4934-a777-b53620178423
// Идентификатор группы: wff-cohort-37

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: '4f87bd4a-fcea-4934-a777-b53620178423',
        'Content-Type': 'application/json'
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

function getCards () {
    return fetch (`${config.baseUrl}/cards`, {
        headers: config.headers
    })

    .then(handleResponse)
}

function getUserInfo () {
    return fetch (`${config.baseUrl}/users/me`, {
        headers: config.headers
    }) 

    .then(handleResponse)
}

function patchProfileEdit (name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(handleResponse)
}

function postCardAdd (name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(handleResponse)
}

function deleteCardFromServer (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(handleResponse)
}

function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse)
}

function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
}

function patchEditAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(handleResponse)
  }

  export {getCards, getUserInfo, patchProfileEdit, postCardAdd, deleteCardFromServer, likeCard, unlikeCard, patchEditAvatar}