import "../pages/index.css";
import { openPopup, closeOpenPopup, closePopup, popupOpenClass } from "./modal";
import { createNewCard, deleteCard, likeCard } from "./components/card";
import { enableValidation, clearValidation } from "./validation";
import {
    apiConfig,
    editProfileData,
    getCards,
    getProfileData,
    addCard,
    updateAvatar,
} from "./api";
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

// Аватар
const editAvatarForm = document.forms["edit-avatar"];
const popupEditAvatar = document.querySelector(".popup_type_avatar");

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

let currentUserID = null;

const config = {
    rmFunc: deleteCard,
    likeFunc: likeCard,
    handleImageClick: handleImageClick,
    apiConfig: apiConfig,
};

// Добавление дефолтных карточек
async function addCardsToPage(cards, currentUserID) {
    cards.forEach((element) => {
        renderCard(
            element.name,
            element.link,
            element._id,
            element.likes.length,
            currentUserID,
            element.likes,
            element.owner._id,
            config,
            "append",
        );
    });
}

// Обработчик формы добавления карточки
async function handleNewCardFormSubmit(evt) {
    evt.preventDefault();

    const placeTitle = cardForm["place-name"].value;
    const link = cardForm["link"].value;
    const submitButton = cardForm.querySelector(".popup__button");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    try {
        const newCardData = await addCard(apiConfig, placeTitle, link);
        renderCard(
            newCardData.name,
            newCardData.link,
            newCardData._id,
            newCardData.likes.length,
            currentUserID,
            newCardData.likes,
            currentUserID,
            config,
        );
        cardForm.reset();
        closeOpenPopup();
    } catch (error) {
        console.error("Ошибка при добавлении карточки:", error);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function renderCard(
    title,
    link,
    id,
    likesCount,
    currentUserID,
    likes,
    ownerId,
    config,
    method = "prepend",
) {
    const card = createNewCard(
        title,
        link,
        id,
        likesCount,
        currentUserID,
        likes,
        ownerId,
        config,
    );
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
async function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = editProfileForm.name.value;
    const description = editProfileForm.description.value;
    const submitButton = editProfileForm.querySelector(".popup__button");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    try {
        await updateProfile(name, description);
        closeOpenPopup();
    } catch (error) {
        console.error("Ошибка обновления профиля:", error);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

async function updateProfile(newName, newDescription) {
    try {
        const res = await editProfileData(apiConfig, newName, newDescription);

        profileName.textContent = res.name;
        profileHobby.textContent = res.about;
    } catch (error) {
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

// Обработчик формы редактирования аватара
async function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const avatarLink = editAvatarForm["avatar-link"].value;
    const submitButton = editAvatarForm.querySelector(".popup__button");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    try {
        const res = await updateAvatar(apiConfig, avatarLink);
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
        closeOpenPopup();
    } catch (error) {
        console.error("Ошибка обновления аватара:", error);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Обработчик открытия формы редактирования аватара
function profileAvatarEditHandle() {
    profileImage.addEventListener("click", () => {
        clearValidation(editAvatarForm, validationConfig);
        openPopup(popupEditAvatar);
    });
}

// Загрузка данных пользователя и карточек
Promise.all([getProfileData(apiConfig), getCards(apiConfig)])
    .then(([userData, cards]) => {
        currentUserID = userData._id;
        fillProfilePreviewWithData(userData);
        addCardsToPage(cards, currentUserID);
    })
    .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
    });

profileEditButtonHandle();
profileAddCardButtonHandle();
profileAvatarEditHandle();
popupCloseHandler();

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    errorElementSelector: (inputElement) => `.${inputElement.id}-error`,
};

enableValidation(validationConfig);

const fillProfilePreviewWithData = function (userData) {
    profileName.textContent = userData.name || "";
    profileHobby.textContent = userData.about || "";
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
}