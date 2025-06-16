import "../pages/index.css";
import { initialCards } from "./cards";
import { openPopup, closeOpenPopup } from "./modal";
import { newCard, deleteCard, likeCard } from "./components/card";

// Попап
const popupCloseSelector = ".popup__close";
const closePopupBtn = document.querySelector(popupCloseSelector);
const popup = document.querySelector(".popup_type_image");
const popupImg = popup.querySelector(".popup__image");
const popupCaption = popup.querySelector(".popup__caption");

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


function handleImageClick(link, title, openPopupFunc) {
	popupImg.src = link;
	popupImg.alt = title;
	popupCaption.textContent = title;

	openPopupFunc(popup);
}

const config = {
	rmFunc: deleteCard,
	likeFunc: likeCard,
	addImageFunc: handleImageClick,
	openPopupFunc: openPopup,
};

// Добавление дефолтных карточек
function addCardsToPage() {
	initialCards.forEach((element) => {
		const card = newCard(element.name, element.link, config);
		cardList.append(card);
	});
}

// Обработчик формы добавления карточки
function handleNewCardFormSubmit(evt) {
	evt.preventDefault();

	const placeTitle = cardForm["place-name"].value;
	const link = cardForm["link"].value;
	cardList.prepend(newCard(placeTitle, link, config));

	cardForm.reset();
	closeOpenPopup();
}

// Редактирование профиля
function profileEditButtonHandle() {
	profileEditButton.addEventListener("click", () => {
		profileEditPreFill(editProfileForm);
		editProfileForm.addEventListener("submit", handleProfileFormSubmit);

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
	profileAddButton.addEventListener("click", () => {
		openPopup(popupAddNewCard);

		cardForm.addEventListener("submit", handleNewCardFormSubmit);
	});
}

function popupCloseHandler() {
	closePopupBtn.addEventListener("click", () => {
		closeOpenPopup();
	});
}

addCardsToPage();
profileEditButtonHandle();
profileAddCardButtonHandle();
popupCloseHandler();
