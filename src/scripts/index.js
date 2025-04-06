// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { openPopup, closePopup } from "./modal.js";
import { createCard, cardLikeButton, deleteCard, initialCards } from "./cards.js";


//список изображений
const cardsContainer = document.querySelector('.places__list');

//кнопки 
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardImages = document.querySelectorAll('.card__image');
const popupClose = document.querySelectorAll('.popup__close');

//попапы
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

//попап редактирования профиля
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description');
const formElement = popupTypeEdit.querySelector('[name="edit-profile"]');

//попап карточки с изображением и описанием
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Форма добавления карточек
const newPlace = popupTypeNewCard.querySelector('[name="new-place"]');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');

initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, cardLikeButton);
    cardsContainer.appendChild(cardElement);
})

//кнопка редактирования профиля
profileEditButton.addEventListener('click', function(){
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
})

//кнопка добавления карточек
profileAddButton.addEventListener('click', function(){
    openPopup(popupTypeNewCard);
})

//
cardsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('card__image')){
        popupImage.src = event.target.src;
        popupCaption.alt = event.target.alt;

        popupCaption.textContent = event.target.alt;


        openPopup(popupTypeImage);
    }
})

//
popupClose.forEach(function(button){
    button.addEventListener('click', function(event){
        const popup = event.target.closest('.popup');
        closePopup(popup);
    })
})

//
popups.forEach(function(popup){
    popup.addEventListener('click', function(event){
        if(event.target === popup) {
            closePopup(popup);
        }
    })
})

//
popups.forEach(function(popup){
    document.addEventListener('keydown', function(event){
        if(event.key === 'Escape') {
            closePopup(popup);
        }
    })
})

function handleFormSubmit(event) {
    event.preventDefault();

    const name = popupInputTypeName.value;
    const description = popupInputTypeDescription.value;

    profileTitle.textContent = name;
    profileDescription.textContent = description;

    closePopup(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

//функция добавления карточки
function addCard(event) {
    event.preventDefault();

    const name = popupInputTypeCardName.value;
    const link = popupInputTypeUrl.value;

    const cardData = { name, link, alt: name };
    const cardElement = createCard(cardData, deleteCard, cardLikeButton);

    cardsContainer.prepend(cardElement);
    closePopup(popupTypeNewCard);
    newPlace.reset();
}

//слушатель добавления карточек
newPlace.addEventListener('submit', addCard);


