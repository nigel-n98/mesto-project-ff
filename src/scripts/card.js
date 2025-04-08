export function createCard(cardData, 
                          deleteCard, 
                          cardLikeButton, 
                          openImagePopup, 
                          popupImage, 
                          popupImageCaption, 
                          popupTypeImage, 
                          openPopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const like = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // Устанавливаем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // обработчик на изображение карточки
  cardImage.addEventListener('click', function() {
    openImagePopup(cardData, popupImage, popupImageCaption, popupTypeImage, openPopup);
  });

  // обработчик на лайк
  like.addEventListener('click', cardLikeButton);

  // обработчик на удаление
  cardDeleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

// Функция добавления лайка в активном состоянии
export function cardLikeButton(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

export function openImagePopup(cardData, popupImage, popupImageCaption, popupTypeImage, openPopup) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openPopup(popupTypeImage);
}