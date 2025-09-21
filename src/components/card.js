import { apiConfig, removeCard, addLike, deleteLike } from "../api";

function newCard(title, link, id, likesCount, currentUserID, likes, config) {
	const card = document
		.querySelector("#card-template")
		.content.querySelector(".card")
		.cloneNode(true);

	const cardImage = card.querySelector(".card__image");
	cardImage.src = link;
	cardImage.alt = title;
	card.querySelector(".card__title").textContent = title;

	const likeCountElement = card.querySelector(".card__like-count");
	likeCountElement.textContent = likesCount;

	const isLiked = likes.some(like => like._id === currentUserID);
	if (isLiked) {
		const likeButton = card.querySelector(".card__like-button");
		likeButton.classList.add("card__like-button_is-active");
	}

	config.handleImageClick(link, title, cardImage);

	const rmCardButton = card.querySelector(".card__delete-button");
	rmCardButton.addEventListener("click", () => {
		config.rmFunc(card, id);
	});

	const likeButton = card.querySelector(".card__like-button");
	const updateLikesCount = (newCount) => {
		likeCountElement.textContent = newCount;
	};
	likeButton.addEventListener("click", () => {
		config.likeFunc(card, id, updateLikesCount, config.apiConfig);
	});

	return card;
}

async function deleteCard(card, id) {
	try {
		const res = await removeCard(apiConfig, id);
		console.log(res);
		card.remove();
	} catch (error) {
		console.error("Ошибка удаления карточки:", error);
	}
}

async function likeCard(card, cardId, updateLikesCount, apiConfig) {
	const likeImg = card.querySelector(".card__like-button");
	const isLiked = likeImg.classList.contains("card__like-button_is-active");

	try {
		let res;
		if (isLiked) {
			res = await deleteLike(apiConfig, cardId);
		} else {
			res = await addLike(apiConfig, cardId);
		}
		likeImg.classList.toggle("card__like-button_is-active");
		updateLikesCount(res.likes.length);
	} catch (error) {
		console.error("Ошибка при работе с лайком:", error);
	}
}

export { newCard, deleteCard, likeCard };
