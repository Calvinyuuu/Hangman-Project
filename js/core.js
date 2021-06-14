

let wordToBeGuessed;
let updateAnswer;
let numberOfLetters;
let isGameLive;
let displayHint = document.getElementById("hint");
let keyboard = document.getElementById("keyboard");
let underscore = document.getElementById("underscore");
let numberOfErrors = 6;

class Game{
    constructor(){
        this.words = ["potato", "apple", "grape", "banana", "grapefruit"];
        this.hints = ["brown", "red", "purple", "yellow", "reddish"];
        numberOfLetters = [];
        chooseWord(this.words);
        createButtons();
        replaceUnderscore();
        runGame();
    }
}

function runGame(){
}

function chooseWord(words){
    wordToBeGuessed = words[Math.floor(Math.random() * words.length)];
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
    updateAnswer = wordToBeGuessed.split('').map((letterComparedTo, index) => {
        if(event.target.innerText === letterComparedTo){
            return `${event.target.innerText}`;
        };
        event.target.disabled = true;
        return updateAnswer[index];
    });

    replaceUnderscore();
}

const game01 = new Game();
