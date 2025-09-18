// Login Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Login page loaded");

  // Get form elements
  const mobileLoginForm = document.getElementById("mobileLoginForm");
  const emailLoginForm = document.getElementById("emailLoginForm");
  const emailLoginBtn = document.getElementById("emailLoginBtn");
  const backToMobileBtn = document.getElementById("backToMobileBtn");
  const otpModal = new bootstrap.Modal(document.getElementById("otpModal"));

  // Always start with mobile login by default
  switchToMobileForm();

  function switchToEmailForm() {
    console.log("Switching to email login");
    mobileLoginForm.classList.remove("active");
    emailLoginForm.classList.add("active");

    // Update URL and localStorage
    const url = new URL(window.location);
    url.searchParams.set("form", "email");
    window.history.replaceState({}, "", url);
    localStorage.setItem("loginFormType", "email");
  }

  function switchToMobileForm() {
    console.log("Switching back to mobile login");
    emailLoginForm.classList.remove("active");
    mobileLoginForm.classList.add("active");

    // Update URL and localStorage
    const url = new URL(window.location);
    url.searchParams.delete("form");
    window.history.replaceState({}, "", url);
    localStorage.setItem("loginFormType", "mobile");
  }

  // Switch to email login
  emailLoginBtn.addEventListener("click", function () {
    switchToEmailForm();
  });

  // Switch back to mobile login
  backToMobileBtn.addEventListener("click", function () {
    switchToMobileForm();
  });

  // Handle mobile login form submission
  mobileLoginForm
    .querySelector("form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Mobile login form submitted");

      const phoneInput = this.querySelector(".phone-input");
      const phoneNumber = phoneInput.value.trim();

      if (phoneNumber.length < 8) {
        alert("Please enter a valid phone number");
        return;
      }

      // Show OTP modal
      otpModal.show();
    });

  // Handle email login form submission
  emailLoginForm.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Email login form submitted");

    const emailInput = this.querySelector('input[type="email"]');
    const passwordInput = this.querySelector('input[type="password"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate login process
    console.log("Logging in with email:", email);
    alert("Login successful! (This is a demo)");
  });

  // Handle forgot password clicks
  document.querySelectorAll(".forgot-password").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Forgot password clicked");

      // If we're in mobile login mode, show OTP modal
      if (mobileLoginForm.classList.contains("active")) {
        otpModal.show();
      } else {
        // For email login, you could show a different modal or redirect
        alert(
          "Password reset link will be sent to your email (This is a demo)"
        );
      }
    });
  });

  // Password toggle functionality
  const passwordToggle = document.querySelector(".password-toggle");
  if (passwordToggle) {
    passwordToggle.addEventListener("click", function () {
      const passwordInput = document.querySelector(
        'input[type="password"], input[type="text"]'
      );
      const icon = this.querySelector("i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }

  // OTP Input functionality
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
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", function (e) {
      // Move to previous input on backspace if current is empty
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    // Handle paste
    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");
      const digits = pastedData.replace(/\D/g, "").slice(0, 4);

      digits.split("").forEach((digit, i) => {
        if (otpInputs[i]) {
          otpInputs[i].value = digit;
        }
      });

      // Focus on the next empty input or the last one
      const nextEmptyIndex = digits.length < 4 ? digits.length : 3;
      otpInputs[nextEmptyIndex].focus();
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
        alert("OTP verified successfully! (This is a demo)");
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

// Function to handle login button clicks from other pages
function openLoginPage() {
  window.location.href = "/login/index.html";
}

// Export for use in other pages
if (typeof module !== "undefined" && module.exports) {
  module.exports = { openLoginPage };
}
