const words = ["Romantisme", "Jeppe på bjerget", "Biedermeier", "Schack von Staffeldt"];

const word = words[Math.floor(Math.random() * words.length)];
let lives = 7;

const wordHolder = document.getElementById("word");
const wrongWords = document.getElementById("wrong");
const image = document.getElementById("state");
const guessHolder = document.getElementById("userInput");
const guessed = [];

const chars = [];

guessHolder.addEventListener('input', function(event) {
    this.value = this.value.replace(/[^a-zA-ZæøåÆØÅ\s]/g, '');
    if (this.value.length > 1) {
        this.value = this.value[this.value.length - 1]
    }
});
document.addEventListener("keydown", function(event) {
    if (document.activeElement !== guessHolder) {
        guessHolder.focus();
    }
    if (event.key === "Enter" && guessHolder.disabled !== true) {checkLetter();}
});


function checkLetter() {
    input = guessHolder.value.toLowerCase();
    if (input === "" || input === " ") {guessHolder.value = ""; return;}
    const checkWord = word.toLowerCase()
    if (checkWord.includes(input) && !guessed.includes(input)) {
        const indexes = [];
        let idx = checkWord.indexOf(input);
        while (idx !== -1) {
            indexes.push(idx);
            idx = checkWord.indexOf(input, idx + 1);
        }
        for (const index of indexes) {
            chars[indexTranslate(checkWord, index)].value = word[index];
        }
        guessed.push(input);
    } else if (guessed.includes(input)) {
        // ingeting sker
    } else if (!checkWord.includes(input)) { // possibly cycle through images with lives.
        lives -= 1;
        image.src = `Billeder/${8 - lives}.jpg`;
        if (lives == 0) {guessHolder.disabled = true; return;}
        const newWord = document.createElement("span");
        newWord.classList.add("wrongWord");
        newWord.textContent = input;
        wrongWords.appendChild(newWord);
        guessed.push(input);
    }
    guessHolder.value = "";
}


const checkButton = document.getElementById("checker");
checkButton.addEventListener("click", checkLetter)


function indexTranslate(word, index) {
    let c = 0;
    let i = 0;
    while (i < index) {
        if (word[i] !== " ") {c += 1;}
        i += 1;
    }
    return c
}



for (const char of word) {
    if (char != " ") {
        const charPlace = document.createElement("input");
        charPlace.classList.add("character");
        chars.push(charPlace);
        charPlace.readOnly = true;
        wordHolder.appendChild(charPlace);
    } else {
        const spaceChar = document.createElement("p");
        spaceChar.textContent = " ";
        wordHolder.appendChild(spaceChar);
    }
}