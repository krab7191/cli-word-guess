
//jshint esversion: 6

var Letter = function(char) {
    this.guessed = false;
    this.char = char;
    this.returnChar = function () {
        if (this.guessed) {
            return this.char;
        }
        else {
            return " _ ";
        }
    };
    this.checkChar = function(char) {
        if (!this.guessed) {
            char = char.toLowerCase();
            if (char === this.char) {
                this.guessed = true;
                return this.guessed;
            }
        }
    };
};

module.exports = {
    Letter: Letter
};