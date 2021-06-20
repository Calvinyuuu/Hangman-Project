//link to github    https://github.com/Calvinyuuu/final-project


//global variable declarations
let wordToBeGuessed;
let updateAnswer;
let numberOfLetters;
let words;
let hints;

//grabbing all of the necessary tags in html
const displayHint       = document.getElementById("hint");
const keyboard          = document.getElementById("keyboard");
const underscore        = document.getElementById("underscore");
const scene             = document.getElementById("picture");
const displayErrors     = document.getElementById("errors");
const postGame          = document.getElementById("post_game_screen");
const postGameMessage   = document.getElementById("post_game_placeholder");
const proceed           = document.getElementById("close_button"); 
const displayWord       = document.getElementById("display_word");
const disclaimer        = document.getElementById("disclaimer");
const disclaimerButton  = document.getElementById("disclaimer_close");

//game validation variables
const maxErrors         = 6;
let correctGuesses      = 0;
let incorrectGuesses    = 0;
let opacity             = 0;

//lightbox declaration
const lightbox          = document.createElement('div');
lightbox.id             = 'lightbox';
document.body.appendChild(lightbox);

//main game object + game start constructor
class Game{
    constructor(){
        words = ["osmosis", "change", "forbes", "advance", "incisor", "revolver", "relic", "animate", "notredame", "niagara"];
        hints = ["Movement of liquids from a high concentration to a lower concentration",
                 "To alter or modify", 
                 "American business magazine that features articles on finance, industry, investing, and marketing", 
                 "To move in a purposeful way", 
                 "You share these in common with a dog, a vampire, a bat. No they're not called fangs", 
                 "Cowboys always have these", 
                 "A very old object with historical value", 
                 "To bring a 2D object to life", 
                 "A really old building in Paris", 
                 "A city in Canada that shares something with the US"];
        chooseWord();
        createButtons();
        replaceUnderscore();
        lightbox.classList.add('active');
    }
}

//function to randomly chooses the word to be guessed from the initial constructor
function chooseWord(){
    let chosenWordIndex = Math.floor(Math.random() * words.length)
    wordToBeGuessed = words[chosenWordIndex];
    displayHint.innerHTML = hints[chosenWordIndex];
    updateAnswer = wordToBeGuessed.split('').map(() => '_');
    
}

//applies the keyboard to be used to guess.
function createButtons(){
    let buttons = `abcdefghijklmnopqrstuvwxyz`.split('')

    buttons.forEach(letter =>{
        const buttonContainer = document.createElement('button');
        buttonContainer.innerHTML = letter;
        buttonContainer.addEventListener('click', letterSelected);
        keyboard.appendChild(buttonContainer);
    })
}

//Replaces the randomly chosen word to underscores.
function replaceUnderscore(){
    console.log(updateAnswer);

    numberOfLetters = [];
    for(let i = 0; i < wordToBeGuessed.length; i++){
        numberOfLetters[i] = `${updateAnswer[i]} `;
    };
    underscore.innerHTML = numberOfLetters.join('');
}

/*
This is the main logic made for the game. Whenever a key is clicked, it compares the letter chosen to the word chosen.
If the comparison is correct, it'll return the text to the map and replaces the underscore with that letter. 
If the comparison is incorrect, it'll return the original underscore array and continue on.
This function also changes the displayed picture (like the arms and legs) on an incorrect answer.
Since most of the variables are global, you would be able to call any function to do their work and they'll use the global variables to do so (like replaceUnderscore()).
Finally it will check if the game can continue with isGameValid().
*/
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
    //keeping the console.logs for your convinience.
    console.log(incorrectGuesses + `incorrect`);
    console.log(correctGuesses + `correct`);
    replaceUnderscore();
    isGameValid();
}

//endgame check
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

//changes the main photo
function changeScene(){

    if(incorrectGuesses === 6){
        scene.src = scene.src = `../pictures/mistake_00.png`;
    }else{
        scene.src = `../pictures/mistake_0${incorrectGuesses}.png`;
        displayErrors.innerHTML = `Incorrect Guesses ${incorrectGuesses}/6`;
    }
}

//win condition
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
//lose condition
function loseGame(){
    /*
    needed to override because the positioning of one picture is different than the other. To be honest I'm just lazy creating another sprite but this works so...
    I also wanted to add a creepy factor with having the win con be happy, yet if you lose it would be a little more dark.
    */
    displayWord.style.color =`red`;
    postGame.style.backgroundSize = 'auto';

    postGameMessage.innerHTML = `You lost!`
    postGame.style.backgroundImage = 'url(../pictures/lose_screen.png)';
    lightbox.classList.add('active');
    displayWord.innerHTML = `Your word was ${wordToBeGuessed}`
    fade();
}

//restarts the entire game without calling a new object. 
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

//main animation for the popup screen.
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

//closes the disclaimer
disclaimerButton.addEventListener('click', ()=>{
    disclaimer.style.opacity = '0';
    disclaimer.style.pointerEvents = 'none';
    lightbox.classList.remove('active');
});

//closes the win/lose screen.
proceed.addEventListener('click', ()=>{
    postGame.style.opacity = '0';
    proceed.style.pointerEvents = 'none';
    lightbox.classList.remove('active');
    opacity = 0;
    restartGame();
});


//creating the new object after everything is loaded.
const game01 = new Game();
