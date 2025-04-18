document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModal = document.getElementById('closeModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetConfirmation = document.getElementById('resetConfirmation');
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const signupCard = document.getElementById('signupCard');
    const successCard = document.getElementById('successCard');
    const secondsLeftSpan = document.getElementById('secondsLeft');
    const successEmployeeIdDiv = document.getElementById('successEmployeeId');
    
    // Form validation functions
    function validateField(fieldId, errorId, validationFn, errorMessage) {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(errorId);
      
      if (!validationFn(field.value)) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        field.style.borderColor = '#ef4444';
        return false;
      } else {
        errorElement.style.display = 'none';
        field.style.borderColor = '#334155';
        return true;
      }
    }
    
    // Individual field validation functions
    function validateFullName(value) {
      return value.trim().length > 0;
    }
    
    function validateEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    }
    
    function validatePhone(value) {
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(value);
    }
    
    function validateDepartment(value) {
      return value.trim().length > 0;
    }
    
    function validatePassword(value) {
      return value.length >= 6;
    }
    
    function validateConfirmPassword(value) {
      const password = document.getElementById('password').value;
      return value === password;
    }
    
    function validateRole(value) {
      return value.trim().length > 0;
    }
    
    function validateProfilePic() {
      const field = document.getElementById('profilePic');
      const errorElement = document.getElementById('profilePic-error');
      
      if (field.files.length === 0) {
        errorElement.textContent = 'Please select a profile picture';
        errorElement.style.display = 'block';
        return false;
      } else {
        errorElement.style.display = 'none';
        return true;
      }
    }
    
    // Validate all fields
    function validateForm() {
      const isFullNameValid = validateField('fullname', 'fullname-error', validateFullName, 'Please enter your full name');
      const isEmailValid = validateField('email', 'email-error', validateEmail, 'Please enter a valid email address');
      const isPhoneValid = validateField('phone', 'phone-error', validatePhone, 'Please enter a valid 10-digit phone number');
      const isDepartmentValid = validateField('department', 'department-error', validateDepartment, 'Please enter your department');
      const isPasswordValid = validateField('password', 'password-error', validatePassword, 'Password must be at least 6 characters');
      const isConfirmPasswordValid = validateField('confirm-password', 'confirm-password-error', validateConfirmPassword, 'Passwords do not match');
      const isRoleValid = validateField('role', 'role-error', validateRole, 'Please select a role');
      const isProfilePicValid = validateProfilePic();
      
      return isFullNameValid && isEmailValid && isPhoneValid && isDepartmentValid && 
             isPasswordValid && isConfirmPasswordValid && isRoleValid && isProfilePicValid;
    }
    
    // Form submission handler
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        // Generate employee ID
        const employeeId = "EMP" + Date.now().toString().slice(-6);
        document.getElementById('employeeID').value = employeeId;
        
        // Show loading state on button
        const submitButton = document.getElementById('submitButton');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div></div>';
        submitButton.disabled = true;
        
        // Simulate API call with a short delay
        setTimeout(function() {
          // Hide signup form and show success page
          signupCard.style.display = 'none';
          successCard.style.display = 'flex';
          successEmployeeIdDiv.textContent = employeeId;
          
          // Start countdown timer
          let secondsLeft = 30;
          const countdownInterval = setInterval(function() {
            secondsLeft--;
            secondsLeftSpan.textContent = secondsLeft;
            
            if (secondsLeft <= 0) {
              clearInterval(countdownInterval);
              window.location.href = 'emp-Login.html';
            }
          }, 1000);
        }, 1500);
      }
    });

    // File upload handling
    const fileInput = document.getElementById('profilePic');
    const fileChosen = document.getElementById('file-chosen');
    const fileUploadBtn = document.querySelector('.file-btn');
    const imagePreview = document.getElementById('image-preview');

    fileUploadBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        fileChosen.textContent = this.files[0].name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
          imagePreview.style.height = '100px';
        };
        reader.readAsDataURL(this.files[0]);
      } else {
        fileChosen.textContent = 'No file chosen';
        imagePreview.innerHTML = '';
        imagePreview.style.height = '0';
      }
    });
        
    // Password visibility toggle
    passwordToggle.addEventListener('click', function() {
      togglePasswordVisibility(passwordField, passwordToggle);
    });
    
    confirmPasswordToggle.addEventListener('click', function() {
      togglePasswordVisibility(confirmPasswordField, confirmPasswordToggle);
    });
    
    function togglePasswordVisibility(field, toggleIcon) {
      if (field.type === 'password') {
        field.type = 'text';
        toggleIcon.textContent = '👁️‍🗨️';
      } else {
        field.type = 'password';
        toggleIcon.textContent = '👁️';
      }
    }
    
    // Forgot password modal handlers
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      forgotPasswordModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
      forgotPasswordModal.style.display = 'none';
      resetConfirmation.classList.add('hidden');
      document.getElementById('reset-email').value = '';
      document.getElementById('reset-email-error').style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
        resetConfirmation.classList.add('hidden');
        document.getElementById('reset-email').value = '';
        document.getElementById('reset-email-error').style.display = 'none';
      }
    });
    
    // Reset password form submission
    forgotPasswordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const resetEmail = document.getElementById('reset-email').value;
      const resetEmailError = document.getElementById('reset-email-error');
      
      if (!validateEmail(resetEmail)) {
        resetEmailError.style.display = 'block';
        return;
      }
      
      resetEmailError.style.display = 'none';
      
      // Show loading state on button
      const resetButton = document.getElementById('resetPasswordBtn');
      const originalButtonText = resetButton.innerHTML;
      resetButton.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div></div>';
      resetButton.disabled = true;
      
      // Simulate sending reset email
      setTimeout(function() {
        resetButton.innerHTML = originalButtonText;
        resetButton.disabled = false;
        resetConfirmation.classList.remove('hidden');
        
        // Auto close after 3 seconds
        setTimeout(function() {
          forgotPasswordModal.style.display = 'none';
          resetConfirmation.classList.add('hidden');
          document.getElementById('reset-email').value = '';
        }, 3000);
      }, 1500);
    });
    
    // Input validation on blur
    document.getElementById('fullname').addEventListener('blur', function() {
      validateField('fullname', 'fullname-error', validateFullName, 'Please enter your full name');
    });
    
    document.getElementById('email').addEventListener('blur', function() {
      validateField('email', 'email-error', validateEmail, 'Please enter a valid email address');
    });
    
    document.getElementById('phone').addEventListener('blur', function() {
      validateField('phone', 'phone-error', validatePhone, 'Please enter a valid 10-digit phone number');
    });
    
    document.getElementById('department').addEventListener('blur', function() {
      validateField('department', 'department-error', validateDepartment, 'Please enter your department');
    });
    
    document.getElementById('password').addEventListener('blur', function() {
      validateField('password', 'password-error', validatePassword, 'Password must be at least 6 characters');
    });
    
    document.getElementById('confirm-password').addEventListener('blur', function() {
      validateField('confirm-password', 'confirm-password-error', validateConfirmPassword, 'Passwords do not match');
    });
    
    document.getElementById('role').addEventListener('blur', function() {
      validateField('role', 'role-error', validateRole, 'Please select a role');
    });

    // Done button handler
    const doneButton = document.getElementById('doneButton');
    doneButton.addEventListener('click', function() {
      window.location.href = 'emp-Login.html';
    });
});