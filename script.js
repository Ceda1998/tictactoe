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
            const index = i * 3 + j;

            if (fields[index] === 'circle' || fields[index] === 'cross') {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 0 100 100");
                svg.setAttribute("width", "100");
                svg.setAttribute("height", "100");

                const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
                shape.setAttribute("d", fields[index] === 'circle' ? "M50,10 A40,40 0 1,0 50,90 A40,40 0 1,0 50,10" : "M20,20 L80,80 M20,80 L80,20");
                shape.setAttribute("stroke", fields[index] === 'circle' ? "lightcoral" : "yellow");
                shape.setAttribute("stroke-width", "8");
                shape.setAttribute("fill", "transparent"); 
                svg.appendChild(shape);

                cell.appendChild(svg);
            } else {
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
            alert(currentPlayer === 'cross' ? 'cross' : 'Circle' + ' has won!');
            resetGame();
        }else if (isBoardFull()) {
            alert('Unentschieden!');
            resetGame();
        } 
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
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
    currentPlayer = 'cross';
    render();
}
function isBoardFull() {
    return fields.every(field => field !== null);
}