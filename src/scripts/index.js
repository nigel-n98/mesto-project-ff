// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./cards.js"; // Импортируем массив с карточками
import { createCard, cardLikeButton, deleteCard } from "./card.js"; // Импортируем функции для работы с карточками

//список изображений
const cardsContainer = document.querySelector('.places__list');

//кнопки 
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// const cardImages = document.querySelectorAll('.card__image');
const popupCloseButtons = document.querySelectorAll('.popup__close');

//попапы
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

//попап редактирования профиля
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description');
const formElementEditProfile = popupTypeEdit.querySelector('[name="edit-profile"]');

//попап карточки с изображением и описанием
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

//профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Форма добавления карточек
const formAddNewCard = popupTypeNewCard.querySelector('[name="new-place"]');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');

// Функция выхода с попапа Escape
export function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

// Функция обработки формы отправки
  function handleProfileEditFormSubmit(event) {
    event.preventDefault();

    const name = popupInputTypeName.value;
    const description = popupInputTypeDescription.value;

    profileTitle.textContent = name;
    profileDescription.textContent = description;

    closePopup(popupTypeEdit);
}

// Функция добавления карточки
function addCard(event) {
    event.preventDefault();

    const name = popupInputTypeCardName.value;
    const link = popupInputTypeUrl.value;

    const cardData = { name, link, alt: name };
    const cardElement = createCard(cardData, deleteCard, cardLikeButton, openImagePopup);

    cardsContainer.prepend(cardElement);
    closePopup(popupTypeNewCard);
    formAddNewCard.reset();
}

// Функция для открытия попапа с изображением
function openImagePopup(cardData) {
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__caption');
  
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupImageCaption.textContent = cardData.name;
  
    const popupTypeImage = document.querySelector('.popup_type_image');
    openPopup(popupTypeImage); // Открыть попап
  }

// стартовые карточки
initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, cardLikeButton, openImagePopup);
    cardsContainer.appendChild(cardElement);
})

// обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', function(){
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
})

// обработчик кнопки добавления карточек
profileAddButton.addEventListener('click', function(){
    openPopup(popupTypeNewCard);
})

// обработчик попапов изображений
cardsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('card__image')){
        popupImage.src = event.target.src;
        popupImage.alt = event.target.alt;
        popupImageCaption.textContent = event.target.alt;
        openPopup(popupTypeImage);
    }
})

// обработчик кнопок закрытий попапов
popupCloseButtons.forEach(function(button){
    button.addEventListener('click', function(event){
        const popup = event.target.closest('.popup');
        closePopup(popup);
    })
})

// обработчик закрытия попапов вне окон
popups.forEach(function(popup){
    popup.addEventListener('click', function(event){
        if(event.target === popup) {
            closePopup(popup);
        }
    })
})

// обработчик submit
formElementEditProfile.addEventListener('submit', handleProfileEditFormSubmit);

//слушатель добавления карточек
formAddNewCard.addEventListener('submit', addCard);


