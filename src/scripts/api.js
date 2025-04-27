// Токен: 4f87bd4a-fcea-4934-a777-b53620178423
// Идентификатор группы: wff-cohort-37

export {getCards, getUserInfo, patchProfileEdit, postCardAdd, deleteCardFromServer, likeCard, unlikeCard, patchEditAvatar}

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: '4f87bd4a-fcea-4934-a777-b53620178423',
        'Content-Type': 'application/json'
    }
}

function getCards () {
    return fetch (`${config.baseUrl}/cards`, {
        headers: config.headers
    })

    .then(function(res){
        if(res.ok){
            return res.json();
        }

        return Promise.reject(res.status);
    })
    .catch(function(err){
        console.log('Ошибка', err);
    })
}

function getUserInfo () {
    return fetch (`${config.baseUrl}/users/me`, {
        headers: config.headers
    }) 

    .then(function(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .catch(function(err){
        console.log('Ошибка', err);
    })
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
    .then (function(res){
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .catch(function(err){
        console.log('Ошибка', err);
    })
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
    .then(function(res){
        if(res.ok) {
            return res.json();
        }

        return Promise.reject(res.status)
    })
    .catch(function(err){
        console.log('Ошибка', err);
    })
}

function deleteCardFromServer (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })

    .then(function (res){
        if(res.ok){
            return res.json()
        }
        return Promise.reject(res.status);
    })
    .catch(function(err){
        console.log('Ошибка', err);
    })
    
}

function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .catch(function(err) {
        console.log('Ошибка', err);
    });
}

function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .catch(function(err) {
        console.log('Ошибка', err);
    });
}

function patchEditAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(function(err) {
      console.log('Ошибка:', err);
    });
  }