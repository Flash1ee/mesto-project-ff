const addCardPopup = document.querySelector(".popup_type_image");
const imgPopup = addCardPopup.querySelector(".popup__image");
const popupCaption = addCardPopup.querySelector(".popup__caption");

function newCard(title, link, config) {
	const card = document
		.querySelector("#card-template")
		.content.querySelector(".card")
		.cloneNode(true);

	const cardImage = card.querySelector(".card__image");
	cardImage.src = link;
	cardImage.alt = title;
	card.querySelector(".card__title").textContent = title;

	const rmCardButton = card.querySelector(".card__delete-button");

	rmCardButton.addEventListener("click", () => {
		config.rmFunc(card);
	});

	const likeButton = card.querySelector(".card__like-button");
	likeButton.addEventListener("click", () => {
		config.likeFunc(card);
	});

	cardImage.addEventListener("click", () => {
		config.fillImagePopup(link, title, imgPopup, popupCaption);
		config.openPopupFunc(addCardPopup);
	});

	return card;
}

function deleteCard(card) {
	card.remove();
}

function likeCard(card) {
	let likeImg = card.querySelector(".card__like-button");
	likeImg.classList.toggle("card__like-button_is-active");
}

export { newCard, deleteCard, likeCard };
