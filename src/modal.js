const escapeKey = "Escape";
const popupOpenClass = "popup_is-opened";
const popupCloseClass = "popup_is-animated";

function closePopupViaClickOnOverlay() {
	document.addEventListener("click", (evt) => {
		closePopup(evt.target);
	});
}

function closePopup(element) {
	if (element.classList.contains("popup")) {
		element.classList.replace(popupOpenClass, popupCloseClass);
	}
}

function openPopup(element) {
	element.classList.add(popupOpenClass);
}

function popupFindAndClose() {
	const popups = document.querySelectorAll(".popup");
	popups.forEach((popup) => {
		if (isOpenedPopup(popup)) {
			closePopup(popup);
		}
	});
}

function isOpenedPopup(element) {
	return element.classList.contains(popupOpenClass);
}

function addCloseByEscapeListener() {
	document.addEventListener("keydown", closePopupByEscape);
}

// Обработчик закрытия попапа через Escape
function closePopupByEscape(evt) {
	if (evt.key === escapeKey) {
		popupFindAndClose();
		document.removeEventListener("keydown", closePopupByEscape);
	}
}

closePopupViaClickOnOverlay();

export { openPopup, closePopup, popupFindAndClose, closePopupByEscape, addCloseByEscapeListener};
