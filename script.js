let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'Cross';


function init() {
    render();
}

function render() {
    const gamefield = document.getElementById('gamefield');
    gamefield.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j; //hier wird ausgerechnet in welchem Feld wir sind, um den richtigen Feld zu laden

            if (fields[index] === 'Circle') {
                cell.textContent = 'O';
            } else if (fields[index] === 'Cross') {
                cell.textContent = 'X';
            }else {
                cell.addEventListener('click', () => clickOnField(index));
            }

            row.appendChild(cell);
        }
        gamefield.appendChild(row);
    }
}

function clickOnField(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        render();
        if (checkWinner()) {
            alert(currentPlayer + ' has won!');
            resetGame();
            init();
        }
        currentPlayer = currentPlayer === 'Cross' ? 'Circle' : 'Cross';
    }
}

function checkWinner() {
    // Überprüfe horizontale und vertikale Reihen
    for (let i = 0; i < 3; i++) {
        if (
            fields[i * 3] === currentPlayer &&
            fields[i * 3 + 1] === currentPlayer &&
            fields[i * 3 + 2] === currentPlayer
        ) {
            return true; // Horizontale Gewinnreihe
        }
        if (
            fields[i] === currentPlayer &&
            fields[i + 3] === currentPlayer &&
            fields[i + 6] === currentPlayer
        ) {
            return true; // Vertikale Gewinnreihe
        }
    }

    // Überprüfe diagonale Reihen
    if (
        fields[0] === currentPlayer &&
        fields[4] === currentPlayer &&
        fields[8] === currentPlayer
    ) {
        return true; // Diagonale von links oben nach rechts unten
    }
    if (
        fields[2] === currentPlayer &&
        fields[4] === currentPlayer &&
        fields[6] === currentPlayer
    ) {
        return true; // Diagonale von rechts oben nach links unten
    }

    return false;
}

function resetGame() {
    fields = Array(9).fill(null);
}