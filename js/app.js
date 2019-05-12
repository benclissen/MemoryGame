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
const restartButton = document.querySelector('.restart');
const modal = document.querySelector('#simpleModal');
const modalCloseButton = document.querySelector('.modal-close-button');
const modalReplayButton = document.querySelector('.modal-replay-button');
const modalMoves = document.querySelector('.modal-body .moves-count');
const modalHours = document.querySelector('.modal-body .hours');
const modalMins = document.querySelector('.modal-body .mins');
const modalSeconds = document.querySelector('.modal-body .seconds');
const modalRating = document.querySelector('.modal-body .rating');
const stars = document.querySelectorAll('.fa-star');
const timerHours = document.querySelector('#timer .hours');
const timerMins = document.querySelector('#timer .minutes');
const timerSeconds = document.querySelector('#timer .seconds');


const movesCount = document.querySelector('.moves');
let cardSymbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let cards = [].slice.call(deck.children);
let openedCards = [];

let timer = 0;
let elapsedSec = 0;
let hour = 0;
let min = 0;
let sec = 0;


let gameInProgress = false;
let moves = 0
let matches = 0;
let starCount = 3;

//event listeners
deck.addEventListener('click', openCard);
restartButton.addEventListener('click', newGame);
modalCloseButton.addEventListener('click', closeModal);
modalReplayButton.addEventListener('click', newGame);


//run
newGame();

//Initialise

function newGame() {

    
	closeModal();
	// Clear openedCards array
    openedCards = [];
	
	resetScore();

    // Shuffle symbols
    cardSymbols = shuffle(cardSymbols);

    // Iterate over all cards
    cards.forEach((card, index) => {
        // Remove classes
        card.classList.remove('open', 'show', 'match', 'bounceIn');
        // Remove symbols
        removeClassByPrefix(card.children[0], 'fa-'); 

        // Attach new symbols to cards
        const symbol = `fa-${cardSymbols[index]}`;
        card.children[0].classList.add(symbol);
    });
	elapsedSec = 0;

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

function incrementMove() {
    moves++;
    movesCount.textContent = moves;
	if (moves === 15) {
        stars[2].style.display = "none";
		starCount = 2; 
    } else if (moves === 30) {
        stars[1].style.display = "none";
		starCount = 1; 
    }
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
//    stars.forEach(star => removeClassByPrefix(star, 'empty-star'));

    // Reset matches
    matches = 0;

    // Reset time
    elapsedSec = 0;
    timerHours.textContent = '00';
    timerMins.textContent = '00';
    timerSeconds.textContent = '00';

    // Stop timer
    stopTimer();
	
	starCount = 3;
	
	//display all stars
	stars.forEach (function (element) {
		element.style.display = "inline";
	});
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
    hour = parseInt(remainingSec / 3600);
    timerHours.textContent = stringifyTime(hour);
    remainingSec = remainingSec % 3600;
    min = parseInt(remainingSec / 60);
    timerMins.textContent = stringifyTime(min);
	remainingSec = remainingSec % 60;
    sec = remainingSec;
    timerSeconds.textContent = stringifyTime(sec);
}

function openModal() {
    modalHours.textContent = hour > 0 ? `${hour} hours, ` : '';
    modalMins.textContent = min > 0 ? `${min} minutes, ` : '';
    modalSeconds.textContent = `${sec} seconds`;
    modalMoves.textContent = `${moves} moves`;
	modalRating.textContent = starCount;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
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

function stringifyTime(val) {
    var valString = val + '';
    return valString.length >= 2 ? `${val}` : `0${val}`;
}
