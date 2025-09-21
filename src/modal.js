const escapeKey = "Escape";
const popupOpenClass = "popup_is-opened";
const popupOpenSelector = "." + popupOpenClass;
const popupCloseClass = "popup_is-animated";

function closeOpenPopup() {
    const popupOpen = document.querySelector(popupOpenSelector);
    if (popupOpen === null) {
        return;
    }
    closePopup(popupOpen);
}

function closePopup(element) {
    if (element.classList.contains("popup")) {
        element.classList.remove(popupOpenClass, popupCloseClass);
    }

    document.removeEventListener("keydown", closePopupByEscape);
}

function openPopup(element) {
    element.classList.add(popupCloseClass);
    setTimeout(() => {
        element.classList.add(popupOpenClass);
    }, 1);

    document.addEventListener("keydown", closePopupByEscape);
}

// Обработчик закрытия попапа через Escape
function closePopupByEscape(evt) {
    if (evt.key === escapeKey) {
        closeOpenPopup();
    }
}

export { openPopup, closeOpenPopup, closePopup, popupOpenClass };
