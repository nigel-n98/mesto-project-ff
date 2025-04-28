// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./cards.js"; // Импортируем массив с карточками
import { createCard, cardLikeButton, deleteCard } from "./card.js"; // Импортируем функции для работы с карточками
import { showInputError, hideInputError, checkInputValidity, toggleButtonState, clearValidation, enableValidation } from './validation.js';
import { getCards, getUserInfo, patchProfileEdit, postCardAdd, deleteCardFromServer, patchEditAvatar } from './api.js';

// Переменная для ID пользователя
let userId = '';

// аватарка профиля
const profileImage = document.querySelector('.profile__avatar');
const profileImageContainer = document.querySelector('.profile__image');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const formUpdateAvatar = popupUpdateAvatar.querySelector('.popup__form');
const avatarInput = popupUpdateAvatar.querySelector('.popup__input_type_avatar-link');
const formUpdateAvatarButton = formUpdateAvatar.querySelector('.popup__button');


//список изображений
const cardsContainer = document.querySelector('.places__list');

//кнопки 
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

//попап
const popups = document.querySelectorAll('.popup');

//попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description');
const formElementEditProfile = popupTypeEdit.querySelector('[name="edit-profile"]');
const popupEditButton = popupTypeEdit.querySelector('.popup__button');
console.log(popupEditButton)

//попап карточки с изображением и описанием
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupConfirmDelete = document.querySelector('.popup_type_confirm');
const confirmDeleteForm = popupConfirmDelete.querySelector('[name="confirm-delete"]');
const popupConfirmDeleteButton = popupConfirmDelete.querySelector('.popup__button_type_delete');

//профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Форма добавления карточек
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formAddNewCard = popupTypeNewCard.querySelector('[name="new-place"]');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupNewCardButton = popupTypeNewCard.querySelector('.popup__button')

// объект валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Функция обработки формы отправки
  function handleProfileEditFormSubmit(event) {
    event.preventDefault();

    const name = popupInputTypeName.value;
    const description = popupInputTypeDescription.value;

    renderLoading(true, popupEditButton);

    patchProfileEdit(name, description)
        .then(function (updatedUser) {
            profileTitle.textContent = updatedUser.name;
            profileDescription.textContent = updatedUser.about;
            closePopup(popupTypeEdit);
        })
        .catch(function(err) {
            console.log('Ошибка при обновлении профиля:', err);
        })
        .finally(function(){
            renderLoading(false, popupEditButton);
        });
}

function addCard(event) {
    event.preventDefault();
  
    const name = popupInputTypeCardName.value;
    const link = popupInputTypeUrl.value;

    renderLoading('true', popupNewCardButton);
  
    postCardAdd(name, link)
      .then((cardData) => {
        const cardElement = createCard(cardData, deleteCard, cardLikeButton, openImagePopup, openConfirmDeletePopup, userId);
        cardsContainer.prepend(cardElement);
        closePopup(popupTypeNewCard);
        formAddNewCard.reset();
      })
      .catch((err) => {
        console.log('Ошибка при добавлении карточки:', err);
      })
      .finally(function(){
        renderLoading(false, popupNewCardButton);
      });
  }

//Открытие попапа с изображением
function openImagePopup(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupImageCaption.textContent = cardData.name;
    openPopup(popupTypeImage);
  }

// обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', function(){
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    clearValidation(formElementEditProfile, validationConfig);
    openPopup(popupTypeEdit);
})

// обработчик кнопки добавления карточек
profileAddButton.addEventListener('click', function(){
    formAddNewCard.reset();
    clearValidation(formAddNewCard, validationConfig);
    openPopup(popupTypeNewCard);

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

enableValidation(validationConfig);


Promise.all([getUserInfo(), getCards()])
    .then(function([userData, cards]){
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.src = userData.avatar;
        userId = userData._id;

        cards.forEach(function(cardData){
            const cardElement = createCard(cardData, deleteCard, cardLikeButton, openImagePopup, openConfirmDeletePopup, userId);
            cardsContainer.prepend(cardElement);
        });

    })
    .catch(function(error) {
        console.error('Ошибка при получении данных:', error);
    })


    let cardToDelete = null;
    let cardIdToDelete = null;

    function openConfirmDeletePopup(cardElement, cardId) {
        cardToDelete = cardElement;
        cardIdToDelete = cardId;
        openPopup(popupConfirmDelete);
      }

    confirmDeleteForm.addEventListener('submit', function (event) {
        event.preventDefault();
      
        deleteCardFromServer(cardIdToDelete)
          .then(function() {
            cardToDelete.remove();
            closePopup(popupConfirmDelete);
          })
          .catch(function(err){
            console.error('Ошибка при удалении карточки:', err);
          });
      });


// Открываем попап редактирования аватарки
profileImageContainer.addEventListener('click', function(){
    formUpdateAvatar.reset(); // очищаем поле
    clearValidation(formUpdateAvatar, validationConfig); // убираем старые ошибки
        openPopup(popupUpdateAvatar);
      })


// Меняем аватарку в профиле
formUpdateAvatar.addEventListener('submit', function(evt){
    evt.preventDefault();

    const avatarLink = avatarInput.value;

    renderLoading(true, formUpdateAvatarButton)
    
    patchEditAvatar(avatarLink)

    .then(function(res){
        profileImage.src = res.avatar;
        closePopup(popupUpdateAvatar);
        formUpdateAvatar.reset();
    })
    .catch(function(err){
        console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(function(){
        renderLoading(false, formUpdateAvatarButton);
    })
});

// Функция отображение предзагрузки "Сохранение"
function renderLoading(isLoading, buttonElement, defaultText = 'Сохранить') {
    buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
}