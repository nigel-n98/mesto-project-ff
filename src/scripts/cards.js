export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Создаёт карточку с изображением, названием, кнопкой "лайк" и кнопкой "удалить"
// и добавляет обработчики событий для лайка и удаления карточки.
export function createCard(cardData, deleteCard, cardLikeButton) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  const like = cardElement.querySelector('.card__like-button');
  like.addEventListener('click', cardLikeButton);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
  });

  return cardElement;
}

//Функция добавления лайка в активном состоянии
export function cardLikeButton (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

//Функция удаления карточек
export function deleteCard(cardElement) {
  cardElement.remove();
}