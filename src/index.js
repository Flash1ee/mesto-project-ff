import "../pages/index.css";
import { initialCards } from "./cards";
import {
	openPopup,
	closePopup,
	popupFindAndClose,
	addCloseByEscapeListener,
} from "./modal";
import { newCard, deleteCard, likeCard, popupCard } from "./components/card";

const cardList = document.querySelector(".places__list");

// Профиль
const profileTitleSelector = ".profile__title";
const profileDescriptionSelector = ".profile__description";
const editProfileFormName = "edit-profile";

// Карточка
const addCardFormName = "new-place";

// Попап
const popupCloseSelector = ".popup__close";

// Добавление дефолтных карточек
function addCardsToPage() {
	initialCards.forEach((element) => {
		const card = newCard(
			element.name,
			element.link,
			deleteCard,
			likeCard,
			popupCard,
			openPopup,
			closePopup,
			addCloseByEscapeListener
		);
		cardList.append(card);
	});
}

// Обработчик формы добавления карточки
function handleNewCardFormSubmit(evt) {
	evt.preventDefault();

	const cardForm = document.forms[addCardFormName];

	const placeTitle = cardForm["place-name"].value;
	const link = cardForm["link"].value;
	cardList.prepend(
		newCard(
			placeTitle,
			link,
			deleteCard,
			likeCard,
			popupCard,
			openPopup,
			closePopup,
			addCloseByEscapeListener
		)
	);

	cardForm.reset();
	popupFindAndClose();
}

// Редактирование профиля
function profileEditButtonHandle() {
	const profileEditButton = document.querySelector(".profile__edit-button");

	profileEditButton.addEventListener("click", () => {
		const editForm = document.forms[editProfileFormName];
		profileEditPreFill(editForm);
		editForm.addEventListener("submit", handleProfileFormSubmit);

		const popupProfileEdit = document.querySelector(".popup_type_edit");
		openPopup(popupProfileEdit);

		const popupCloseBtn =
			popupProfileEdit.querySelector(popupCloseSelector);
		popupCloseBtn.addEventListener("click", () => {
			closePopup(popupProfileEdit);
		});

		addCloseByEscapeListener();
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

	const profileForm = document.forms[editProfileFormName];

	const name = profileForm.name.value;
	const description = profileForm.description.value;

	document.querySelector(profileTitleSelector).textContent = name;
	document.querySelector(profileDescriptionSelector).textContent =
		description;

	popupFindAndClose();
}

// Добавление новой карточки
function profileAddCardButtonHandle() {
	const profileAddButton = document.querySelector(".profile__add-button");

	profileAddButton.addEventListener("click", () => {
		const popupAddNewCard = document.querySelector(
			".popup_type_new-card"
		);
		openPopup(popupAddNewCard);

		const cardForm = document.forms[addCardFormName];
		cardForm.addEventListener("submit", handleNewCardFormSubmit);

		const popupCloseBtn =
			popupAddNewCard.querySelector(popupCloseSelector);
		popupCloseBtn.addEventListener("click", () => {
			closePopup(popupAddNewCard);
		});

		addCloseByEscapeListener();
	});
}

addCardsToPage();
profileEditButtonHandle();
profileAddCardButtonHandle();
