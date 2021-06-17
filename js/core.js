

let wordToBeGuessed;
let updateAnswer;
let numberOfLetters;
let isGameLive;

const displayHint = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");
const underscore = document.getElementById("underscore");
const scene = document.getElementById("picture");

const maxErrors = 6;
let correctGuesses = 0;
let incorrectGuesses = 0;

class Game{
    constructor(){
        this.words = ["potato", "apple", "grape", "banana", "grapefruit"];
        this.hints = ["brown", "red", "purple", "yellow", "reddish"];
        numberOfLetters = [];
        chooseWord(this.words, this.hints);
        createButtons();
        replaceUnderscore();
    }
}

function chooseWord(words, hints){
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
    scene.src = `../pictures/mistake_0${incorrectGuesses}.png`
}

function winGame(){
//display win message
//display restart
//goto restartGame()
}
function loseGame(){
//display lose message
//display restart
//goto restartGame()
}
function restartGame(){

}

const game01 = new Game();
