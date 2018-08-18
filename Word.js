
//jshint esversion: 6

var letter = require("./Letter.js");

var Word = function (word) {
    this.letterArr = [];
    this.numGuessed = 0;
    for (var i = 0; i < word.length; i++) {
        this.letterArr.push(new letter.Letter(word[i]));
    }
    this.returnWordString = function () {
        var wordString = "";
        var len = this.letterArr.length;
        this.letterArr.forEach(function (i) {
            wordString += i.returnChar() + " ";
        });
        return wordString;
    };
    this.guessChar = function (char) {
        var addGuesses = 0;
        this.letterArr.forEach(function (i) {
            var guessed = i.checkChar(char);
            if (guessed) {
                addGuesses++;
            }
        });
        this.numGuessed += addGuesses;
        if (addGuesses > 0) {
            return true;
        }
    };
};

module.exports = {
    Word: Word
};