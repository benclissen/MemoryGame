/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


//variables
const deck = document.querySelector(".deck");
deck.addEventListener('click', openCard);
const movesCount = document.querySelector('.moves');
let cardSymbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let cards = [].slice.call(deck.children);
let openedCards = [];

let timer = 0;
let elapsedSec = 0;
let gameInProgress = false;
let moves = 0
let matches = 8;

//run
newGame();

//Initialise

function newGame() {

    // Clear openedCards array
    openedCards = [];

    // Shuffle symbols
    cardSymbols = shuffle(cardSymbols);

    // Iterate over all cards
    cards.forEach((card, index) => {
        // Remove classes
        card.classList.remove('open', 'show', 'match', 'bounceIn');
        // Remove symbols
        removeClassByPrefix(card.children[0], 'fa-');  //need to rework this

        // Attach new symbols to cards
        const symbol = `fa-${cardSymbols[index]}`;
        card.children[0].classList.add(symbol);
    });
	elapsedSec = 0;
//	openAllCards();
	
	// Reset moves
    moves = 0;
    movesCount.textContent = moves;
}

function openCard(event) {

    startTimer();

    var target = event.target;
    const parent = target.parentElement;
    if (parent.classList.contains('card')) {
        target = parent;
    }

    if (!openedCards.includes(target)) {
        target.classList.add('open', 'show');
        openedCards.push(target);
        checkMatch();
    }
}

function checkMatch() {
    const length = openedCards.length;
    if (length === 2) {

        const last = openedCards[1];
        const preLast = openedCards[0];

		if (last.children[0].classList.toString() === //Cards Match
            preLast.children[0].classList.toString()) {
            matches++;
			cardsMatched(preLast);
            cardsMatched(last);
        } else { // Card Not Matching
            cardsNotMatched(preLast);
			cardsNotMatched(last);
        }
        incrementMove();
        openedCards = [];
        checkIfWon();
    }
}



function openAllCards() {
	cards.forEach((card, index) => {
        card.classList.add('show');
		console.log('card openend' + index);
	});
}

function incrementMove() {
    moves++;
    movesCount.textContent = moves;
    //determineRating();
}

function cardsMatched(card) {
    setTimeout(() => {
        card.classList.add('match', 'bounceIn');
    }, 500)
}
function cardsNotMatched(card) {
    setTimeout(() => {
        card.classList.remove('open', 'show');
    }, 500)
}

function checkIfWon() {
    if (matches === 8) {
        stopTimer();
        openModal();
    }
}

//we're not using this function
function resetScore() {

    // Reset rating
//    rating = 3;
//    stars.forEach(star => removeClassByPrefix(star, 'empty-star'));



    // Reset matches
    matches = 0;

    // Reset time
    elapsedSec = 0;
//    timerHours.textContent = '00';
//    timerMins.textContent = '00';
//    timerSeconds.textContent = '00';

    // Stop timer
    stopTimer();
}

function startTimer() {
    if (!gameInProgress) {
        gameInProgress = true;
        timer = setInterval(setTime, 1000);
    }
}

function stopTimer() {
    gameInProgress = false;
    clearInterval(timer);
}

function setTime() {
    let remainingSec = ++elapsedSec;
//    hour = parseInt(remainderSeconds / 3600);
//    timerHours.textContent = stringifyTime(hour);
//    remainderSeconds = remainderSeconds % 3600;
//    min = parseInt(remainderSeconds / 60)
//    timerMins.textContent = stringifyTime(min);
//    remainderSeconds = remaind
    //timerSeconds.textContent = remainingSec;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;

}

function removeClassByPrefix(el, prefix, replace = '') {
    var regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g');
    el.className = el.className.replace(regx, replace);
    return el;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
