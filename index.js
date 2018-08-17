//jshint esversion: 6

var iq = require("inquirer");
var word = require("./Word.js");

var wordArr = ["jinxed", "waxwing", "whiffing", "foxes", "kookiest", "yammering", "jiffs", "cuffing", "vivaing", "quipping"];
var guesses = 0;
var incorrect = [];
var theWord;

function pickWord(list) {
    var word = list[Math.floor(Math.random() * list.length)];
    return word;
}

function promptGuess() {
    iq.prompt([
        {
            message: "Enter your guess",
            name: "guess"
        }
    ]).then(function (ans) {
        theWord.guessChar(ans.guess);
        console.log(theWord.returnWordString() + "\n");
        if (theWord.numGuessed == theWord.letterArr.length) {
            console.log("You win!!");
        }
        else {
            guesses++;
            console.log(`Guesses left: ${(6 - guesses)}`);
            if (guesses === 6) {
                theWord.letterArr.forEach(function(i) {
                    i.guessed = true;
                });
                console.log(`The word was ${theWord.returnWordString()}`);
                console.log("Game over...");
            }
            else {
                promptGuess();
            }
        }
    });
}

function init() {
    console.log("Welcome to the CLI word guess game! Getting a random word...");
    theWord = new word.Word(pickWord(wordArr));
    console.log(theWord.returnWordString() + "\n");
    promptGuess();
}

init();