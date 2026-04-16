const exampleCells = document.getElementsByClassName("example");    // voorbeeld
const throwDice = document.getElementById("throw");
const inputsScoreBoard = document.querySelectorAll(".results");
const inputsScoresGameOne = document.querySelectorAll(".resultsGameOne");
const inputTotalScoreGameOne = document.querySelector(".resultTotalScore");
const inputBonusScoreGameOne = document.querySelector(".resultBonusScore");
const inputTotalPlusBonusGameOne = document.querySelectorAll(".resultTotalPlusBonus");
const inputThreeOfAKind = document.querySelector(".threeOfAKind");
const inputFourOfAKind = document.querySelector(".fourOfAKind");
const inputFullHouse = document.querySelector(".fullHouse");
const inputSmallStreet = document.querySelector(".smallStreet");
const inputBigStreet = document.querySelector(".bigStreet");
const inputSuperScore = document.querySelector(".superScore");
const inputChance = document.querySelector(".chanceScore");
const inputTotalScorePartTwo = document.querySelector(".totalGameTwo");
const inputTotalBothGames = document.querySelector(".totalBothGames");
const diceCount = 5;
const diceScores = [];
const diceSpotsCounter = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};
let totalAmount = 0;


throwDice.addEventListener("click", () => {
    resetAllValues();
    rollDice();
    countsTheDiceSpots();
    sumUpSameSpots();
    connectToHTML();
});

// SELF INVOKING FUNCTION - VOORBEELD:

(() => {
    for(let i=0; i<exampleCells.length; i++) {
        exampleCells[i].innerHTML = diceSpotsCounter[i+1];      // <-- VOORBEELD - array aangeroepen in array
    }                                                           // [i+1] = in diceSpotsCounter schuift bij elke iteratie 1 op
})();

function resetAllValues() {
    totalAmount = 0;
}

function connectToHTML() {
    inputTotalScoreGameOne.value = sumUpTotalScore();
    inputBonusScoreGameOne.value = calculateBonusScore();
    let totalPlusBonus = sumUpTotalPlusBonus();

    inputTotalPlusBonusGameOne.forEach(input => {
        input.value = totalPlusBonus;
    });

    inputTotalScorePartTwo.value = totalScorePartTwo();
    inputThreeOfAKind.value = ofAKind(3);
    inputFourOfAKind.value = ofAKind(4);
    inputFullHouse.value = fullHouse();
    inputSmallStreet.value = bigOrSmallStreet(4);
    inputBigStreet.value = bigOrSmallStreet(5);
    inputSuperScore.value = superScore();
    inputChance.value = calculateChance();
    inputTotalBothGames.value = totalBothGames();
}

function rollDice() {
    for (let i = 0; i < diceCount; i++) {
        diceScores[i] = Math.floor(Math.random() * 6) + 1;
    }
    
    for (let i = 0; i < diceScores.length; i++) {
        inputsScoreBoard[i].innerHTML = diceScores[i];
    }
}

function countsTheDiceSpots() {
    for (let spot in diceSpotsCounter) {
        diceSpotsCounter[spot] = 0;
    }
    for (let i = 0; i < diceScores.length; i++) {
        let value = diceScores[i];
        diceSpotsCounter[value]++;
    }
}

function sumUpSameSpots() { 
    for (let i = 1; i <= 6; i++) {
        let amount = diceSpotsCounter[i];
        let score = amount * i;
        inputsScoresGameOne[i - 1].value = score;
    }
}

function sumUpTotalScore() {    
    let sum = 0;
    
    for (let i = 0; i < diceScores.length; i++) {
        sum += diceScores[i];   
    }
    return sum;
}

function calculateBonusScore() {
    let sum = 0;

    for (let i = 0; i < diceScores.length; i++) {
        sum += diceScores[i];

        if (sum >= 25) {
            return 35;
        }
    }
    return 0;
}

function sumUpTotalPlusBonus() {
    let sum = 0;

    sum += sumUpTotalScore();
    sum += calculateBonusScore();

    return sum;
}

function ofAKind(ofAKindAmount) {
    for (let diceAmount in diceSpotsCounter) {
        if (diceSpotsCounter[diceAmount] >= ofAKindAmount) {
            let sum = 0;
            for (let i = 0; i < diceScores.length; i++) {
                sum += diceScores[i];
            }
            return sum;
        }
    }
    return 0;
}

function fullHouse() {
    let hasThree = false;
    let hasTwo = false;

    for (let diceAmount in diceSpotsCounter) {
        if (diceSpotsCounter[diceAmount] === 3) {
            hasThree = true;
        }
        if (diceSpotsCounter[diceAmount] === 2) {
            hasTwo = true;
        }
    }

    if (hasThree && hasTwo) {
        return 25;
    }

    return 0;
}

function bigOrSmallStreet(whichStreet) {
    let values = Object.values(diceSpotsCounter);
    let joinedValues = values.join('');
    let splitValues = joinedValues.split('0');
    let valueLengths = splitValues.map(seq => seq.length);
    let maxLength = Math.max(...valueLengths);

    if (maxLength >= whichStreet) {
        return whichStreet === 5 ? 40 : 30;
    }

    return 0;
}

function superScore() {
    if (Object.values(diceSpotsCounter).includes(5)) {
        return 50;
    }

    return 0;
}

function calculateChance() {    
    let sum = diceScores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum;
    }


function totalScorePartTwo() {
    let totalScoreTwo = 0;

    totalScoreTwo += ofAKind(3);
    totalScoreTwo += ofAKind(4);
    totalScoreTwo += fullHouse();
    totalScoreTwo += bigOrSmallStreet(5);
    totalScoreTwo += bigOrSmallStreet(4);
    totalScoreTwo += superScore();
    totalScoreTwo += sumUpTotalScore();

    return totalScoreTwo;
}

function totalBothGames() {
    let totalScoreBothGames = 0;

    totalScoreBothGames += sumUpTotalPlusBonus();
    totalScoreBothGames += totalScorePartTwo();

    return totalScoreBothGames;
}