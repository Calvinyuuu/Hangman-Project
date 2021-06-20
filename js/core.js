

let wordToBeGuessed;
let updateAnswer;
let numberOfLetters;

const displayHint = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");
const underscore = document.getElementById("underscore");
const scene = document.getElementById("picture");
const displayErrors = document.getElementById("errors");
const postGame = document.getElementById("post_game_screen");
const playAgain = document.getElementById("close_button");
let words;
let hints; 

const maxErrors = 6;
let correctGuesses = 0;
let incorrectGuesses = 0;
let opacity = 0;

class Game{
    constructor(){
        words = ["potato", "apple", "grape", "banana", "grapefruit"];
        hints = ["brown", "red", "purple", "yellow", "reddish"];
        numberOfLetters = [];
        chooseWord();
        createButtons();
        replaceUnderscore();
    }
}

function chooseWord(){
    let chosenWordIndex = Math.floor(Math.random() * words.length)
    wordToBeGuessed = words[chosenWordIndex];
    displayHint.innerHTML = hints[chosenWordIndex];
    updateAnswer = wordToBeGuessed.split('').map(() => '_');
    
}

function createButtons(){
    let buttons = `abcdefghijklmnopqrstuvwxyz`.split('')
    buttons.forEach(letter =>{
        const buttonContainer = document.createElement('button');
        buttonContainer.innerHTML = letter;
        buttonContainer.addEventListener('click', letterSelected);
        keyboard.appendChild(buttonContainer);
    })
}

function replaceUnderscore(){
    console.log(updateAnswer);
    for(let i = 0; i < wordToBeGuessed.length; i++){
        numberOfLetters[i] = `${updateAnswer[i]} `;
    };
    underscore.innerHTML = numberOfLetters.join('');
}

function letterSelected(event){
    let correctAnswer = false;
    
    updateAnswer = wordToBeGuessed.split('').map((letterComparedTo, index) => {
        if(event.target.innerText === letterComparedTo){
            correctAnswer = true;
            correctGuesses++;
            return `${event.target.innerText}`;

        }
        event.target.disabled = true;
        return updateAnswer[index];
    });
    
    if(correctAnswer != true){
        incorrectGuesses++
        changeScene();
    }
    console.log(incorrectGuesses + `incorrect`);
    console.log(correctGuesses + `correct`);
    replaceUnderscore();
    isGameValid();
}

function isGameValid(){
    //if correctAnswer is at max
    if(correctGuesses === wordToBeGuessed.length){
        winGame();
        console.log(`win`);
    }
    //if incorrectAnswer is at max
    if(incorrectGuesses === maxErrors){
        loseGame();
        console.log(`lose`);
    }
}

function changeScene(){
    scene.src = `../pictures/mistake_0${incorrectGuesses}.png`;
    displayErrors.innerHTML = `Incorrect Guesses ${incorrectGuesses}/6`;
}

function winGame(){
fade();
//goto restartGame()
}
function loseGame(){
fade();
}
function restartGame(){


}
function fade(){
    if(opacity < 1){
        opacity += 0.1;
        setTimeout(() => {
            fade();
        }, 50);
    }
    postGame.style.opacity = opacity;
}
playAgain.addEventListener('click', ()=>{
    postGame.style.opacity = '0';
    playAgain.style.pointerEvents = 'none';
    restartGame();
})

const game01 = new Game();
