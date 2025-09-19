// JavaScript for 7 States project

// Car models data
const carModels = {
  bmw: [
    "3 Series",
    "5 Series",
    "7 Series",
    "X1",
    "X3",
    "X5",
    "X7",
    "Z4",
    "i3",
    "i8",
  ],
  ford: [
    "Fiesta",
    "Focus",
    "Mustang",
    "Explorer",
    "F-150",
    "Escape",
    "Edge",
    "Expedition",
  ],
  honda: [
    "Civic",
    "Accord",
    "CR-V",
    "Pilot",
    "Fit",
    "HR-V",
    "Passport",
    "Ridgeline",
  ],
  hyundai: [
    "Elantra",
    "Sonata",
    "Tucson",
    "Santa Fe",
    "Accent",
    "Veloster",
    "Palisade",
  ],
  toyota: [
    "Camry",
    "Corolla",
    "RAV4",
    "Highlander",
    "Prius",
    "Land Cruiser",
    "Prado",
    "Hilux",
  ],
  nissan: [
    "Altima",
    "Sentra",
    "Rogue",
    "Murano",
    "Pathfinder",
    "Patrol",
    "GT-R",
    "370Z",
  ],
  mercedes: [
    "C-Class",
    "E-Class",
    "S-Class",
    "GLA",
    "GLC",
    "GLE",
    "GLS",
    "A-Class",
  ],
  audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8"],
  lexus: ["ES", "IS", "GS", "LS", "NX", "RX", "GX", "LX", "LC", "RC"],
  porsche: [
    "911",
    "Cayenne",
    "Macan",
    "Panamera",
    "Taycan",
    "Boxster",
    "Cayman",
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap components

  // Handle mobile menu
  const mobileMenuToggle = document.querySelector(
    '[data-bs-target="#mobileMenu"]'
  );
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuToggle && mobileMenu) {
    console.log("Mobile menu initialized");
  }

  // Initialize search functionality
  initializeSearchForm();

  // Handle dropdown menus
  const dropdowns = document.querySelectorAll(".dropdown-toggle");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function () {
      // Bootstrap handles this automatically, but you can add custom logic here
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add active state to navigation items
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// Initialize search form functionality
function initializeSearchForm() {
  // Mobile dropdowns
  const makeSelect = document.getElementById("makeSelect");
  const modelSelect = document.getElementById("modelSelect");

  // Desktop dropdowns
  const makeSelectDesktop = document.getElementById("makeSelectDesktop");
  const modelSelectDesktop = document.getElementById("modelSelectDesktop");

  const searchForm = document.querySelector(".search-form");

  // Handle mobile make selection
  if (makeSelect && modelSelect) {
    makeSelect.addEventListener("change", function () {
      const selectedMake = this.value;
      updateModelDropdown(modelSelect, selectedMake);
    });
  }

  // Handle desktop make selection
  if (makeSelectDesktop && modelSelectDesktop) {
    makeSelectDesktop.addEventListener("change", function () {
      const selectedMake = this.value;
      updateModelDropdown(modelSelectDesktop, selectedMake);
    });
  }

  // Function to update model dropdown
  function updateModelDropdown(modelDropdown, selectedMake) {
    // Clear and disable model dropdown
    modelDropdown.innerHTML = '<option value="">Select Model</option>';
    modelDropdown.disabled = true;

    if (selectedMake && carModels[selectedMake]) {
      // Enable model dropdown and populate with models
      modelDropdown.disabled = false;
      carModels[selectedMake].forEach((model) => {
        const option = document.createElement("option");
        option.value = model.toLowerCase().replace(/\s+/g, "-");
        option.textContent = model;
        modelDropdown.appendChild(option);
      });
    }
  }

  // Handle search form submission
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Determine if we're on mobile or desktop and get appropriate values
      const isMobile = window.innerWidth < 992;

      const formData = {
        make: isMobile
          ? document.getElementById("makeSelect")?.value || ""
          : document.getElementById("makeSelectDesktop")?.value || "",
        model: isMobile
          ? document.getElementById("modelSelect")?.value || ""
          : document.getElementById("modelSelectDesktop")?.value || "",
        price: isMobile
          ? document.getElementById("priceSelect")?.value || ""
          : document.getElementById("priceSelectDesktop")?.value || "",
        vehicleType: isMobile
          ? document.getElementById("vehicleTypeSelect")?.value || ""
          : document.getElementById("vehicleTypeSelectDesktop")?.value || "",
        year: isMobile
          ? document.getElementById("yearSelect")?.value || ""
          : document.getElementById("yearSelectDesktop")?.value || "",
        kilometers: isMobile
          ? document.getElementById("kmSelect")?.value || ""
          : document.getElementById("kmSelectDesktop")?.value || "",
      };

      // Filter out empty values and create search params
      const searchParams = Object.entries(formData)
        .filter(([, value]) => value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      // Show search results (for demo purposes)
      console.log("Search parameters:", formData);

      // Count non-empty filters
      const activeFilters = Object.values(formData).filter(
        (value) => value !== ""
      ).length;
      const message =
        activeFilters > 0
          ? `Searching for cars with ${activeFilters} filter(s):\n${JSON.stringify(
              formData,
              null,
              2
            )}`
          : "Please select at least one filter to search.";

      alert(
        `${message}\n\nIn a real application, this would redirect to search results page.`
      );

      // In a real application, you would redirect to search results:
      if (searchParams) {
        console.log(`Would redirect to: /search?${searchParams}`);
        // window.location.href = `/search?${searchParams}`;
      }
    });
  }
}

// Function to handle responsive behavior
function handleResize() {
  const width = window.innerWidth;

  // Add any responsive JavaScript logic here
  if (width < 768) {
    // Mobile specific logic
    console.log("Mobile view");
  } else if (width < 1200) {
    // Tablet specific logic
    console.log("Tablet view");
  } else {
    // Desktop specific logic
    console.log("Desktop view");
  }
}

// Listen for window resize
window.addEventListener("resize", handleResize);

// Call on initial load
handleResize();

// Initialize Testimonials Swiper
function initializeTestimonialsSwiper() {
  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

// Initialize Car Brands Carousel
function initializeCarBrandsCarousel() {
  const carousel = document.querySelector(".car-brands-carousel");
  const nextBtn = document.querySelector(".brands-next-btn");
  const prevBtn = document.querySelector(".brands-prev-btn");
  const pages = document.querySelectorAll(".brands-page");

  if (carousel && nextBtn && prevBtn && pages.length > 0) {
    let currentPage = 0;
    const totalPages = pages.length;
    let autoRotateInterval;

    // Function to show specific page
    function showPage(pageIndex) {
      pages.forEach((page, index) => {
        page.classList.toggle("active", index === pageIndex);
      });

      // Update button states
      prevBtn.disabled = pageIndex === 0;
      nextBtn.disabled = pageIndex === totalPages - 1;
    }

    // Function to go to next page
    function nextPage() {
      if (currentPage < totalPages - 1) {
        currentPage++;
      } else {
        currentPage = 0; // Loop back to first page
      }
      showPage(currentPage);
    }

    // Function to go to previous page
    function prevPage() {
      if (currentPage > 0) {
        currentPage--;
      } else {
        currentPage = totalPages - 1; // Loop to last page
      }
      showPage(currentPage);
    }

    // Start auto-rotation
    function startAutoRotate() {
      autoRotateInterval = setInterval(nextPage, 3000); // 3 seconds
    }

    // Stop auto-rotation
    function stopAutoRotate() {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
      }
    }

    // Event listeners
    nextBtn.addEventListener("click", function () {
      stopAutoRotate();
      nextPage();
      startAutoRotate(); // Restart auto-rotation
    });

    prevBtn.addEventListener("click", function () {
      stopAutoRotate();
      prevPage();
      startAutoRotate(); // Restart auto-rotation
    });

    // Pause auto-rotation on hover
    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);

    // Initialize
    showPage(currentPage);
    startAutoRotate();
  }
}

// Initialize Car Comparisons Grid Navigation
function initializeCarComparisonsGrid() {
  const comparisonsGrid = document.querySelector(".car-comparisons-container");
  const nextBtn = document.querySelector(".comparisons-next-btn");
  const prevBtn = document.querySelector(".comparisons-prev-btn");

  if (comparisonsGrid && nextBtn && prevBtn) {
    let currentPage = 0;
    const totalPages = 3; // Assuming 3 pages of comparisons

    // Simple navigation - just for demo purposes
    nextBtn.addEventListener("click", function () {
      currentPage = (currentPage + 1) % totalPages;
      console.log("Next comparisons page:", currentPage);
      // In a real implementation, you would show/hide content or load new data
    });

    prevBtn.addEventListener("click", function () {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      console.log("Previous comparisons page:", currentPage);
      // In a real implementation, you would show/hide content or load new data
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper if it exists
  if (typeof Swiper !== "undefined") {
    if (document.querySelector(".testimonials-swiper")) {
      initializeTestimonialsSwiper();
    }
  }

  // Initialize carousel navigations
  if (document.querySelector(".car-brands-carousel")) {
    initializeCarBrandsCarousel();
  }

  if (document.querySelector(".car-comparisons-container")) {
    initializeCarComparisonsGrid();
  }
});
