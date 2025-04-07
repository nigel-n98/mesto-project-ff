// Функция для создания карточки
export function createCard(cardData, deleteCard, cardLikeButton, onOpenImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const like = cardElement.querySelector('.card__like-button');

  // Обработчик клика по кнопке лайка
  like.addEventListener('click', cardLikeButton);

  // Устанавливаем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

   // Обработчик клика по изображению
   cardImage.addEventListener('click', function() {
    onOpenImagePopup(cardData); // передаем данные карточки в колбэк
  });

  // Обработчик удаления карточки
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function() {
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