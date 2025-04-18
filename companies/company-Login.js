document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const successMsg = document.getElementById('statusSuccess');
    const errorMsg = document.getElementById('statusError');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModal = document.getElementById('closeModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const passwordField = document.querySelector('input[name="password"]');
    const passwordToggle = document.getElementById('passwordToggle');
    const resetEmailError = document.getElementById('reset-email-error');
    const resetConfirmation = document.getElementById('resetConfirmation');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Console log to verify all elements are found
    console.log('Modal element found:', forgotPasswordModal !== null);
    console.log('Forgot Password Link found:', forgotPasswordLink !== null);
    console.log('Reset Form found:', forgotPasswordForm !== null);
    
    // Company dummy credentials
    const dummyUsers = [
      { id: 'admin', password: 'admin2025' },
      { id: 'jsmith@company.com', password: 'password123' },
      { id: 'EMP5421', password: 'company2025' }
    ];
    
    // Check if user has saved credentials in localStorage
    function checkSavedCredentials() {
      const savedUsername = localStorage.getItem('companyLoginUsername');
      const rememberMeStatus = localStorage.getItem('companyRememberMe');
      
      if (savedUsername && rememberMeStatus === 'true') {
        document.querySelector('input[name="identifier"]').value = savedUsername;
        rememberMeCheckbox.checked = true;
      }
    }
    
    // Run on page load
    checkSavedCredentials();
    
    // Password toggle functionality
    if (passwordToggle) {
      passwordToggle.addEventListener('click', function() {
        togglePasswordVisibility(passwordField, passwordToggle);
      });
    }
    
    function togglePasswordVisibility(field, toggleIcon) {
      if (field.type === 'password') {
        field.type = 'text';
        toggleIcon.innerHTML = '👁️‍🗨️';
      } else {
        field.type = 'password';
        toggleIcon.innerHTML = '👁️';
      }
    }
    
    // Login form submission handler
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateLogin();
      });
    }
    
    function validateLogin() {
      const identifier = document.querySelector('input[name="identifier"]').value.trim();
      const password = document.querySelector('input[name="password"]').value;
      const rememberMe = rememberMeCheckbox.checked;
      
      // Hide both messages initially
      successMsg.classList.remove('show');
      errorMsg.classList.remove('show');
      
      if (!identifier || !password) {
        errorMsg.textContent = "Please fill in both fields.";
        errorMsg.classList.add('show');
        return false;
      }
      
      // Check against dummy credentials
      const user = dummyUsers.find(user => 
        user.id.toLowerCase() === identifier.toLowerCase() && 
        user.password === password
      );
      
      if (user) {
        // Save to localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem('companyLoginUsername', identifier);
          localStorage.setItem('companyRememberMe', 'true');
        } else {
          localStorage.removeItem('companyLoginUsername');
          localStorage.removeItem('companyRememberMe');
        }
        
        // Success case
        successMsg.classList.add('show');
        
        // Redirect after a delay to show the success message
        setTimeout(() => {
          window.location.href = "../companyProfile/dashboard.html";
        }, 2000);
      } else {
        // Error case
        errorMsg.textContent = "Login failed. Invalid credentials.";
        errorMsg.classList.add('show');
        
        // Show available test accounts in console for debugging
        console.log('Login attempt failed. Available test accounts:');
        dummyUsers.forEach(user => console.log(`ID: ${user.id}, Password: ${user.password}`));
      }
      
      return false;
    }
    
    // Forgot password modal functionality
    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Forgot password link clicked');
        
        if (forgotPasswordModal) {
          console.log('Opening modal');
          forgotPasswordModal.style.display = 'flex';
          
          // Ensure the modal is visible by adding a class
          forgotPasswordModal.classList.add('show-modal');
          
          if (resetConfirmation) {
            resetConfirmation.classList.add('hidden');
          }
          
          const resetEmailInput = document.getElementById('reset-email');
          if (resetEmailInput) {
            // Pre-fill with the email if it was entered in the login form
            const loginEmail = document.querySelector('input[name="identifier"]').value.trim();
            if (loginEmail.includes('@')) {
              resetEmailInput.value = loginEmail;
            } else {
              resetEmailInput.value = '';
            }
          }
          
          if (resetEmailError) {
            resetEmailError.classList.add('hidden');
          }
        } else {
          console.error('Modal element not found in DOM');
        }
      });
    }
    
    // Close modal button
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        if (forgotPasswordModal) {
          forgotPasswordModal.style.display = 'none';
          forgotPasswordModal.classList.remove('show-modal');
        }
        
        if (resetConfirmation) {
          resetConfirmation.classList.add('hidden');
        }
        
        const resetEmailInput = document.getElementById('reset-email');
        if (resetEmailInput) {
          resetEmailInput.value = '';
        }
        
        if (resetEmailError) {
          resetEmailError.classList.add('hidden');
        }
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (forgotPasswordModal && e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
        forgotPasswordModal.classList.remove('show-modal');
        
        if (resetConfirmation) {
          resetConfirmation.classList.add('hidden');
        }
        
        const resetEmailInput = document.getElementById('reset-email');
        if (resetEmailInput) {
          resetEmailInput.value = '';
        }
        
        if (resetEmailError) {
          resetEmailError.classList.add('hidden');
        }
      }
    });
    
    // Email validation function - requires company domain
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    // Reset password form handling
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Reset password form submitted');
        
        const resetEmail = document.getElementById('reset-email');
        if (!resetEmail) {
          console.error('Reset email input not found');
          return;
        }
        
        const emailValue = resetEmail.value.trim();
        
        if (!validateEmail(emailValue)) {
          if (resetEmailError) {
            resetEmailError.classList.remove('hidden');
          }
          return;
        }
        
        if (resetEmailError) {
          resetEmailError.classList.add('hidden');
        }
        
        // Show loading state on button
        const resetButton = document.getElementById('resetPasswordBtn');
        if (!resetButton) {
          console.error('Reset button not found');
          return;
        }
        
        const originalButtonText = resetButton.innerHTML;
        resetButton.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div></div>';
        resetButton.disabled = true;
        
        // Simulate sending reset email with delay
        setTimeout(function() {
          resetButton.innerHTML = originalButtonText;
          resetButton.disabled = false;
          
          if (resetConfirmation) {
            resetConfirmation.classList.remove('hidden');
          }
          
          // Auto close after 3 seconds
          setTimeout(function() {
            if (forgotPasswordModal) {
              forgotPasswordModal.style.display = 'none';
              forgotPasswordModal.classList.remove('show-modal');
            }
            
            if (resetConfirmation) {
              resetConfirmation.classList.add('hidden');
            }
            
            if (resetEmail) {
              resetEmail.value = '';
            }
          }, 3000);
        }, 1500);
      });
    }
    
    // Add animation to login form fields on page load
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
      input.style.opacity = "0";
      input.style.transform = "translateY(10px)";
      input.style.transition = "all 0.3s ease";
      
      setTimeout(() => {
        input.style.opacity = "1";
        input.style.transform = "translateY(0)";
      }, 300 + (index * 100));
    });
  });