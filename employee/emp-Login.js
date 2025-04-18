
document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.querySelector('input[name="password"]');
    
    passwordToggle.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      passwordToggle.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
    
    // Forgot password modal
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModal = document.getElementById('closeModal');
    
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      forgotPasswordModal.classList.remove('hidden');
      forgotPasswordModal.classList.add('show-modal');
    });
    
    closeModal.addEventListener('click', function() {
      forgotPasswordModal.classList.add('hidden');
      forgotPasswordModal.classList.remove('show-modal');
    });
    
    // Close modal when clicking outside
    forgotPasswordModal.addEventListener('click', function(e) {
      if (e.target === forgotPasswordModal) {
        forgotPasswordModal.classList.add('hidden');
        forgotPasswordModal.classList.remove('show-modal');
      }
    });
    
    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    const statusSuccess = document.getElementById('statusSuccess');
    const statusError = document.getElementById('statusError');
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Mock authentication - in a real app this would call an API
      const identifier = this.elements['identifier'].value;
      const password = this.elements['password'].value;
      
      // Simple validation for demo purposes
      if (identifier && password) {
        statusSuccess.classList.add('show');
        // In a real app, redirect after successful login
        setTimeout(() => {
          window.location.href = '../employeeProfile/dashboard.html';
        }, 2000);
      } else {
        statusError.classList.add('show');
        setTimeout(() => {
          statusError.classList.remove('show');
        }, 3000);
      }
    });
    
    // Reset password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetConfirmation = document.getElementById('resetConfirmation');
    
    forgotPasswordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('reset-email').value;
      const emailError = document.getElementById('reset-email-error');
      
      // Simple validation
      if (email && email.includes('@') && email.includes('.')) {
        resetConfirmation.classList.remove('hidden');
        emailError.classList.add('hidden');
        
        // In a real app, this would send a request to the server
        setTimeout(() => {
          forgotPasswordModal.classList.add('hidden');
          forgotPasswordModal.classList.remove('show-modal');
          resetConfirmation.classList.add('hidden');
          document.getElementById('reset-email').value = '';
        }, 3000);
      } else {
        emailError.classList.remove('hidden');
      }
    });
  });