

function getLoremIpsum(wordsCount) {
    var sentence = ''
    for (var i = 0; i < wordsCount; i++) {
        sentence += getWord() + ' '
    }
    return sentence
}
function getWord() {
    var word = '';
    var wordLength = getRandomInteger(2,8);
    for (var i = 0; i < wordLength; i++) {
        word += getChar()
    }
    return word
}

function getChar() {
    var ltrString = 'abcdefghijklmnopqrstuvwxyz';
    var rand = Math.random();
    var randIndex = Math.round(rand * ltrString.length);
    return ltrString.charAt(randIndex);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
