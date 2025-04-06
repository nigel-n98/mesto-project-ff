// Функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}
