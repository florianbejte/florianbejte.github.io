/**
 * Custom JavaScript for Portfolio Website
 * Author: Florian Bejte
 */

// Validation state tracker
let validationState = {
  name: false,
  surname: false,
  email: false,
  phone: false,
  address: false,
  rating1: true,
  rating2: true,
  rating3: true
};

document.addEventListener('DOMContentLoaded', function() {
  initializeContactForm();
});


function initializeContactForm() {
  const contactForm = document.querySelector('.php-email-form');
  
  if (!contactForm) {
    console.log('Contact form not found on this page');
    return;
  }


  contactForm.addEventListener('submit', handleFormSubmit);
  

  initializeRealtimeValidation();
  
  
  initializePhoneMasking();
  
  updateSubmitButtonState();
}


function initializeRealtimeValidation() {
  const nameInput = document.querySelector('[name="name"]');
  const surnameInput = document.querySelector('[name="surname"]');
  const emailInput = document.querySelector('[name="email"]');
  const phoneInput = document.querySelector('[name="phone"]');
  const addressInput = document.querySelector('[name="address"]');
  
  if (!nameInput || !surnameInput || !emailInput || !phoneInput || !addressInput) {
    console.error('Some form fields not found');
    return;
  }
  

  nameInput.addEventListener('input', () => validateName(nameInput));
  nameInput.addEventListener('blur', () => validateName(nameInput));
  
  surnameInput.addEventListener('input', () => validateSurname(surnameInput));
  surnameInput.addEventListener('blur', () => validateSurname(surnameInput));
  
  emailInput.addEventListener('input', () => validateEmail(emailInput));
  emailInput.addEventListener('blur', () => validateEmail(emailInput));
  
  addressInput.addEventListener('input', () => validateAddress(addressInput));
  addressInput.addEventListener('blur', () => validateAddress(addressInput));
  
  
}

function validateName(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById('name-error');
  
  // Check if empty
  if (value === '') {
    showError(input, errorElement, 'Name is required');
    validationState.name = false;
    updateSubmitButtonState();
    return false;
  }
  
  const letterPattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  if (!letterPattern.test(value)) {
    showError(input, errorElement, 'Name must contain only letters');
    validationState.name = false;
    updateSubmitButtonState();
    return false;
  }
  
  if (value.length < 2) {
    showError(input, errorElement, 'Name must be at least 2 characters');
    validationState.name = false;
    updateSubmitButtonState();
    return false;
  }
  
  hideError(input, errorElement);
  validationState.name = true;
  updateSubmitButtonState();
  return true;
}

function validateSurname(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById('surname-error');
  
  if (value === '') {
    showError(input, errorElement, 'Surname is required');
    validationState.surname = false;
    updateSubmitButtonState();
    return false;
  }
  
  const letterPattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  if (!letterPattern.test(value)) {
    showError(input, errorElement, 'Surname must contain only letters');
    validationState.surname = false;
    updateSubmitButtonState();
    return false;
  }
  
  if (value.length < 2) {
    showError(input, errorElement, 'Surname must be at least 2 characters');
    validationState.surname = false;
    updateSubmitButtonState();
    return false;
  }
  
  hideError(input, errorElement);
  validationState.surname = true;
  updateSubmitButtonState();
  return true;
}

function validateEmail(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById('email-error');
  
  if (value === '') {
    showError(input, errorElement, 'Email is required');
    validationState.email = false;
    updateSubmitButtonState();
    return false;
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    showError(input, errorElement, 'Please enter a valid email address');
    validationState.email = false;
    updateSubmitButtonState();
    return false;
  }
  
  hideError(input, errorElement);
  validationState.email = true;
  updateSubmitButtonState();
  return true;
}

function validateAddress(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById('address-error');
  
  if (value === '') {
    showError(input, errorElement, 'Address is required');
    validationState.address = false;
    updateSubmitButtonState();
    return false;
  }
  
  if (value.length < 5) {
    showError(input, errorElement, 'Address must be at least 5 characters');
    validationState.address = false;
    updateSubmitButtonState();
    return false;
  }
  
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  
  if (!hasLetter) {
    showError(input, errorElement, 'Address must contain letters');
    validationState.address = false;
    updateSubmitButtonState();
    return false;
  }
  
  if (!hasNumber) {
    showError(input, errorElement, 'Address should contain a number');
    validationState.address = false;
    updateSubmitButtonState();
    return false;
  }
  
  hideError(input, errorElement);
  validationState.address = true;
  updateSubmitButtonState();
  return true;
}

function initializePhoneMasking() {
  const phoneInput = document.querySelector('[name="phone"]');
  const errorElement = document.getElementById('phone-error');
  
  if (!phoneInput) {
    return;
  }
  
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value;
    
    let digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length === 0) {
      e.target.value = '';
      validationState.phone = false;
      updateSubmitButtonState();
      return;
    }
    
    if (!digitsOnly.startsWith('370')) {
      if (digitsOnly.startsWith('370')) {
      } else if (digitsOnly.startsWith('70')) {
        digitsOnly = '3' + digitsOnly;
      } else if (digitsOnly.startsWith('0')) {
        digitsOnly = '37' + digitsOnly;
      } else if (digitsOnly.length > 0) {
        digitsOnly = '370' + digitsOnly;
      }
    }
    
    digitsOnly = digitsOnly.substring(0, 11);
    
    let formatted = '';
    if (digitsOnly.length > 0) {
      formatted = '+' + digitsOnly.substring(0, 3);
      if (digitsOnly.length > 3) {
        formatted += ' ' + digitsOnly.substring(3, 6);
      }
      if (digitsOnly.length > 6) {
        formatted += ' ' + digitsOnly.substring(6, 11);
      }
    }
    
    e.target.value = formatted;
    
    if (digitsOnly.length < 11) {
      showError(phoneInput, errorElement, 'Phone number must be 11 digits (+370 XXX XXXXX)');
      validationState.phone = false;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('370')) {
      hideError(phoneInput, errorElement);
      validationState.phone = true;
    } else {
      showError(phoneInput, errorElement, 'Invalid Lithuanian phone number format');
      validationState.phone = false;
    }
    
    updateSubmitButtonState();
  });
  
  phoneInput.addEventListener('blur', function() {
    const value = phoneInput.value;
    const digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length === 0) {
      showError(phoneInput, errorElement, 'Phone number is required');
      validationState.phone = false;
      updateSubmitButtonState();
    }
  });
}

function showError(input, errorElement, message) {
  if (!errorElement) return;
  
  input.classList.add('input-error');
  input.classList.remove('input-valid');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function hideError(input, errorElement) {
  if (!errorElement) return;
  
  input.classList.remove('input-error');
  input.classList.add('input-valid');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

function updateSubmitButtonState() {
  const submitButton = document.querySelector('.php-email-form button[type="submit"]');
  
  if (!submitButton) return;
  
  const allValid = Object.values(validationState).every(state => state === true);
  
  if (allValid) {
    submitButton.disabled = false;
    submitButton.classList.remove('btn-disabled');
    submitButton.classList.add('btn-enabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('btn-disabled');
    submitButton.classList.remove('btn-enabled');
  }
}

function handleFormSubmit(event) {
 
  event.preventDefault();
  
  const formData = collectFormData(event.target);
  
  if (!validateFormData(formData)) {
    showErrorMessage('Please fill in all required fields correctly.');
    return;
  }
  
  console.log('Form Data:', formData);
  
  const averageRating = calculateAverageRating(formData);
  
  displayFormResults(formData, averageRating);
  
  showSuccessPopup();
  
  // event.target.reset();
}

function collectFormData(form) {
  return {
    name: form.querySelector('[name="name"]').value.trim(),
    surname: form.querySelector('[name="surname"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    phone: form.querySelector('[name="phone"]').value.trim(),
    address: form.querySelector('[name="address"]').value.trim(),
    rating1: parseInt(form.querySelector('[name="rating1"]').value) || 0,
    rating2: parseInt(form.querySelector('[name="rating2"]').value) || 0,
    rating3: parseInt(form.querySelector('[name="rating3"]').value) || 0
  };
}

function validateFormData(data) {
  if (!data.name || !data.surname || !data.email || !data.phone || !data.address) {
    return false;
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    return false;
  }
  
  if (data.rating1 < 1 || data.rating1 > 10 ||
      data.rating2 < 1 || data.rating2 > 10 ||
      data.rating3 < 1 || data.rating3 > 10) {
    return false;
  }
  
  return true;
}

function calculateAverageRating(data) {
  const sum = data.rating1 + data.rating2 + data.rating3;
  const average = sum / 3;
  return Math.round(average * 10) / 10;
}

function getRatingColor(rating) {
  if (rating >= 0 && rating < 4) {
    return '#e74c3c';
  } else if (rating >= 4 && rating < 7) {
    return '#f39c12';
  } else if (rating >= 7 && rating <= 10) {
    return '#27ae60';
  }
  return '#333';
}

function displayFormResults(data, average) {
  let resultsContainer = document.getElementById('form-results');
  
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'form-results';
    resultsContainer.className = 'form-results';
    
    const form = document.querySelector('.php-email-form');
    form.parentNode.insertBefore(resultsContainer, form.nextSibling);
  }
  
  const ratingColor = getRatingColor(average);
  
  const resultsHTML = `
    <div class="results-content">
      <h4>Form Submission Results</h4>
      <div class="results-data">
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Surname:</strong> ${escapeHtml(data.surname)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone number:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Address:</strong> ${escapeHtml(data.address)}</p>
        <p><strong>Rating 1 (Quality of Service):</strong> ${data.rating1}/10</p>
        <p><strong>Rating 2 (User Experience):</strong> ${data.rating2}/10</p>
        <p><strong>Rating 3 (Overall Satisfaction):</strong> ${data.rating3}/10</p>
      </div>
      <div class="average-rating">
        <p><strong>${escapeHtml(data.name)} ${escapeHtml(data.surname)}:</strong> 
          <span class="rating-value" style="color: ${ratingColor}; font-weight: bold; font-size: 1.2em;">
            ${average}
          </span>
        </p>
      </div>
    </div>
  `;
  
  resultsContainer.innerHTML = resultsHTML;
  
  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showSuccessPopup() {
  const popup = document.createElement('div');
  popup.className = 'success-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-icon">
        <i class="bi bi-check-circle-fill"></i>
      </div>
      <h3>Success!</h3>
      <p>Form submitted successfully!</p>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }, 3000);
}

function showErrorMessage(message) {
  const errorDiv = document.querySelector('.php-email-form .error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  } else {
    alert(message);
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}


function updateRatingDisplay() {
  const ratingInputs = document.querySelectorAll('input[type="range"][name^="rating"]');
  
  ratingInputs.forEach(input => {
    const display = document.getElementById(input.name + '-value');
    if (display) {
      input.addEventListener('input', function() {
        display.textContent = this.value;
      });
    }
  });
}
    
document.addEventListener('DOMContentLoaded', updateRatingDisplay);

/*--------------------------------------------------------------
# Memory Game - Flip Card Game
--------------------------------------------------------------*/

// Memory Game Data - At least 6 unique items (icons from Bootstrap Icons)
const memoryGameData = [
  { id: 1, icon: '🚀', name: 'rocket' },
  { id: 2, icon: '💻', name: 'laptop' },
  { id: 3, icon: '🎮', name: 'gamepad' },
  { id: 4, icon: '🎨', name: 'palette' },
  { id: 5, icon: '🎯', name: 'target' },
  { id: 6, icon: '⚡', name: 'lightning' },
  { id: 7, icon: '🔥', name: 'fire' },
  { id: 8, icon: '💎', name: 'diamond' },
  { id: 9, icon: '🌟', name: 'star' },
  { id: 10, icon: '🎵', name: 'music' },
  { id: 11, icon: '🔮', name: 'crystal' },
  { id: 12, icon: '🏆', name: 'trophy' }
];

// Game State
const memoryGame = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  totalPairs: 0,
  isLocked: false,
  isGameStarted: false,
  difficulty: 'easy',
  timerInterval: null,
  seconds: 0,
  bestScores: {
    easy: null,
    hard: null
  }
};

// Initialize Memory Game when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMemoryGame);

function initializeMemoryGame() {
  const gameBoard = document.getElementById('game-board');
  
  // Check if game board exists (only on index page)
  if (!gameBoard) {
    return;
  }

  // Load best scores from localStorage
  loadBestScores();
  
  // Set up event listeners
  setupGameEventListeners();
  
  // Update best score display for initial difficulty
  updateBestScoreDisplay();
}

function setupGameEventListeners() {
  const startButton = document.getElementById('start-game');
  const restartButton = document.getElementById('restart-game');
  const difficultySelect = document.getElementById('difficulty');
  const playAgainButton = document.getElementById('play-again');

  if (startButton) {
    startButton.addEventListener('click', startGame);
  }

  if (restartButton) {
    restartButton.addEventListener('click', restartGame);
  }

  if (difficultySelect) {
    difficultySelect.addEventListener('change', handleDifficultyChange);
  }

  if (playAgainButton) {
    playAgainButton.addEventListener('click', () => {
      hideWinMessage();
      restartGame();
    });
  }
}

function handleDifficultyChange(e) {
  memoryGame.difficulty = e.target.value;
  updateBestScoreDisplay();
  
  // If game is already started, restart with new difficulty
  if (memoryGame.isGameStarted) {
    restartGame();
  } else {
    // Update board class for visual feedback
    const gameBoard = document.getElementById('game-board');
    gameBoard.className = `game-board ${memoryGame.difficulty}`;
  }
}

function startGame() {
  memoryGame.isGameStarted = true;
  
  // Enable restart button
  const restartButton = document.getElementById('restart-game');
  if (restartButton) {
    restartButton.disabled = false;
  }
  
  // Reset game state
  resetGameState();
  
  // Generate cards based on difficulty
  generateCards();
  
  // Render the game board
  renderGameBoard();
  
  // Start timer
  startTimer();
}

function restartGame() {
  // Stop and reset timer
  stopTimer();
  resetTimer();
  
  // Reset game state
  resetGameState();
  
  // Generate new shuffled cards
  generateCards();
  
  // Render the game board
  renderGameBoard();
  
  // Start timer
  startTimer();
}

function resetGameState() {
  memoryGame.cards = [];
  memoryGame.flippedCards = [];
  memoryGame.matchedPairs = 0;
  memoryGame.moves = 0;
  memoryGame.isLocked = false;
  
  // Update stats display
  updateStatsDisplay();
}

function generateCards() {
  // Determine number of pairs based on difficulty
  const pairs = memoryGame.difficulty === 'easy' ? 6 : 12;
  memoryGame.totalPairs = pairs;
  
  // Select random items from the data
  const selectedItems = shuffleArray([...memoryGameData]).slice(0, pairs);
  
  // Create pairs (each item appears twice)
  const cardPairs = [];
  selectedItems.forEach(item => {
    cardPairs.push({ ...item, uniqueId: `${item.id}-a` });
    cardPairs.push({ ...item, uniqueId: `${item.id}-b` });
  });
  
  // Shuffle the cards
  memoryGame.cards = shuffleArray(cardPairs);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderGameBoard() {
  const gameBoard = document.getElementById('game-board');
  
  // Clear previous content
  gameBoard.innerHTML = '';
  
  // Set grid class based on difficulty
  gameBoard.className = `game-board ${memoryGame.difficulty}`;
  
  // Create card elements dynamically
  memoryGame.cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    gameBoard.appendChild(cardElement);
  });
}

function createCardElement(card, index) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'memory-card';
  cardDiv.dataset.index = index;
  cardDiv.dataset.id = card.id;
  cardDiv.dataset.uniqueId = card.uniqueId;
  
  // Card back (question mark side)
  const cardBack = document.createElement('div');
  cardBack.className = 'card-face card-back';
  
  // Card front (icon side)
  const cardFront = document.createElement('div');
  cardFront.className = 'card-face card-front';
  cardFront.textContent = card.icon;
  
  cardDiv.appendChild(cardBack);
  cardDiv.appendChild(cardFront);
  
  // Add click event listener
  cardDiv.addEventListener('click', () => handleCardClick(cardDiv, card, index));
  
  return cardDiv;
}

function handleCardClick(cardElement, card, index) {
  // Ignore clicks if:
  // - Game is locked (processing a match check)
  // - Card is already flipped
  // - Card is already matched
  // - Same card clicked twice
  if (
    memoryGame.isLocked ||
    cardElement.classList.contains('flipped') ||
    cardElement.classList.contains('matched')
  ) {
    return;
  }
  
  // Flip the card
  cardElement.classList.add('flipped');
  
  // Add to flipped cards array
  memoryGame.flippedCards.push({
    element: cardElement,
    card: card,
    index: index
  });
  
  // Check if two cards are flipped
  if (memoryGame.flippedCards.length === 2) {
    // Increment moves
    memoryGame.moves++;
    updateStatsDisplay();
    
    // Check for match
    checkForMatch();
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = memoryGame.flippedCards;
  
  // Lock the board while checking
  memoryGame.isLocked = true;
  
  // Check if cards match (same id but different uniqueId)
  if (firstCard.card.id === secondCard.card.id) {
    // Match found!
    handleMatch(firstCard.element, secondCard.element);
  } else {
    // No match
    handleNoMatch(firstCard.element, secondCard.element);
  }
}

function handleMatch(card1, card2) {
  // Mark cards as matched
  card1.classList.add('matched');
  card2.classList.add('matched');
  
  // Increment matched pairs
  memoryGame.matchedPairs++;
  updateStatsDisplay();
  
  // Clear flipped cards array
  memoryGame.flippedCards = [];
  
  // Unlock the board
  memoryGame.isLocked = false;
  
  // Check for win
  if (memoryGame.matchedPairs === memoryGame.totalPairs) {
    handleWin();
  }
}

function handleNoMatch(card1, card2) {
  // Wait a moment then flip cards back
  setTimeout(() => {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    
    // Clear flipped cards array
    memoryGame.flippedCards = [];
    
    // Unlock the board
    memoryGame.isLocked = false;
  }, 1000);
}

function updateStatsDisplay() {
  const movesDisplay = document.getElementById('moves-count');
  const matchesDisplay = document.getElementById('matches-count');
  
  if (movesDisplay) {
    movesDisplay.textContent = memoryGame.moves;
  }
  
  if (matchesDisplay) {
    matchesDisplay.textContent = memoryGame.matchedPairs;
  }
}

// Timer Functions
function startTimer() {
  memoryGame.seconds = 0;
  updateTimerDisplay();
  
  memoryGame.timerInterval = setInterval(() => {
    memoryGame.seconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (memoryGame.timerInterval) {
    clearInterval(memoryGame.timerInterval);
    memoryGame.timerInterval = null;
  }
}

function resetTimer() {
  memoryGame.seconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) {
    const minutes = Math.floor(memoryGame.seconds / 60);
    const seconds = memoryGame.seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Win Handling
function handleWin() {
  // Stop the timer
  stopTimer();
  
  // Check and update best score
  const isNewRecord = checkAndUpdateBestScore();
  
  // Show win message
  showWinMessage(isNewRecord);
}

function showWinMessage(isNewRecord) {
  const winMessage = document.getElementById('win-message');
  const finalMoves = document.getElementById('final-moves');
  const finalTime = document.getElementById('final-time');
  const newRecordElement = document.getElementById('new-record');
  
  if (finalMoves) {
    finalMoves.textContent = memoryGame.moves;
  }
  
  if (finalTime) {
    finalTime.textContent = formatTime(memoryGame.seconds);
  }
  
  if (newRecordElement) {
    if (isNewRecord) {
      newRecordElement.classList.remove('hidden');
    } else {
      newRecordElement.classList.add('hidden');
    }
  }
  
  if (winMessage) {
    winMessage.classList.remove('hidden');
  }
}

function hideWinMessage() {
  const winMessage = document.getElementById('win-message');
  if (winMessage) {
    winMessage.classList.add('hidden');
  }
}

// localStorage Functions for Best Scores
function loadBestScores() {
  try {
    const savedScores = localStorage.getItem('memoryGameBestScores');
    if (savedScores) {
      const parsed = JSON.parse(savedScores);
      memoryGame.bestScores = {
        easy: parsed.easy || null,
        hard: parsed.hard || null
      };
    }
  } catch (e) {
    console.warn('Could not load best scores from localStorage:', e);
    memoryGame.bestScores = { easy: null, hard: null };
  }
}

function saveBestScores() {
  try {
    localStorage.setItem('memoryGameBestScores', JSON.stringify(memoryGame.bestScores));
  } catch (e) {
    console.warn('Could not save best scores to localStorage:', e);
  }
}

function checkAndUpdateBestScore() {
  const currentDifficulty = memoryGame.difficulty;
  const currentMoves = memoryGame.moves;
  const previousBest = memoryGame.bestScores[currentDifficulty];
  
  // Check if this is a new best score (fewer moves is better)
  if (previousBest === null || currentMoves < previousBest) {
    memoryGame.bestScores[currentDifficulty] = currentMoves;
    saveBestScores();
    updateBestScoreDisplay();
    return true; // New record!
  }
  
  return false;
}

function updateBestScoreDisplay() {
  const bestScoreDisplay = document.getElementById('best-score');
  if (bestScoreDisplay) {
    const bestScore = memoryGame.bestScores[memoryGame.difficulty];
    bestScoreDisplay.textContent = bestScore !== null ? bestScore : '--';
  }
}

