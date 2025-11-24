/**
 * Custom JavaScript for Portfolio Website
 * Author: Florian Bejte
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeContactForm();
});

/**
 * Initialize contact form with event listeners and functionality
 */
function initializeContactForm() {
  const contactForm = document.querySelector('.php-email-form');
  
  if (!contactForm) {
    console.log('Contact form not found on this page');
    return;
  }

  // Replace the default form submission
  contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  // Prevent default form submission and page reload
  event.preventDefault();
  
  // Collect form data
  const formData = collectFormData(event.target);
  
  // Validate form data
  if (!validateFormData(formData)) {
    showErrorMessage('Please fill in all required fields correctly.');
    return;
  }
  
  // Print data to console
  console.log('Form Data:', formData);
  
  // Calculate average rating
  const averageRating = calculateAverageRating(formData);
  
  // Display results below the form
  displayFormResults(formData, averageRating);
  
  // Show success popup
  showSuccessPopup();
  
  // Optionally reset the form
  // event.target.reset();
}

/**
 * Collect all form data into an object
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} Form data object
 */
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

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @returns {boolean} True if valid
 */
function validateFormData(data) {
  // Check required text fields
  if (!data.name || !data.surname || !data.email || !data.phone || !data.address) {
    return false;
  }
  
  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    return false;
  }
  
  // Validate ratings are between 1-10
  if (data.rating1 < 1 || data.rating1 > 10 ||
      data.rating2 < 1 || data.rating2 > 10 ||
      data.rating3 < 1 || data.rating3 > 10) {
    return false;
  }
  
  return true;
}

/**
 * Calculate average rating from three ratings
 * @param {Object} data - Form data object
 * @returns {number} Average rating rounded to 1 decimal
 */
function calculateAverageRating(data) {
  const sum = data.rating1 + data.rating2 + data.rating3;
  const average = sum / 3;
  return Math.round(average * 10) / 10; // Round to 1 decimal place
}

/**
 * Get color based on rating value
 * @param {number} rating - Rating value
 * @returns {string} Color code
 */
function getRatingColor(rating) {
  if (rating >= 0 && rating < 4) {
    return '#e74c3c'; // Red
  } else if (rating >= 4 && rating < 7) {
    return '#f39c12'; // Orange
  } else if (rating >= 7 && rating <= 10) {
    return '#27ae60'; // Green
  }
  return '#333'; // Default color
}

/**
 * Display form results below the form
 * @param {Object} data - Form data object
 * @param {number} average - Average rating
 */
function displayFormResults(data, average) {
  // Check if results container exists, if not create it
  let resultsContainer = document.getElementById('form-results');
  
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'form-results';
    resultsContainer.className = 'form-results';
    
    // Insert after the form
    const form = document.querySelector('.php-email-form');
    form.parentNode.insertBefore(resultsContainer, form.nextSibling);
  }
  
  // Get color for average rating
  const ratingColor = getRatingColor(average);
  
  // Build results HTML
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
  
  // Scroll to results
  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Show success popup notification
 */
function showSuccessPopup() {
  // Create popup element
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
  
  // Add to body
  document.body.appendChild(popup);
  
  // Trigger animation
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }, 3000);
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
  const errorDiv = document.querySelector('.php-email-form .error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  } else {
    alert(message);
  }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
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

/**
 * Update rating value display (for range sliders)
 */
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

// Initialize rating displays when DOM is ready
document.addEventListener('DOMContentLoaded', updateRatingDisplay);

