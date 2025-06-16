const escapeKey = "Escape";
const popupOpenClass = "popup_is-opened";
const popupCloseClass = "popup_is-animated";

function closePopupOverlay(evt) {
	return closeOpenPopup(evt.target)
}

function closeOpenPopup() {
	const popupOpen = document.querySelector("." + popupOpenClass);
	if (popupOpen === null) {
		return;
	}
	closePopup(popupOpen);
}

function closePopup(element) {
	if (element.classList.contains("popup")) {
		element.classList.remove(popupOpenClass, popupCloseClass);
	}
	closeHandlerRemove();
}

function openPopup(element) {
	element.classList.add(popupCloseClass);
	setTimeout(() => {
		element.classList.add(popupOpenClass);
	}, 1);
	closeHandlerAdd();
}

// Обработчик закрытия попапа через Escape
function closePopupByEscape(evt) {
	if (evt.key === escapeKey) {
		closeOpenPopup();
	}
}

function closeHandlerAdd() {
	document.addEventListener("keydown", closePopupByEscape);
	document.addEventListener("click", closePopupOverlay);
}

function closeHandlerRemove() {
	document.removeEventListener("click", closePopupOverlay);
	document.removeEventListener("keydown", closePopupByEscape);
}

export {
	openPopup,
	closeOpenPopup,
};
