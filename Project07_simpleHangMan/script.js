// DOM elements
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');


// Array containing the words to be chosen from
const words = ['application', 'programming', 'interface', 'wizard', 'backend'];

// selecting a random word from the array
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

// empty arrays for storing correct and wrong answers
let correctLetters = [];
let wrongLetters = [];

// Functions

// Show hidden word
function displayWord() {
    // will generate blank spaces for the letter and if correct letter is inputed, will display it
    wordEl.innerHTML = `${selectedWord
        .split("")
        .map(letter => `<span class ="letters">
            ${correctLetters.includes(letter) ? letter: ''}
        </span>`)
        .join('')}`;
        
        // storing the word created by the user so far
        const innerWord = wordEl.innerText.replace(/\n/g, '');

        // if the word inputted by the user is same as the actual word, display the winning popup
        if(innerWord == selectedWord) {
            finalMessage.innerText = 'Congratulations You Won!';
            popup.style.display = 'flex';
        }
}

// Update the wrong letters
function updateWrongLettersEl() {
    // console.log('update wrong');

    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>': ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost!';
        popup.style.display = 'flex';
    }
}

// Show Notification if the user inputs a letter already used
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown Event listner
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        // check if the key pressed is one of the letters in the word to be found
        if (selectedWord.includes(letter)) {
            // if the letter does not already exist in the array, insert it
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else { // else display the notification
                showNotification();
            }
        } else { // if the letter pressed is incrorect, insert in the wrng letter array
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', ()=> {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    // generating a new word to be found
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    // clearing out all mistakes from the previous state
    updateWrongLettersEl();
    popup.style.display = 'none';
});

displayWord();