function newCard(
	title,
	link,
	rmFunc,
	likeFunc,
	popupCardFunc,
	openPopupFunc,
	closePopupByClickFunc, 
	closePopupByEscListererFunc,
) {
	const card = document
		.querySelector("#card-template")
		.content.querySelector(".card")
		.cloneNode(true);

	card.querySelector(".card__image").src = link;
	card.querySelector(".card__title").textContent = title;

	const rmCardButton = card.querySelector(".card__delete-button");

	rmCardButton.addEventListener("click", (evt) => {
		evt.stopPropagation();
		rmFunc(card);
	});

	const likeButton = card.querySelector(".card__like-button");
	likeButton.addEventListener("click", (evt) => {
		evt.stopPropagation();

		likeFunc(card);
	});

	card.addEventListener("click", () => {
		popupCardFunc(link, title, openPopupFunc, closePopupByClickFunc);
		closePopupByEscListererFunc();
	});

	return card;
}

function deleteCard(card) {
	card.remove();
}

function likeCard(card) {
	let likeImg = card.querySelector(".card__like-button");
	if (likeImg === null) {
		likeImg = card.querySelector(".card__like-button_is-active");
		likeImg.classList.replace(
			"card__like-button_is-active",
			"card__like-button"
		);
	} else {
		likeImg.classList.replace(
			"card__like-button",
			"card__like-button_is-active"
		);
	}
}

function popupCard(link, title, openPopupFunc, closePopupFunc) {
	const popup = document.querySelector(".popup_type_image");
	const popupImg = popup.querySelector(".popup__image");
	const popupCaption = popup.querySelector(".popup__caption");

	popupImg.src = link;
	popupCaption.textContent = title;

	const closePopupBtn = popup.querySelector(".popup__close");
	closePopupBtn.addEventListener("click", () => {
		closePopupFunc(popup);
	});

	openPopupFunc(popup);
}

export { newCard, deleteCard, likeCard, popupCard };
