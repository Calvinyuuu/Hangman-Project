
//change the words and hints
let wordToBeGuessed;
let updateAnswer;
let numberOfLetters;
let words;
let hints;

const displayHint = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");
const underscore = document.getElementById("underscore");
const scene = document.getElementById("picture");
const displayErrors = document.getElementById("errors");
const postGame = document.getElementById("post_game_screen");
const postGameMessage = document.getElementById("post_game_placeholder");
const proceed = document.getElementById("close_button"); 
const displayWord = document.getElementById("display_word");
const disclaimer = document.getElementById("disclaimer");
const disclaimerButton = document.getElementById("disclaimer_close");

const maxErrors = 6;
let correctGuesses = 0;
let incorrectGuesses = 0;
let opacity = 0;

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

class Game{
    constructor(){
        words = ["potato", "apple", "grape", "banana", "grapefruit"];
        hints = ["brown", "red", "purple", "yellow", "reddish"];
        chooseWord();
        createButtons();
        replaceUnderscore();
        lightbox.classList.add('active');
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
    numberOfLetters = [];
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
    if(incorrectGuesses === 6){
        scene.src = scene.src = `../pictures/mistake_00.png`;
    }else{
    scene.src = `../pictures/mistake_0${incorrectGuesses}.png`;
    displayErrors.innerHTML = `Incorrect Guesses ${incorrectGuesses}/6`;
    }
}

function winGame(){
    //read loseGame() reasoning for these two lines.
    displayWord.style.color =`white`;
    postGame.style.backgroundSize = 'contain';

    postGameMessage.innerHTML = `You win!`
    postGame.style.backgroundImage = 'url(../pictures/win_screen.png)';
    lightbox.classList.add('active');
    displayWord.innerHTML = `Your word was ${wordToBeGuessed}`
    fade();
}
function loseGame(){
    //needed to override because the positioning of one picture is different than the other. To be honest I'm just lazy creating another sprite but this works so...
    displayWord.style.color =`red`;
    postGame.style.backgroundSize = 'auto';

    postGameMessage.innerHTML = `You lost!`
    postGame.style.backgroundImage = 'url(../pictures/lose_screen.png)';
    lightbox.classList.add('active');
    displayWord.innerHTML = `Your word was ${wordToBeGuessed}`
    fade();
}

function restartGame(){
const reset = document.querySelectorAll('button');
reset.forEach((button) =>{
    button.disabled = false;
})
incorrectGuesses = 0;
correctGuesses = 0;
chooseWord();
replaceUnderscore();
changeScene();
}



function fade(){
    if(opacity < 1){
        opacity += 0.05;
        setTimeout(() => {
            fade();
        }, 50);
    }
    postGame.style.opacity = opacity;
    proceed.style.pointerEvents = 'auto';
}

disclaimerButton.addEventListener('click', ()=>{
    disclaimer.style.opacity = '0';
    disclaimerButton.style.pointerEvents = 'none';
    lightbox.classList.remove('active');
});

proceed.addEventListener('click', ()=>{
    postGame.style.opacity = '0';
    proceed.style.pointerEvents = 'none';
    lightbox.classList.remove('active');
    opacity = 0;
    restartGame();
});



const game01 = new Game();
