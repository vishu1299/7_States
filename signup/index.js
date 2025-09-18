// Signup Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Signup page loaded");

  // Get form elements
  const mobileSignupForm = document.getElementById("mobileSignupForm");
  const emailSignupForm = document.getElementById("emailSignupForm");
  const emailSignupBtn = document.getElementById("emailSignupBtn");

  const otpModal = new bootstrap.Modal(document.getElementById("otpModal"));

  // Always start with mobile signup by default
  switchToMobileForm();

  function switchToEmailForm() {
    console.log("Switching to email signup");
    mobileSignupForm.classList.remove("active");
    emailSignupForm.classList.add("active");

    // Update URL and localStorage
    const url = new URL(window.location);
    url.searchParams.set("form", "email");
    window.history.replaceState({}, "", url);
    localStorage.setItem("signupFormType", "email");
  }

  function switchToMobileForm() {
    console.log("Switching back to mobile signup");
    emailSignupForm.classList.remove("active");
    mobileSignupForm.classList.add("active");

    // Update URL and localStorage
    const url = new URL(window.location);
    url.searchParams.delete("form");
    window.history.replaceState({}, "", url);
    localStorage.setItem("signupFormType", "mobile");
  }

  // Switch to email signup
  emailSignupBtn.addEventListener("click", function () {
    switchToEmailForm();
  });

  // Handle mobile signup form submission
  mobileSignupForm
    .querySelector("form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Mobile signup form submitted");

      const phoneInput = this.querySelector(".phone-input");
      const phoneNumber = phoneInput.value.trim();

      if (phoneNumber.length < 8) {
        alert("Please enter a valid phone number");
        return;
      }

      // Show OTP modal
      otpModal.show();
    });

  // Handle email signup form submission
  emailSignupForm
    .querySelector("form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Email signup form submitted");

      const emailInput = this.querySelector('input[type="email"]');
      const passwordInput = this.querySelector("#passwordField");
      const confirmPasswordInput = this.querySelector("#confirmPasswordField");

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      if (!email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      // Simulate signup process
      console.log("Signing up with email:", email);
      alert("Account created successfully! (This is a demo)");
    });

  // OTP input handling
  const otpInputs = document.querySelectorAll(".otp-input");

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", function (e) {
      const value = e.target.value;

      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        e.target.value = "";
        return;
      }

      // Move to next input if current is filled
      if (value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", function (e) {
      // Move to previous input on backspace if current is empty
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Handle OTP confirmation
  document
    .querySelector("#otpModal .btn-primary")
    .addEventListener("click", function () {
      const otpValues = Array.from(otpInputs).map((input) => input.value);
      const otp = otpValues.join("");

      if (otp.length !== 4) {
        alert("Please enter the complete 4-digit OTP");
        return;
      }

      console.log("OTP entered:", otp);

      // Simulate OTP verification
      if (otp === "1234") {
        alert("OTP verified successfully! Account created! (This is a demo)");
        otpModal.hide();

        // Clear OTP inputs
        otpInputs.forEach((input) => (input.value = ""));
      } else {
        alert("Invalid OTP. Please try again. (Use 1234 for demo)");
      }
    });

  // Handle resend OTP
  document
    .querySelector("#otpModal .resend-text a")
    .addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Resend OTP clicked");

      // Clear current OTP inputs
      otpInputs.forEach((input) => (input.value = ""));

      // Focus on first input
      otpInputs[0].focus();

      alert("New OTP sent! (This is a demo)");
    });

  // Handle edit number
  document
    .querySelector("#otpModal .text-primary")
    .addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Edit number clicked");

      // Close modal and focus on phone input
      otpModal.hide();

      setTimeout(() => {
        const phoneInput = document.querySelector(".phone-input");
        if (phoneInput) {
          phoneInput.focus();
          phoneInput.select();
        }
      }, 300);
    });

  // Phone number formatting
  const phoneInput = document.querySelector(".phone-input");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      // Limit to 9 digits for UAE numbers
      if (value.length > 9) {
        value = value.slice(0, 9);
      }

      e.target.value = value;
    });
  }

  // Auto-focus first OTP input when modal opens
  document
    .getElementById("otpModal")
    .addEventListener("shown.bs.modal", function () {
      otpInputs[0].focus();
    });

  // Clear OTP inputs when modal closes
  document
    .getElementById("otpModal")
    .addEventListener("hidden.bs.modal", function () {
      otpInputs.forEach((input) => (input.value = ""));
    });
});

// Password toggle functions (global scope for onclick handlers)
function togglePassword() {
  const passwordField = document.getElementById("passwordField");
  const passwordIcon = document.getElementById("passwordIcon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    passwordIcon.classList.remove("fa-eye");
    passwordIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    passwordIcon.classList.remove("fa-eye-slash");
    passwordIcon.classList.add("fa-eye");
  }
}

function toggleConfirmPassword() {
  const confirmPasswordField = document.getElementById("confirmPasswordField");
  const confirmPasswordIcon = document.getElementById("confirmPasswordIcon");

  if (confirmPasswordField.type === "password") {
    confirmPasswordField.type = "text";
    confirmPasswordIcon.classList.remove("fa-eye");
    confirmPasswordIcon.classList.add("fa-eye-slash");
  } else {
    confirmPasswordField.type = "password";
    confirmPasswordIcon.classList.remove("fa-eye-slash");
    confirmPasswordIcon.classList.add("fa-eye");
  }
}

// OTP Modal functions (global scope for onclick handlers)
function showOTPModal(event) {
  event.preventDefault();
  const phoneNumber = document.getElementById("phoneNumber").value;
  if (phoneNumber) {
    document.getElementById("phoneDisplay").textContent = "+971 " + phoneNumber;
    const otpModal = new bootstrap.Modal(document.getElementById("otpModal"));
    otpModal.show();
  }
}

function editNumber() {
  const otpModal = bootstrap.Modal.getInstance(
    document.getElementById("otpModal")
  );
  otpModal.hide();
}

function moveToNext(current, index) {
  if (current.value.length === 1 && index < 3) {
    const nextInput = document.querySelectorAll(".otp-input")[index + 1];
    nextInput.focus();
  }
}
