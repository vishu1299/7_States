// Global variables for carousels
let mainCarousel, thumbnailCarousel, similarCarsCarousel;

// Initialize page functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Car details page loaded");

  // Wait for DOM to be fully loaded
  setTimeout(() => {
    // Initialize carousels
    initializeCarousels();

    // Setup event listeners
    setupEventListeners();

    // Load car data from URL parameters
    loadCarData();
  }, 100);
});

// Initialize all Swiper carousels
function initializeCarousels() {
  console.log("Initializing carousels...");

  try {
    // Thumbnail carousel (initialize first)
    thumbnailCarousel = new Swiper(".thumbnail-carousel", {
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
      clickable: true,
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        480: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
      on: {
        click: function (swiper, event) {
          const clickedIndex = swiper.clickedIndex;
          if (clickedIndex !== undefined && mainCarousel) {
            mainCarousel.slideTo(clickedIndex);
            updateThumbnailActive(clickedIndex);
          }
        },
      },
    });

    // Main image carousel (initialize after thumbnail)
    mainCarousel = new Swiper(".main-carousel", {
      loop: false,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "slide",
      on: {
        slideChange: function (swiper) {
          const activeIndex = swiper.activeIndex;
          updateThumbnailActive(activeIndex);
          if (thumbnailCarousel) {
            thumbnailCarousel.slideTo(activeIndex);
          }
        },
      },
    });

    // Similar cars carousel
    console.log("Initializing similar cars carousel...");

    // Check if Swiper is available
    if (typeof Swiper === "undefined") {
      console.error("Swiper is not loaded!");
      return;
    }

    // Check if similar cars container exists
    const similarCarsContainer = document.querySelector(".similar-cars-swiper");
    if (!similarCarsContainer) {
      console.error("Similar cars container not found!");
      return;
    }

    console.log("Similar cars container found:", similarCarsContainer);
    console.log(
      "Number of slides:",
      similarCarsContainer.querySelectorAll(".swiper-slide").length
    );

    try {
      similarCarsCarousel = new Swiper(".similar-cars-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false, // Disable loop to avoid issues
        navigation: {
          nextEl: ".similar-next",
          prevEl: ".similar-prev",
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        grabCursor: true,
        watchOverflow: true,
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
        on: {
          init: function () {
            console.log("Similar cars carousel initialized successfully");
            console.log("Carousel instance:", this);
          },
          slideChange: function () {
            console.log("Slide changed to:", this.activeIndex);
          },
        },
      });

      console.log(
        "Similar cars carousel created successfully:",
        similarCarsCarousel
      );
    } catch (error) {
      console.error("Error creating similar cars carousel:", error);
    }

    console.log("All carousels initialized successfully");

    // Initialize thumbnail active state
    updateThumbnailActive(0);
  } catch (error) {
    console.error("Error initializing carousels:", error);
  }
}

// Update thumbnail active state
function updateThumbnailActive(activeIndex) {
  const thumbnails = document.querySelectorAll(".thumbnail-image");
  thumbnails.forEach((thumb, index) => {
    if (index === activeIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  // Save button functionality
  const saveBtn = document.querySelector(".save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      toggleSave(this);
    });
  }

  // Action buttons
  const emailBtn = document.querySelector(".btn-outline-primary");
  const callBtn = document.querySelector(".btn-primary");
  const whatsappBtn = document.querySelector(".btn-success");

  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      handleEmailClick();
    });
  }

  if (callBtn) {
    callBtn.addEventListener("click", function () {
      handleCallClick();
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
      handleWhatsAppClick();
    });
  }

  // Create alert toggle
  const createAlertToggle = document.getElementById("createAlert");
  if (createAlertToggle) {
    createAlertToggle.addEventListener("change", function () {
      handleCreateAlert(this.checked);
    });
  }

  // See more features button
  const seeMoreFeaturesBtn = document.querySelector(
    ".features-section .btn-outline-primary"
  );
  if (seeMoreFeaturesBtn) {
    seeMoreFeaturesBtn.addEventListener("click", function () {
      toggleMoreFeatures();
    });
  }

  // Similar car cards click
  document.querySelectorAll(".similar-car-card").forEach((card) => {
    card.addEventListener("click", function () {
      const carTitle = this.querySelector(".car-title").textContent;
      handleSimilarCarClick(carTitle);
    });
  });

  // Thumbnail click functionality
  document.querySelectorAll(".thumbnail-image").forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      console.log(`Thumbnail ${index} clicked`);

      // Update main carousel
      if (mainCarousel) {
        mainCarousel.slideTo(index);
      }

      // Update thumbnail active state
      updateThumbnailActive(index);
    });
  });

  console.log("Event listeners setup complete");
}

// Load car data from URL parameters
function loadCarData() {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");
  const carTitle = urlParams.get("title");
  const carPrice = urlParams.get("price");

  if (carId) {
    console.log(`Loading car data for ID: ${carId}`);
    // In a real application, you would fetch car data from an API
    // For now, we'll use the URL parameters to update the page

    if (carTitle) {
      document.querySelector(".car-title").textContent = carTitle;
      document.title = `${carTitle} - Car Details | 7 States Auto`;
    }

    if (carPrice) {
      document.querySelector(".price").textContent = carPrice;
    }
  }
}

// Toggle save functionality
function toggleSave(button) {
  const icon = button.querySelector("i");
  const text = button.querySelector("span") || button.childNodes[2];

  if (icon.classList.contains("far")) {
    // Not saved - save it
    icon.classList.remove("far");
    icon.classList.add("fas");
    button.classList.remove("btn-light");
    button.classList.add("btn-primary");
    if (text) text.textContent = " Saved";

    // Show success message
    showNotification("Car saved to your favorites!", "success");
  } else {
    // Already saved - unsave it
    icon.classList.remove("fas");
    icon.classList.add("far");
    button.classList.remove("btn-primary");
    button.classList.add("btn-light");
    if (text) text.textContent = " Save";

    // Show info message
    showNotification("Car removed from favorites", "info");
  }
}

// Handle email click
function handleEmailClick() {
  const carTitle = document.querySelector(".car-title").textContent;
  const subject = `Inquiry about ${carTitle}`;
  const body = `Hi, I'm interested in the ${carTitle}. Please provide more details.`;

  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

// Handle call click
function handleCallClick() {
  // In a real application, this would show the dealer's phone number
  showNotification("Calling dealer: +971 50 123 4567", "info");

  // Simulate phone call
  setTimeout(() => {
    window.location.href = "tel:+971501234567";
  }, 1000);
}

// Handle WhatsApp click
function handleWhatsAppClick() {
  const carTitle = document.querySelector(".car-title").textContent;
  const message = `Hi, I'm interested in the ${carTitle}. Is it still available?`;

  const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
}

// Handle create alert toggle
function handleCreateAlert(isEnabled) {
  if (isEnabled) {
    showNotification(
      "Alert created! You will receive similar car notifications.",
      "success"
    );
  } else {
    showNotification("Alert disabled.", "info");
  }
}

// Toggle more features
function toggleMoreFeatures() {
  const hiddenFeatures = document.querySelectorAll(".feature-item.d-none");
  const button = document.querySelector(
    ".features-section .btn-outline-primary"
  );

  if (hiddenFeatures.length > 0) {
    // Show hidden features
    hiddenFeatures.forEach((feature) => {
      feature.classList.remove("d-none");
    });
    button.innerHTML =
      'Show less Features <i class="fas fa-chevron-up ms-2"></i>';
  } else {
    // Hide some features (simulate)
    const allFeatures = document.querySelectorAll(".feature-item");
    for (let i = 9; i < allFeatures.length; i++) {
      allFeatures[i].classList.add("d-none");
    }
    button.innerHTML =
      'See more Features <i class="fas fa-chevron-down ms-2"></i>';
  }
}

// Handle similar car click
function handleSimilarCarClick(carTitle) {
  showNotification(`Loading details for ${carTitle}...`, "info");

  // In a real application, this would navigate to the car's detail page
  setTimeout(() => {
    // Simulate navigation
    console.log(`Navigating to ${carTitle} details`);
  }, 1000);
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "success" ? "success" : type === "info" ? "info" : "warning"
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Navigation function for header
function sellMyCar() {
  window.location.href = "../sell-my-car/index.html";
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Initialize page with animation
function initializePageAnimations() {
  // Fade in sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all main sections
  document
    .querySelectorAll(
      ".highlights-section, .specifications-section, .features-section, .similar-cars-section"
    )
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializePageAnimations, 500);
});
