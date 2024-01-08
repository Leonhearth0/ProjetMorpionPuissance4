/* #region Var-Const Morpion*/

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayerTurn = 'X';
let cells = document.querySelectorAll('.gameCell');
let turnNumber = 0;
let singlePlayer = true;
let userWaitCPU = false;
const restartButton = document.getElementById('restartButton')
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*Var-Const Morpion end*/

/* #region Var-Const P4*/

let p4GameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]
let p4PlayerTurn = "X";
let p4turnNumber = 0;
let p4SinglePlayer = true;
let p4Cells = document.querySelectorAll('.p4gameCell');
let columnNumber = 0;
let userWaitp4CPU = false;
const p4ColumnCount = 7;
const p4restartButton = document.getElementById('p4restartButton');
const winConditionArray = [
    [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];
document.getElementById('p4turnIndicator').textContent = `Au tour du joueur ${p4PlayerTurn}.`;
/* #endregion Var-Const P4 End*/

/* #region Fonctions des boutons*/
document.getElementById('pvpbutton').addEventListener('click', function () {
    singlePlayer = false;
    document.getElementById('gameChoice').style.display = 'none'
    document.getElementById('tictactoegameContainer').style.display = 'flex';
})
document.getElementById('cpubutton').addEventListener('click', function () {
    document.getElementById('gameChoice').style.display = 'none'
    document.getElementById('tictactoegameContainer').style.display = 'flex';
})
document.getElementById('p4vpbutton').addEventListener('click', function () {
    p4SinglePlayer = false;
    document.getElementById('gameChoice').style.display = 'none'
    document.getElementById('p4gameContainer').style.display = 'flex';
})
document.getElementById('p4button').addEventListener('click', function () {
    document.getElementById('gameChoice').style.display = 'none'
    document.getElementById('p4gameContainer').style.display = 'flex';
})

document.getElementById('turnIndicator').textContent = `Au tour du joueur ${currentPlayerTurn}.`;
/* #endregion */

/* #region Fonctions génériques */
function colorchange() {
    cells.forEach((cell) => {
        if (cell.textContent === 'X') {
            cell.classList.add('red-x');
        } else if (cell.textContent === "O") {
            cell.classList.add('blue-o');
        }
    });

    p4Cells.forEach((cellJ) => {
        if (cellJ.textContent === 'X') {
            cellJ.classList.add('red-x');
        } else if (cellJ.textContent === "O") {
            cellJ.classList.add('blue-o');
        }
    });
}

function resetcolors(){
    cells.forEach((cell) => {
        cell.classList.remove('red-x', 'blue-o')
    });

    p4Cells.forEach((cellJ) => {
        cellJ.classList.remove('red-x', 'blue-o')
    })
}
/* #endregion Fonction générique */

/* #region Fonctionnalités Morpion*/
cells.forEach((cell, index) => {
    cell.addEventListener('click', function () {
        if (userWaitCPU) {
            return
        }
        if (gameState[index] === '' && !isGameOver()) {
            gameState[index] = currentPlayerTurn;
            cell.textContent = currentPlayerTurn;
            currentPlayerTurn = currentPlayerTurn === 'X' ? 'O' : 'X';
            colorchange();
            document.getElementById('turnIndicator').textContent = `Au tour du joueur ${currentPlayerTurn}.`;
            turnNumber++
        }
        if (!isGameOver() && currentPlayerTurn === 'O' && singlePlayer == true) {
            userWaitCPU = true;
            timeoutId = setTimeout(() => {
                makeCPUMove();
                userWaitCPU = false;
                colorchange();
            }, 1500);
        }
        if (turnNumber == 9) {
            document.getElementById('turnIndicator').textContent = "Match nul";
            document.getElementById('restartButton').style.display = 'flex';
        }
        if (isGameOver()) {
            document.getElementById('turnIndicator').textContent = `Le joueur ${currentPlayerTurn === 'X' ? 'O' : 'X'} gagne.`;
            document.getElementById('restartButton').style.display = 'flex';
        }

    });
});

function isGameOver() {
    for (let i = 0; i < winningCombo.length; i++) {
        const [a, b, c] = winningCombo[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }

    return false;
}

restartButton.addEventListener('click', restartGame)

function makeCPUMove() {
    let emptyCells = gameState.reduce(function (accumulator, currentValue, cellIndex) {
        if (currentValue === "") {
            accumulator.push(cellIndex);
        }
        return accumulator;
    }, []);


    if (emptyCells.length > 0) {
        let cpuMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[cpuMove] = "O";
        cells[cpuMove].textContent = "O";
        currentPlayerTurn = "X";
        document.getElementById('turnIndicator').textContent = `Au tour du joueur ${currentPlayerTurn}.`;
        turnNumber++
    }
}


function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayerTurn = 'X';
    document.getElementById('turnIndicator').textContent = `Au tour du joueur ${currentPlayerTurn}.`;
    turnNumber = 0;
    cells.forEach(cell => cell.textContent = '');
    document.getElementById('restartButton').style.display = 'none';
    resetcolors();
}

/*  #endregion Fonctionnalités Morpion fin*/

/* #region Fonctionnalités Puissance 4*/
p4Cells.forEach((cellJ, indexJ) => {
    cellJ.addEventListener('click', function () {
        if (userWaitp4CPU) {
            return
        }
        if (!isGameEnd()) {
            columnNumber = indexJ % p4ColumnCount;
            console.log(columnNumber)
        }
        if (p4GameState[indexJ] === '' && !isGameEnd()) {
            gravity(indexJ)
            p4PlayerTurn = p4PlayerTurn === 'X' ? 'O' : 'X';
            document.getElementById('p4turnIndicator').textContent = `Au tour du joueur ${p4PlayerTurn}.`;
            colorchange();
            p4turnNumber++
        }
        if (!isGameEnd() && p4PlayerTurn === 'O' && p4SinglePlayer == true) {
            userWaitp4CPU = true;
            setTimeout(() => {
                p4CPUMove();
                userWaitp4CPU = false;
                colorchange();
            }, 1500);

        }
        if (p4turnNumber == 42) {
            document.getElementById('p4turnIndicator').textContent = "Match nul";
            document.getElementById('p4restartButton').style.display = 'flex';
        }
        if (isGameEnd()) {
            document.getElementById('p4turnIndicator').textContent = `Le joueur ${p4PlayerTurn === 'X' ? 'O' : 'X'} gagne.`;
            document.getElementById('p4restartButton').style.display = 'flex';
        }
        if (cellJ.textContent === 'X') {
            cellJ.classList.add('red-x')
        } else if (cellJ.textContent === "O") {
            cellJ.classList.add('blue-o')
        }

    });
});

function gravity(indexcell) {
    for (let i = indexcell; i < p4GameState.length; i = i + 7) {
        if (p4GameState[i] == "") {
            p4GameState[i] = p4PlayerTurn
            p4Cells[i].textContent = p4PlayerTurn
            if (p4GameState[i - 7]) {
                p4GameState[i - 7] = ""
                p4Cells[i - 7].textContent = ""
            }
        }
    }
}

function isGameEnd() {
    for (let j = 0; j < winConditionArray.length; j++) {
        const [a, b, c, d] = winConditionArray[j];
        if (p4GameState[a] && p4GameState[a] === p4GameState[b] && p4GameState[a] === p4GameState[c] && p4GameState[a] === p4GameState[d]) {
            return true;
        }
    }
    return false;
}

p4restartButton.addEventListener('click', restartp4Game)

function p4CPUMove() {
    let emptyp4Cells = p4GameState.reduce(function (accumulator, currentValue, cellIndex) {
        if (currentValue === "") {
            accumulator.push(cellIndex);
        }
        return accumulator;
    }, []);

    if (emptyp4Cells.length > 0) {
        let cpup4Move = emptyp4Cells[Math.floor(Math.random() * emptyp4Cells.length)];
        gravity(cpup4Move)
        p4PlayerTurn = "X";
        document.getElementById('p4turnIndicator').textContent = `Au tour du joueur ${p4PlayerTurn}.`
        p4turnNumber++
    }
}

function restartp4Game() {
    p4GameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",];
    p4PlayerTurn = "X";
    document.getElementById('p4turnIndicator').textContent = `Au tour du joueur ${p4PlayerTurn}.`
    p4turnNumber = 0;
    p4Cells.forEach(cellp4 => cellp4.textContent = '')
    document.getElementById('p4restartButton').style.display = 'none';
    resetcolors();
}

/* #endregion Fin Fonctionnalités Puissance 4*/