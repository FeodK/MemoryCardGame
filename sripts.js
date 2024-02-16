const GAME_NODE = document.querySelector('#game-board');
const VICTORY_TEXT = document.querySelector('#victory-message');
const START_GAME_BUTTON = document.querySelector('#new-game-button');

const VISIBLE_CARD_CLASSNAME = 'visible';

const CARD_FLIP_TIMEOUT_MS = 500;

const CARD_ELEMENTS = ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁"];

const CARD_AMOUNT = 16;

let VISIBLE_CARDS = [];

START_GAME_BUTTON.addEventListener("click", startGame)

function startGame() {
    [GAME_NODE, VICTORY_TEXT].forEach(node => node.innerHTML = "");

    const CARD_VALUES = generateArray(CARD_ELEMENTS, CARD_AMOUNT);

    CARD_VALUES.forEach(createCard);

    const createCards = document.querySelectorAll('.card');
    createCards.forEach(card => card.classList.add(VISIBLE_CARD_CLASSNAME));
    setTimeout(() => {
        createCards.forEach(card => card.classList.remove(VISIBLE_CARD_CLASSNAME));
    }, 1000)
};

function generateArray(emojies, amount) {
    const randomArr = [];
    const elCounts = {};

    for (const emoji of emojies) {
        elCounts[emoji] = 0;
    }
    while (randomArr.length < amount) {
        const randomIndex = Math.floor(Math.random() * emojies.length);
        const randomElement = emojies[randomIndex];

        if (elCounts[randomElement] < 2) {
            randomArr.push(randomElement);
            elCounts[randomElement]++;
        }
    }

    return randomArr;
};

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement("div");
    cardFront.classList.add('card-front');

    const cardBack = document.createElement("div");
    cardBack.classList.add('card-back');

    cardFront.textContent = '?';
    cardBack.textContent = emoji;

    card.appendChild(cardInner);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    
    card.addEventListener('click', () => {
        handleCardClick(card);
    });

    GAME_NODE.appendChild(card);
};

function handleCardClick(card) {

    if(card.classList.contains(VISIBLE_CARD_CLASSNAME)){
        return;
    }

    const checkVictory = () => {
        const visibleCards = document.querySelectorAll('.visible');

        const isVictory = visibleCards.length === CARD_AMOUNT;
        const victoryMessage = "congratulats! you won!"

        if(isVictory) {
            VICTORY_TEXT.textContent = victoryMessage;
        }

    }

    card.querySelector('.card-inner').addEventListener('transitionend', checkVictory);

    card.classList.add(VISIBLE_CARD_CLASSNAME);

    VISIBLE_CARDS.push(card);

    if (VISIBLE_CARDS.length % 2 !== 0) {
        return;
    }

    const [preLastCard, lastCard] = VISIBLE_CARDS.slice(-2);

    if (lastCard.textContent !== preLastCard.textContent) {
        VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);

        setTimeout(() => {
            lastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
            preLastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
        }, CARD_FLIP_TIMEOUT_MS );
    }
};

startGame();