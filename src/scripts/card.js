import { likeCard, unlikeCard } from "./api";

export function createCard(cardData, 
                          deleteCard, 
                          cardLikeButton, 
                          openImagePopup,
                          openConfirmDeletePopup,
                          userId 
                         ) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const like = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardlikeCount = cardElement.querySelector('.card__like-count');

  cardElement.dataset.cardId = cardData._id;


if(!cardData.owner || cardData.owner._id !== userId) {
  cardDeleteButton.remove();
}

  // Устанавливаем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardlikeCount.textContent = cardData.likes.length;

  if (cardData.likes.some(function(like) {
    return like._id === userId;
  })) {
    like.classList.add('card__like-button_is-active');
  }

  // обработчик на изображение карточки
  cardImage.addEventListener('click', function() {
    openImagePopup(cardData);
  });

  // обработчик на лайк
  // like.addEventListener('click', cardLikeButton);
  like.addEventListener('click', (event) => {
    cardLikeButton(event, cardData._id, cardlikeCount);
  });

  // обработчик на удаление
  cardDeleteButton.addEventListener('click', function () {
    // deleteCard(cardElement);
    openConfirmDeletePopup(cardElement, cardData._id);
  });

  return cardElement;
}

export function cardLikeButton (event, cardId, likeCountElement) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if(!isLiked) {
    likeCard(cardId)
    .then(function (updatedCard) {
      likeButton.classList.add('card__like-button_is-active');
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error('Ошибка при добавлении лайка:', err);
    });
  }else{
    unlikeCard (cardId)
    .then(function (updatedCard) {
      likeButton.classList.remove('card__like-button_is-active');
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error('Ошибка при удалении лайка:', err);
    });
  }
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

