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
}else{
    // обработчик на удаление
    cardDeleteButton.addEventListener('click', function () {
      // deleteCard(cardElement);
      openConfirmDeletePopup(cardElement, cardData._id);
    });
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



  return cardElement;
}

export function cardLikeButton (event, cardId, likeCountElement) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likeMethod = isLiked ? unlikeCard : likeCard;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active', !isLiked);
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error(`Ошибка при ${isLiked ? 'удалении' : 'добавлении'} лайка:`, err);
    });
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

