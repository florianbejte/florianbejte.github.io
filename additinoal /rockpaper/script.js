const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const winningMoves = {
    'scissors': ['paper', 'lizard'],
    'paper': ['rock', 'spock'],
    'rock': ['lizard', 'scissors'],
    'lizard': ['spock', 'paper'],
    'spock': ['scissors', 'rock']
};

const winningVerbs = {
    'scissors-paper': 'cuts',
    'paper-rock': 'covers',
    'rock-lizard': 'crushes',
    'lizard-spock': 'poisons',
    'spock-scissors': 'smashes',
    'scissors-lizard': 'decapitates',
    'lizard-paper': 'eats',
    'paper-spock': 'disproves',
    'spock-rock': 'vaporizes',
    'rock-scissors': 'crushes'
};

let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const resultText = document.getElementById('resultText');
    const reasonText = document.getElementById('reasonText');
    const scoreText = document.getElementById('score');
    const computerMoveText = document.getElementById('computerChoice');

    // Reset styles
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('selected', 'computer');
    });

    // Highlight selections
    document.getElementById(playerSelection).classList.add('selected');
    // Note: Computer button might not exist if we don't render all buttons for computer, 
    // but we can just show text. If we want to highlight computer's move on the same buttons, 
    // it might be confusing if they are the same.
    // Let's just show the text for computer.

    computerMoveText.textContent = `Computer chose: ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`;

    if (playerSelection === computerSelection) {
        resultText.textContent = "It's a Tie!";
        resultText.style.color = '#555';
        reasonText.textContent = "";
    } else if (winningMoves[playerSelection].includes(computerSelection)) {
        playerScore++;
        resultText.textContent = "You Win!";
        resultText.style.color = '#28a745';
        const verb = winningVerbs[`${playerSelection}-${computerSelection}`];
        reasonText.textContent = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} ${verb} ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`;
    } else {
        computerScore++;
        resultText.textContent = "You Lose!";
        resultText.style.color = '#dc3545';
        const verb = winningVerbs[`${computerSelection}-${playerSelection}`];
        reasonText.textContent = `${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)} ${verb} ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`;
    }

    scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('score').textContent = "Player: 0 | Computer: 0";
    document.getElementById('resultText').textContent = "Choose your weapon!";
    document.getElementById('resultText').style.color = '#333';
    document.getElementById('reasonText').textContent = "";
    document.getElementById('computerChoice').textContent = "";
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('selected', 'computer');
    });
}
