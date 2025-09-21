import "../pages/index.css";
import { initialCards } from "./cards";
import { openPopup, closeOpenPopup, closePopup, popupOpenClass } from "./modal";
import { newCard, deleteCard, likeCard } from "./components/card";
import { enableValidation, clearValidation } from "./validation";
import { apiConfig, editProfileData, getCards, getProfileData } from "./api";

// Попап
const popupCloseClass = "popup__close";
const addCardPopup = document.querySelector(".popup_type_image");
const imagePopup = addCardPopup.querySelector(".popup__image");
const popupCaption = addCardPopup.querySelector(".popup__caption");

// Профиль
const profileTitleSelector = ".profile__title";
const profileName = document.querySelector(profileTitleSelector);

const profileDescriptionSelector = ".profile__description";
const profileHobby = document.querySelector(profileDescriptionSelector);

const profileImageSelector = ".profile__image";
const profileImage = document.querySelector(profileImageSelector);

const editProfileForm = document.forms["edit-profile"];
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");

// Карточка
const cardForm = document.forms["new-place"];
const cardList = document.querySelector(".places__list");
const popupAddNewCard = document.querySelector(".popup_type_new-card");

function handleImageClick(link, title, cardPopup) {
	cardPopup.addEventListener("click", () => {
		imagePopup.src = link;
		imagePopup.alt = title;
		popupCaption.textContent = title;
		openPopup(addCardPopup);
	});
}

const config = {
	rmFunc: deleteCard,
	likeFunc: likeCard,
	handleImageClick: handleImageClick,
};

// Добавление дефолтных карточек
async function addCardsToPage() {
	const cards = await getCards(apiConfig);
	cards.forEach((element) => {
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
		clearValidation(editProfileForm, validationConfig);
		profileEditPreFill(editProfileForm);
		openPopup(popupProfileEdit);
	});
}

function profileEditPreFill(editForm) {
	editForm.name.value = profileName.textContent;
	editForm.description.value = profileHobby.textContent;
}

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const name = editProfileForm.name.value;
	const description = editProfileForm.description.value;
	
	updateProfile(name, description);
	closeOpenPopup();
}

async function updateProfile(newName, newDescription) {
	try {
		const res = await editProfileData(apiConfig, newName, newDescription)

		profileName.textContent = res.name;
		profileHobby.textContent = res.about;
	}catch (error) {
		console.error("Ошибка обновления профиля:", error);
	}
}

// Добавление новой карточки
function profileAddCardButtonHandle() {
	cardForm.addEventListener("submit", handleNewCardFormSubmit);

	profileAddButton.addEventListener("click", () => {
		clearValidation(cardForm, validationConfig);
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig); 

getProfileData(apiConfig);

const fillProfilePreview = async function(config) {
	try {
		const userData = await getProfileData(config);
		profileName.textContent = userData.name || "";
		profileHobby.textContent = userData.about || "";
		profileImage.style.backgroundImage = `url('${userData.avatar}')`;
	} catch (error) {
		console.error("Ошибка получения профиля:", error);
	}
}

fillProfilePreview(apiConfig);