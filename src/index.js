import '../pages/index.css';
import { initialCards } from './cards';

const cardList = document.querySelector('.places__list');

function addCardsToPage() {
    initialCards.forEach(element => {
        const card = newCard(element.name, element.link, deleteCard);
        cardList.append(card);
    });
}

function newCard(title, link, rmFunc) {
    const card = document.querySelector('#card-template').content.
        querySelector('.card').cloneNode(true);
        

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__title').textContent = title;

    const rmCardButton = card.querySelector('.card__delete-button');

    rmCardButton.addEventListener('click', () => { 
        rmFunc(card);
    }); 

    return card;
}

function deleteCard(card) {
    card.remove();
}

addCardsToPage();