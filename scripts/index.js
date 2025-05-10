function addCardsToPage() {
    let cardList = document.querySelector('.places__list');

    initialCards.forEach(element => {
        const card = newCard(element.name, element.link, deleteCard);
        cardList.append(card);
    });
}

function newCard(title, link, rmFunc) {
    let card = document.querySelector('#card-template').cloneNode(true).content;

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__title').textContent = title;

    const rmCardButton = card.querySelector('.card__delete-button');

    rmCardButton.addEventListener('click', function (event) { 
        const eventTarget = event.target;
        rmFunc(eventTarget.parentElement);
    }); 

    return card;
}

function deleteCard(card) {
    card.remove();
}

addCardsToPage();