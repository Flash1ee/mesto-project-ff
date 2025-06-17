import "../pages/index.css";
import { initialCards } from "./cards";
import { openPopup, closeOpenPopup, closePopup, popupOpenClass } from "./modal";
import { newCard, deleteCard, likeCard } from "./components/card";

// Попап
const popupCloseClass = "popup__close";

// Профиль
const profileTitleSelector = ".profile__title";
const profileDescriptionSelector = ".profile__description";
const editProfileForm = document.forms["edit-profile"];
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");

// Карточка
const cardForm = document.forms["new-place"];
const cardList = document.querySelector(".places__list");
const popupAddNewCard = document.querySelector(".popup_type_new-card");

function handleImageClick(link, title, imgElement, imgCaption) {
	imgElement.src = link;
	imgElement.alt = title;
	imgCaption.textContent = title;
}

const config = {
	rmFunc: deleteCard,
	likeFunc: likeCard,
	fillImagePopup: handleImageClick,
	openPopupFunc: openPopup,
};

// Добавление дефолтных карточек
function addCardsToPage() {
	initialCards.forEach((element) => {
		renderCard(element.name, element.link, config, "append");
	});
}

// Обработчик формы добавления карточки
function handleNewCardFormSubmit(evt) {
	evt.preventDefault();

	const placeTitle = cardForm["place-name"].value;
	const link = cardForm["link"].value;

	renderCard(placeTitle, link, config);

	cardForm.reset();
	closeOpenPopup();
}

function renderCard(title, link, config, method = "prepend") {
	const card = newCard(title, link, config);
	cardList[method](card);
}

// Редактирование профиля
function profileEditButtonHandle() {
	editProfileForm.addEventListener("submit", handleProfileFormSubmit);

	profileEditButton.addEventListener("click", () => {
		profileEditPreFill(editProfileForm);
		openPopup(popupProfileEdit);
	});
}

function profileEditPreFill(editForm) {
	const name = document.querySelector(profileTitleSelector).textContent;
	const hobby = document.querySelector(
		profileDescriptionSelector
	).textContent;

	editForm.name.value = name;
	editForm.description.value = hobby;
}

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const name = editProfileForm.name.value;
	const description = editProfileForm.description.value;

	document.querySelector(profileTitleSelector).textContent = name;
	document.querySelector(profileDescriptionSelector).textContent =
		description;

	closeOpenPopup();
}

// Добавление новой карточки
function profileAddCardButtonHandle() {
	cardForm.addEventListener("submit", handleNewCardFormSubmit);

	profileAddButton.addEventListener("click", () => {
		openPopup(popupAddNewCard);
	});
}

function popupCloseHandler() {
	const popups = document.querySelectorAll(".popup");
	popups.forEach((popup) => {
		popup.addEventListener("mousedown", (evt) => {
			if (evt.target.classList.contains(popupCloseClass)) {
				closePopup(popup);
			}
			// Закрытие попапа по клику на оверлей
			if (evt.target.classList.contains(popupOpenClass)) {
				closePopup(popup);
			}
		});
	});
}

addCardsToPage();
profileEditButtonHandle();
profileAddCardButtonHandle();
popupCloseHandler();
