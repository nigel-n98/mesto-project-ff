// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//список изображений
const cardsContainer = document.querySelector('.places__list');

//кнопки 
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardImages = document.querySelectorAll('.card__image');
const popupClose = document.querySelectorAll('.popup__close');
//const cardLikeButton = document.querySelector('.card__like-button');

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

function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    cardsContainer.appendChild(cardElement);
})

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

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

cardsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('card__image')){
        popupImage.src = event.target.src;
        popupCaption.alt = event.target.alt;

        popupCaption.textContent = event.target.alt;


        openPopup(popupTypeImage);
    }
})

popupClose.forEach(function(button){
    button.addEventListener('click', function(event){
        const popup = event.target.closest('.popup');
        closePopup(popup);
    })
})

popups.forEach(function(popup){
    popup.addEventListener('click', function(event){
        if(event.target === popup) {
            closePopup(popup);
        }
    })
})

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

    //шаблоны карточек с изображениями
    const cardTemplate = document.querySelector('#card-template').content;
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true);

    const cardTitle = cardContent.querySelector('.card__title');
    const cardImage = cardContent.querySelector('.card__image');
    const cardLikeButton = cardContent.querySelector('.card__like-button');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    cardLikeButton.addEventListener('click', handleLikeButtonClick);

    cardsContainer.prepend(cardContent);

    closePopup(popupTypeNewCard);

    newPlace.reset();
}

function handleLikeButtonClick(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

//слушатель добавления карточек
newPlace.addEventListener('submit', addCard);



