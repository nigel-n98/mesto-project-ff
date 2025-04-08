// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Функция выхода с попапа Escape
export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}