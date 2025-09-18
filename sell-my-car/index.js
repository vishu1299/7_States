// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize page functionality
  initializePage();
});

function initializePage() {
  // Post Ad Button Handler
  const postAdBtn = document.querySelector(".post-ad-btn");
  if (postAdBtn) {
    postAdBtn.addEventListener("click", handlePostAd);
  }

  // Location dropdown handler
  const locationDropdown = document.querySelectorAll(".dropdown-menu a");
  locationDropdown.forEach((item) => {
    item.addEventListener("click", handleLocationSelection);
  });

  // Mobile menu functionality
  initializeMobileMenu();

  // Header sell button functionality
  const sellButtons = document.querySelectorAll('button:contains("Sell my car")');
  sellButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Already on sell page, scroll to form
      document.querySelector(".sell-form-section").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handlePostAd() {
  // Show loading state
  const btn = document.querySelector(".post-ad-btn");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
  btn.disabled = true;

  // Simulate form processing
  setTimeout(() => {
    // Show success message
    showAlert(
      "Great! We'll redirect you to our detailed car listing form.",
      "success"
    );

    // Reset button after delay
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);

    // In a real application, this would redirect to a detailed form
    // window.location.href = 'detailed-form.html';
  }, 2000);
}

function handleLocationSelection(event) {
  event.preventDefault();
  const location = event.target.textContent;
  const locationBtn = document.querySelector(".dropdown-toggle");

  // Update button text
  locationBtn.innerHTML = `
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
    </svg>
    ${location}
  `;

  showAlert(`Location set to ${location}`, "success");
}

function initializeMobileMenu() {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector(
    '[data-bs-target="#mobileMenu"]'
  );
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuToggle && mobileMenu) {
    // Additional mobile menu functionality can be added here
    console.log("Mobile menu initialized");
  }

  // Handle mobile menu links
  const mobileMenuLinks = document.querySelectorAll("#mobileMenu .nav-link");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Close mobile menu when link is clicked
      const offcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
      if (offcanvas) {
        offcanvas.hide();
      }
    });
  });
}

function showAlert(message, type = "info") {
  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;";
  alertDiv.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas ${getAlertIcon(type)} me-2"></i>
      <span>${message}</span>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Add to page
  document.body.appendChild(alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

function getAlertIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "warning":
      return "fa-exclamation-triangle";
    case "danger":
      return "fa-exclamation-circle";
    default:
      return "fa-info-circle";
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Handle form interactions
document.addEventListener("click", function (e) {
  // Handle any dynamic form elements
  if (e.target.classList.contains("action-btn")) {
    e.preventDefault();
    showAlert("Please complete the car listing form first.", "info");
  }
});

// Page visibility change handler
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    // Page became visible - could refresh data or check for updates
    console.log("Page is now visible");
  }
});

// Window resize handler for responsive adjustments
window.addEventListener("resize", function () {
  // Handle any responsive adjustments if needed
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile specific adjustments
    console.log("Mobile view active");
  } else {
    // Desktop specific adjustments
    console.log("Desktop view active");
  }
});

// Export functions for potential use in other scripts
window.SellCarPage = {
  handlePostAd,
  handleLocationSelection,
  showAlert,
};

// Initialize tooltips if Bootstrap is available
if (typeof bootstrap !== "undefined") {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Console log for debugging
console.log("Sell My Car page loaded successfully");
