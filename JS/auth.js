
// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
}

// Hide error message
function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.classList.add('hidden');
  }
}

// Hide all errors
function hideAllErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.classList.add('hidden');
  });
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function isValidPassword(password) {
  return password.length >= 6;
}

// Validate phone number
function isValidPhone(phone) {
  if (!phone) return true; // Optional field
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Validate name
function isValidName(name) {
  return name.trim().length >= 3;
}

// Save user data to localStorage
function saveUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Get user data from localStorage
function getUserData() {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
}

// Set login status
function setLoggedIn(email, name) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', email);
  localStorage.setItem('userName', name);
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Logout user
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userName');
}

function validateLoginForm() {
  hideAllErrors();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  let isValid = true;

  // Validate email
  if (!email) {
    showError('emailError', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate password
  if (!password) {
    showError('passwordError', 'Password is required');
    isValid = false;
  } else if (!isValidPassword(password)) {
    showError('passwordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  // Check credentials if validation passed
  if (isValid) {
    const userData = getUserData();
    if (userData && userData.email === email && userData.password === password) {
      setLoggedIn(email, userData.name);
      alert('Login successful! Welcome back, ' + userData.name);
      window.location.href = 'jobs.html';
    } else {
      showError('emailError', 'Invalid email or password');
      isValid = false;
    }
  }

  return isValid;
}

function validateSignupForm() {
  hideAllErrors();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const phone = document.getElementById('phone').value.trim();
  const cv = document.getElementById('cv').files[0];

  let isValid = true;

  // Validate name
  if (!name) {
    showError('nameError', 'Full name is required');
    isValid = false;
  } else if (!isValidName(name)) {
    showError('nameError', 'Name must be at least 3 characters');
    isValid = false;
  }

  // Validate email
  if (!email) {
    showError('emailError', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate password
  if (!password) {
    showError('passwordError', 'Password is required');
    isValid = false;
  } else if (!isValidPassword(password)) {
    showError('passwordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPassword) {
    showError('confirmPasswordError', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match');
    isValid = false;
  }

  // Validate phone (optional)
  if (phone && !isValidPhone(phone)) {
    showError('phoneError', 'Please enter a valid phone number (at least 10 digits)');
    isValid = false;
  }

  // Validate CV file (optional)
  if (cv) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(cv.type)) {
      showError('cvError', 'Please upload a valid CV file (PDF or DOC)');
      isValid = false;
    } else if (cv.size > 5 * 1024 * 1024) { // 5MB
      showError('cvError', 'CV file must be less than 5MB');
      isValid = false;
    }
  }

  // Check if email already exists
  if (isValid) {
    const existingUser = getUserData();
    if (existingUser && existingUser.email === email) {
      showError('emailError', 'An account with this email already exists');
      isValid = false;
    }
  }

  // Save user data if validation passed
  if (isValid) {
    const userData = {
      name: name,
      email: email,
      password: password,
      phone: phone || '',
      cvName: cv ? cv.name : '',
      createdAt: new Date().toISOString()
    };

    saveUserData(userData);
    setLoggedIn(email, name);
    alert('Account created successfully! Welcome to JobFinder, ' + name);
    window.location.href = 'jobs.html';
  }

  return isValid;
}

// Email validation on blur
function setupEmailValidation() {
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const email = this.value.trim();
      if (email && !isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
      } else {
        hideError('emailError');
      }
    });

    emailInput.addEventListener('input', function() {
      hideError('emailError');
    });
  }
}

// Password validation on input
function setupPasswordValidation() {
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      if (password && !isValidPassword(password)) {
        showError('passwordError', 'Password must be at least 6 characters');
      } else {
        hideError('passwordError');
      }
    });
  }
}

// Confirm password validation
function setupConfirmPasswordValidation() {
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordInput = document.getElementById('password');

  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('input', function() {
      const confirmPassword = this.value;
      const password = passwordInput.value;

      if (confirmPassword && password && confirmPassword !== password) {
        showError('confirmPasswordError', 'Passwords do not match');
      } else {
        hideError('confirmPasswordError');
      }
    });
  }
}

// Name validation
function setupNameValidation() {
  const nameInput = document.getElementById('name');
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      const name = this.value.trim();
      if (name && !isValidName(name)) {
        showError('nameError', 'Name must be at least 3 characters');
      } else {
        hideError('nameError');
      }
    });

    nameInput.addEventListener('input', function() {
      hideError('nameError');
    });
  }
}

// Phone validation
function setupPhoneValidation() {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      const phone = this.value.trim();
      if (phone && !isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
      } else {
        hideError('phoneError');
      }
    });

    phoneInput.addEventListener('input', function() {
      hideError('phoneError');
    });
  }
}

// Auto-save form data while typing
function setupFormAutoSave(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea, select');

  // Load saved data on page load
  inputs.forEach(input => {
    const savedValue = localStorage.getItem(`${formId}_${input.name}`);
    if (savedValue && input.type !== 'password') {
      input.value = savedValue;
    }
  });

  // Save on input
  inputs.forEach(input => {
    if (input.type !== 'password') { // Don't save passwords
      input.addEventListener('input', function() {
        localStorage.setItem(`${formId}_${input.name}`, this.value);
      });
    }
  });
}

// Clear saved form data after successful submission
function clearFormData(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    localStorage.removeItem(`${formId}_${input.name}`);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Setup form validation based on current page
  if (document.getElementById('loginForm')) {
    // Login page
    setupEmailValidation();
    setupPasswordValidation();

    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateLoginForm()) {
        // Form is valid and user is logged in
      }
    });
  } else if (document.getElementById('signupForm')) {
    // Signup page
    setupNameValidation();
    setupEmailValidation();
    setupPasswordValidation();
    setupConfirmPasswordValidation();
    setupPhoneValidation();
    setupFormAutoSave('signupForm');

    document.getElementById('signupForm').addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateSignupForm()) {
        clearFormData('signupForm');
      }
    });
  }
});

function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    logout();
    alert('You have been logged out successfully.');
    window.location.href = 'index.html';
  }
}