//jshint esversion: 6

var iq = require("inquirer");
var word = require("./Word.js");

var wordArr = ["jinxed", "waxwing", "whiffing", "foxes", "kookiest", "yammering", "jiffs", "cuffing", "vivaing", "quipping"];
var guesses = 0;
var alreadyGuessed = [];
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
        if (ans.guess.length === 1) {
            var contains = false;
            alreadyGuessed.forEach(function (i) {
                if (i === ans.guess) {
                    contains = true;
                }
            });
            if (contains) {
                console.log("You already guessed that!");
                promptGuess();
            }
            else {
                alreadyGuessed.push(ans.guess);
                var lettersGuessed = "";
                alreadyGuessed.forEach(function(i) {
                    lettersGuessed += i + ", ";
                });
                console.log(`Letters guessed: ${lettersGuessed}`);
                var hit = theWord.guessChar(ans.guess);
                console.log(theWord.returnWordString() + "\n");
                if (theWord.numGuessed == theWord.letterArr.length) {
                    console.log("You win!!");
                }
                else {
                    if (!hit) {
                        guesses++;
                    }
                    console.log(`Guesses left: ${(6 - guesses)}`);
                    if (guesses === 6) {
                        theWord.letterArr.forEach(function (i) {
                            i.guessed = true;
                        });
                        console.log(`The word was ${theWord.returnWordString()}`);
                        console.log("Game over...");
                    }
                    else {
                        promptGuess();
                    }
                }
            }
        }
        else {
            console.log("Please guess only one character at a time.");
            promptGuess();
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