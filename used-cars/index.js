// Sample car data
const carData = [
  {
    id: 1,
    title: "Audi Q3 Sportback",
    price: "94,900",
    year: "2024",
    mileage: "0",
    location: "Dubai",
    make: "audi",
    model: "q3",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Audi A4 Premium Plus 2024",
    price: "111,400",
    year: "2024",
    mileage: "0",
    location: "Dubai",
    make: "audi",
    model: "a4",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Audi Q3 Sportback",
    price: "150,800",
    year: "2024",
    mileage: "0",
    location: "Dubai",
    make: "audi",
    model: "q3",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "BMW X5 M Sport",
    price: "185,000",
    year: "2023",
    mileage: "15000",
    location: "Abu Dhabi",
    make: "bmw",
    model: "x5",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Mercedes-Benz C-Class",
    price: "125,000",
    year: "2023",
    mileage: "8000",
    location: "Sharjah",
    make: "mercedes",
    model: "c-class",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Toyota Land Cruiser",
    price: "220,000",
    year: "2022",
    mileage: "25000",
    location: "Dubai",
    make: "toyota",
    model: "land-cruiser",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
  },
  {
    id: 7,
    title: "Nissan Patrol Platinum",
    price: "195,000",
    year: "2023",
    mileage: "12000",
    location: "Al Ain",
    make: "nissan",
    model: "patrol",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
  },
  {
    id: 8,
    title: "Lexus ES 350",
    price: "145,000",
    year: "2023",
    mileage: "5000",
    location: "Dubai",
    make: "lexus",
    model: "es",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=250&fit=crop",
  },
  {
    id: 9,
    title: "Ford Mustang GT",
    price: "165,000",
    year: "2024",
    mileage: "2000",
    location: "Dubai",
    make: "ford",
    model: "mustang",
    type: "coupe",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
  },
];

let filteredCars = [...carData];
let currentFilters = {
  search: "",
  make: "",
  model: "",
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
  minMileage: "",
  maxMileage: "",
  location: "",
  type: "",
  transmission: "",
  fuelType: "",
  bodyColor: "",
  sortBy: "relevance",
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // Check for URL parameters
  checkURLParameters();

  // Render initial cars
  renderCars();

  // Setup event listeners
  setupEventListeners();

  console.log("Initialization complete");
});

// Check URL parameters for filtering
function checkURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter");
  const value = urlParams.get("value");

  if (filter && value) {
    // Apply the filter based on URL parameters
    switch (filter) {
      case "location":
        currentFilters.location = value;
        break;
      case "make":
        currentFilters.make = value;
        document.getElementById("makeFilter").value = value;
        break;
      case "model":
        currentFilters.model = value;
        break;
      case "type":
        currentFilters.type = value;
        break;
    }

    // Update the results count based on filter
    updateResultsCount(filter, value);
  }
}

// Update results count based on filter
function updateResultsCount(filter, value) {
  const resultsElement = document.getElementById("resultsCount");
  let filterText = "";

  switch (filter) {
    case "location":
      filterText = `Used cars in ${value.toUpperCase()}`;
      break;
    case "make":
      filterText = `${
        value.charAt(0).toUpperCase() + value.slice(1)
      } Used cars`;
      break;
    case "model":
      filterText = `${value.replace("-", " ").toUpperCase()} Used cars`;
      break;
    case "type":
      filterText = `${
        value.charAt(0).toUpperCase() + value.slice(1)
      } Used cars`;
      break;
    default:
      filterText = "Used cars";
  }

  resultsElement.textContent = `${filteredCars.length} ${filterText}`;
}

// Setup event listeners
function setupEventListeners() {
  console.log("Setting up event listeners...");

  // Test if transmission buttons exist
  const transmissionBtns = document.querySelectorAll(".transmission-btn");
  console.log("Found transmission buttons:", transmissionBtns.length);

  // Search functionality
  const carSearch = document.getElementById("carSearch");
  if (carSearch) {
    carSearch.addEventListener("input", function (e) {
      currentFilters.search = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // Filter dropdowns
  const makeFilter = document.getElementById("makeFilter");
  if (makeFilter) {
    makeFilter.addEventListener("change", function (e) {
      currentFilters.make = e.target.value;
      applyFilters();
    });
  }

  const modelFilter = document.getElementById("modelFilter");
  if (modelFilter) {
    modelFilter.addEventListener("change", function (e) {
      currentFilters.model = e.target.value;
      applyFilters();
    });
  }

  const sortBy = document.getElementById("sortBy");
  if (sortBy) {
    sortBy.addEventListener("change", function (e) {
      currentFilters.sortBy = e.target.value;
      applyFilters();
    });
  }

  // Price range inputs
  const minPrice = document.getElementById("minPrice");
  if (minPrice) {
    minPrice.addEventListener("input", function (e) {
      currentFilters.minPrice = e.target.value;
      applyFilters();
    });
  }

  const maxPrice = document.getElementById("maxPrice");
  if (maxPrice) {
    maxPrice.addEventListener("input", function (e) {
      currentFilters.maxPrice = e.target.value;
      applyFilters();
    });
  }

  // Year range
  const minYear = document.getElementById("minYear");
  if (minYear) {
    minYear.addEventListener("change", function (e) {
      currentFilters.minYear = e.target.value;
      applyFilters();
    });
  }

  const maxYear = document.getElementById("maxYear");
  if (maxYear) {
    maxYear.addEventListener("change", function (e) {
      currentFilters.maxYear = e.target.value;
      applyFilters();
    });
  }

  // Mileage range
  const minMileage = document.getElementById("minMileage");
  if (minMileage) {
    minMileage.addEventListener("input", function (e) {
      currentFilters.minMileage = e.target.value;
      applyFilters();
    });
  }

  const maxMileage = document.getElementById("maxMileage");
  if (maxMileage) {
    maxMileage.addEventListener("input", function (e) {
      currentFilters.maxMileage = e.target.value;
      applyFilters();
    });
  }

  // Clear filters
  const clearFiltersBtn = document.querySelector(".clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function (e) {
      e.preventDefault();
      clearAllFilters();
    });
  }

  // View toggle buttons
  document.querySelectorAll(".view-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".view-toggle")
        .forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const view = this.dataset.view;
      toggleView(view);
    });
  });

  // Favorite buttons
  document.addEventListener("click", function (e) {
    if (e.target.closest(".favorite-btn")) {
      e.preventDefault();
      toggleFavorite(e.target.closest(".favorite-btn"));
    }
  });

  // Transmission buttons
  const transmissionButtons = document.querySelectorAll(".transmission-btn");
  console.log("Setting up transmission buttons:", transmissionButtons.length);

  transmissionButtons.forEach((btn, index) => {
    console.log(`Button ${index}:`, btn.textContent, btn.dataset.transmission);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Transmission button clicked:", this.dataset.transmission);

      // Remove active class from all buttons
      document.querySelectorAll(".transmission-btn").forEach((b) => {
        b.classList.remove("active");
        console.log("Removed active from:", b.textContent);
      });

      // Add active class to clicked button
      this.classList.add("active");
      console.log("Added active to:", this.textContent);

      currentFilters.transmission = this.dataset.transmission;
      applyFilters();
    });
  });

  // Fuel type buttons
  const fuelTypeButtons = document.querySelectorAll(".fuel-type-btn");
  console.log("Setting up fuel type buttons:", fuelTypeButtons.length);

  fuelTypeButtons.forEach((btn, index) => {
    console.log(`Fuel Button ${index}:`, btn.textContent, btn.dataset.fuel);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Fuel type button clicked:", this.dataset.fuel);

      // Remove active class from all buttons
      document.querySelectorAll(".fuel-type-btn").forEach((b) => {
        b.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");
      console.log("Added active to fuel:", this.textContent);

      currentFilters.fuelType = this.dataset.fuel;
      applyFilters();
    });
  });

  // Body type buttons
  document.querySelectorAll(".body-type-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".body-type-item")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      currentFilters.type = this.dataset.type;
      applyFilters();
    });
  });

  // Body color buttons
  document.querySelectorAll(".color-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".color-item")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      currentFilters.bodyColor = this.dataset.color;
      applyFilters();
    });
  });

  // Quick select buttons
  document.querySelectorAll(".quick-select-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const section = this.closest(".filter-section");
      section
        .querySelectorAll(".quick-select-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Handle different quick select types
      if (this.dataset.price) {
        const [min, max] = this.dataset.price.split("-");
        currentFilters.minPrice = min;
        currentFilters.maxPrice = max;
        document.getElementById("minPriceSelect").value = min;
        document.getElementById("maxPriceSelect").value = max;
      } else if (this.dataset.year) {
        const [min, max] = this.dataset.year.split("-");
        currentFilters.minYear = min;
        currentFilters.maxYear = max;
        document.getElementById("minYearSelect").value = min;
        document.getElementById("maxYearSelect").value = max;
      } else if (this.dataset.mileage) {
        const [min, max] = this.dataset.mileage.split("-");
        currentFilters.minMileage = min;
        currentFilters.maxMileage = max;
        document.getElementById("minMileageSelect").value = min;
        document.getElementById("maxMileageSelect").value = max;
      }

      applyFilters();
    });
  });

  // Price select dropdowns
  document
    .getElementById("minPriceSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.minPrice = e.target.value;
      applyFilters();
    });

  document
    .getElementById("maxPriceSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.maxPrice = e.target.value;
      applyFilters();
    });

  // Year select dropdowns
  document
    .getElementById("minYearSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.minYear = e.target.value;
      applyFilters();
    });

  document
    .getElementById("maxYearSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.maxYear = e.target.value;
      applyFilters();
    });

  // Mileage select dropdowns
  document
    .getElementById("minMileageSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.minMileage = e.target.value;
      applyFilters();
    });

  document
    .getElementById("maxMileageSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.maxMileage = e.target.value;
      applyFilters();
    });
}

// Apply all filters
function applyFilters() {
  filteredCars = carData.filter((car) => {
    // Search filter
    if (
      currentFilters.search &&
      !car.title.toLowerCase().includes(currentFilters.search)
    ) {
      return false;
    }

    // Make filter
    if (currentFilters.make && car.make !== currentFilters.make) {
      return false;
    }

    // Model filter
    if (currentFilters.model && car.model !== currentFilters.model) {
      return false;
    }

    // Price range filter
    const carPrice = parseInt(car.price.replace(",", ""));
    if (
      currentFilters.minPrice &&
      carPrice < parseInt(currentFilters.minPrice)
    ) {
      return false;
    }
    if (
      currentFilters.maxPrice &&
      carPrice > parseInt(currentFilters.maxPrice)
    ) {
      return false;
    }

    // Year range filter
    if (
      currentFilters.minYear &&
      parseInt(car.year) < parseInt(currentFilters.minYear)
    ) {
      return false;
    }
    if (
      currentFilters.maxYear &&
      parseInt(car.year) > parseInt(currentFilters.maxYear)
    ) {
      return false;
    }

    // Mileage range filter
    const carMileage = parseInt(car.mileage);
    if (
      currentFilters.minMileage &&
      carMileage < parseInt(currentFilters.minMileage)
    ) {
      return false;
    }
    if (
      currentFilters.maxMileage &&
      carMileage > parseInt(currentFilters.maxMileage)
    ) {
      return false;
    }

    // Location filter
    if (
      currentFilters.location &&
      car.location.toLowerCase() !== currentFilters.location.toLowerCase()
    ) {
      return false;
    }

    // Type filter
    if (currentFilters.type && car.type !== currentFilters.type) {
      return false;
    }

    return true;
  });

  // Apply sorting
  applySorting();

  // Reset to first page when filters change
  currentPage = 1;

  // Re-render cars
  renderCars();

  // Update results count
  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.textContent = `${filteredCars.length} Used cars`;
  }
}

// Apply sorting
function applySorting() {
  switch (currentFilters.sortBy) {
    case "price-low":
      filteredCars.sort(
        (a, b) =>
          parseInt(a.price.replace(",", "")) -
          parseInt(b.price.replace(",", ""))
      );
      break;
    case "price-high":
      filteredCars.sort(
        (a, b) =>
          parseInt(b.price.replace(",", "")) -
          parseInt(a.price.replace(",", ""))
      );
      break;
    case "year-new":
      filteredCars.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      break;
    case "year-old":
      filteredCars.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      break;
    case "mileage-low":
      filteredCars.sort((a, b) => parseInt(a.mileage) - parseInt(b.mileage));
      break;
    default:
      // Keep original order for relevance
      break;
  }
}

// Render cars
function renderCars() {
  const carGrid = document.getElementById("carGrid");
  if (!carGrid) {
    console.error("Car grid element not found");
    return;
  }

  if (filteredCars.length === 0) {
    carGrid.innerHTML = `
      <div class="col-12">
        <div class="no-results text-center py-5">
          <h5 class="text-muted mb-3">No cars found matching your criteria</h5>
          <p class="text-muted">Try adjusting your filters</p>
        </div>
      </div>
    `;
    const paginationContainer = document.querySelector(".pagination");
    if (paginationContainer && paginationContainer.parentElement) {
      paginationContainer.parentElement.style.display = "none";
    }
    return;
  }

  const carsToShow = getPaginatedCars();

  carGrid.innerHTML = carsToShow
    .map(
      (car) => `
    <div class="car-card bg-white rounded-3 shadow-sm overflow-hidden" onclick="openCarDetails(${car.id}, '${car.title}', '${car.price}')" style="cursor: pointer;">
      <div class="car-image-container position-relative">
        <img src="${car.image}" alt="${car.title}" class="car-image">
        <button class="btn btn-sm btn-light favorite-btn position-absolute" data-car-id="${car.id}" onclick="event.stopPropagation();">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="car-details p-3">
        <h6 class="car-title mb-2">${car.title}</h6>
        <p class="car-price mb-2 fw-bold text-primary">AED ${car.price}</p>
        <div class="car-specs d-flex justify-content-between text-muted small">
          <span><i class="fas fa-calendar me-1"></i> ${car.year}</span>
          <span><i class="fas fa-tachometer-alt me-1"></i> ${car.mileage} km</span>
          <span><i class="fas fa-map-marker-alt me-1"></i> ${car.location}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Setup pagination
  setupPagination();
}

// Clear all filters
function clearAllFilters() {
  currentFilters = {
    search: "",
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
    location: "",
    type: "",
    transmission: "",
    fuelType: "",
    bodyColor: "",
    sortBy: "relevance",
  };

  // Reset form elements
  document.getElementById("carSearch").value = "";
  document.getElementById("makeFilter").value = "";
  document.getElementById("modelFilter").value = "";
  document.getElementById("sortBy").value = "relevance";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("minYear").value = "";
  document.getElementById("maxYear").value = "";
  document.getElementById("minMileage").value = "";
  document.getElementById("maxMileage").value = "";

  // Reset dropdown selectors
  document.getElementById("minPriceSelect") &&
    (document.getElementById("minPriceSelect").value = "");
  document.getElementById("maxPriceSelect") &&
    (document.getElementById("maxPriceSelect").value = "");
  document.getElementById("minYearSelect") &&
    (document.getElementById("minYearSelect").value = "");
  document.getElementById("maxYearSelect") &&
    (document.getElementById("maxYearSelect").value = "");
  document.getElementById("minMileageSelect") &&
    (document.getElementById("minMileageSelect").value = "");
  document.getElementById("maxMileageSelect") &&
    (document.getElementById("maxMileageSelect").value = "");

  // Reset button states
  document
    .querySelectorAll(".transmission-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".fuel-type-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".body-type-item")
    .forEach((btn) => btn.classList.remove("selected"));
  document
    .querySelectorAll(".color-item")
    .forEach((btn) => btn.classList.remove("selected"));
  document
    .querySelectorAll(".quick-select-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // Set default active states
  document
    .querySelector(".transmission-btn[data-transmission='automatic']")
    ?.classList.add("active");
  document
    .querySelector(".fuel-type-btn[data-fuel='petrol']")
    ?.classList.add("active");

  // Clear selected filter badges
  document.querySelector(".selected-filters") &&
    (document.querySelector(".selected-filters").innerHTML = "");

  // Reset filtered cars and re-render
  filteredCars = [...carData];
  renderCars();
  document.getElementById(
    "resultsCount"
  ).textContent = `${filteredCars.length} Used cars`;
}

// Toggle view (grid/list)
function toggleView(view) {
  const carGrid = document.getElementById("carGrid");

  if (view === "list") {
    carGrid.classList.add("list-view");
  } else {
    carGrid.classList.remove("list-view");
  }
}

// Toggle favorite
function toggleFavorite(button) {
  const icon = button.querySelector("i");

  if (icon.classList.contains("far")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
    button.style.color = "#dc3545";
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
    button.style.color = "#6b7280";
  }
}

// Pagination functionality
let currentPage = 1;
const carsPerPage = 9;

function setupPagination() {
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginationContainer = document.querySelector(".pagination");

  if (totalPages <= 1) {
    paginationContainer.parentElement.style.display = "none";
    return;
  }

  paginationContainer.parentElement.style.display = "flex";

  // Clear existing pagination
  paginationContainer.innerHTML = "";

  // Previous button
  const prevItem = document.createElement("li");
  prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevItem.innerHTML = `
    <a class="page-link" href="#" aria-label="Previous" data-page="${
      currentPage - 1
    }">
      <span aria-hidden="true">PREV</span>
    </a>
  `;
  paginationContainer.appendChild(prevItem);

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    const firstItem = document.createElement("li");
    firstItem.className = "page-item";
    firstItem.innerHTML = `<a class="page-link" href="#" data-page="1">1</a>`;
    paginationContainer.appendChild(firstItem);

    if (startPage > 2) {
      const dotsItem = document.createElement("li");
      dotsItem.className = "page-item disabled";
      dotsItem.innerHTML = `<a class="page-link" href="#">...</a>`;
      paginationContainer.appendChild(dotsItem);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
    paginationContainer.appendChild(pageItem);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dotsItem = document.createElement("li");
      dotsItem.className = "page-item disabled";
      dotsItem.innerHTML = `<a class="page-link" href="#">...</a>`;
      paginationContainer.appendChild(dotsItem);
    }

    const lastItem = document.createElement("li");
    lastItem.className = "page-item";
    lastItem.innerHTML = `<a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>`;
    paginationContainer.appendChild(lastItem);
  }

  // Next button
  const nextItem = document.createElement("li");
  nextItem.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextItem.innerHTML = `
    <a class="page-link" href="#" aria-label="Next" data-page="${
      currentPage + 1
    }">
      <span aria-hidden="true">NEXT</span>
    </a>
  `;
  paginationContainer.appendChild(nextItem);

  // Add click event listeners
  paginationContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const link = e.target.closest("a[data-page]");
    if (link && !link.parentElement.classList.contains("disabled")) {
      const page = parseInt(link.dataset.page);
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderCars();
        setupPagination();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });
}

function getPaginatedCars() {
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  return filteredCars.slice(startIndex, endIndex);
}

// Open car details page
function openCarDetails(carId, carTitle, carPrice) {
  const params = new URLSearchParams({
    id: carId,
    title: carTitle,
    price: carPrice,
  });

  window.location.href = `../car-details/index.html?${params.toString()}`;
}
