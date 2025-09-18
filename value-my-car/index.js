// Car data for dynamic dropdowns
const carData = {
  toyota: {
    models: {
      camry: ["LE", "SE", "XLE", "XSE"],
      corolla: ["L", "LE", "SE", "XLE"],
      rav4: ["LE", "XLE", "Adventure", "Limited"],
      highlander: ["L", "LE", "XLE", "Limited"],
      prius: ["L Eco", "LE", "XLE", "Limited"],
    },
  },
  honda: {
    models: {
      civic: ["LX", "Sport", "EX", "Touring"],
      accord: ["LX", "Sport", "EX-L", "Touring"],
      crv: ["LX", "EX", "EX-L", "Touring"],
      pilot: ["LX", "EX", "EX-L", "Touring"],
    },
  },
  ford: {
    models: {
      focus: ["S", "SE", "SEL", "ST"],
      fusion: ["S", "SE", "SEL", "Titanium"],
      escape: ["S", "SE", "SEL", "Titanium"],
      explorer: ["Base", "XLT", "Limited", "Platinum"],
    },
  },
  chevrolet: {
    models: {
      malibu: ["L", "LS", "LT", "Premier"],
      cruze: ["L", "LS", "LT", "Premier"],
      equinox: ["L", "LS", "LT", "Premier"],
      tahoe: ["LS", "LT", "RST", "Premier"],
    },
  },
  nissan: {
    models: {
      altima: ["S", "SV", "SL", "Platinum"],
      sentra: ["S", "SV", "SR"],
      rogue: ["S", "SV", "SL", "Platinum"],
      pathfinder: ["S", "SV", "SL", "Platinum"],
    },
  },
  bmw: {
    models: {
      "3series": ["320i", "330i", "340i", "M3"],
      "5series": ["530i", "540i", "550i", "M5"],
      x3: ["sDrive30i", "xDrive30i", "M40i"],
      x5: ["sDrive40i", "xDrive40i", "M50i"],
    },
  },
  mercedes: {
    models: {
      cclass: ["C300", "C350e", "C43 AMG", "C63 AMG"],
      eclass: ["E300", "E350", "E43 AMG", "E63 AMG"],
      glc: ["GLC300", "GLC350e", "GLC43 AMG", "GLC63 AMG"],
      gle: ["GLE350", "GLE450", "GLE53 AMG", "GLE63 AMG"],
    },
  },
  audi: {
    models: {
      a3: ["Premium", "Premium Plus", "Prestige"],
      a4: ["Premium", "Premium Plus", "Prestige"],
      q3: ["Premium", "Premium Plus", "Prestige"],
      q5: ["Premium", "Premium Plus", "Prestige"],
    },
  },
};

// Generate years from current year back to 1990
function generateYears() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
  }
  return years;
}

// Initialize the form
document.addEventListener("DOMContentLoaded", function () {
  initializeForm();
  setupEventListeners();
});

function initializeForm() {
  // Populate years dropdown
  const yearSelect = document.getElementById("year");
  const years = generateYears();

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
}

function setupEventListeners() {
  // Make dropdown change handler
  document.getElementById("make").addEventListener("change", function () {
    const selectedMake = this.value;
    updateModels(selectedMake);
    clearVariants();
  });

  // Model dropdown change handler
  document.getElementById("model").addEventListener("change", function () {
    const selectedMake = document.getElementById("make").value;
    const selectedModel = this.value;
    updateVariants(selectedMake, selectedModel);
  });

  // Multi-step form functionality
  window.currentStep = 1;
  window.formData = {};

  // Form submission handler for Step 1
  document.getElementById("step1Form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleStep1Submission();
  });

  // Mileage input formatting
  document.getElementById("mileage").addEventListener("input", function (e) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value) {
      value = parseInt(value).toLocaleString() + " Km";
    }
    e.target.value = value;
  });

  // Location button handler
  document
    .querySelector(".location-btn")
    .addEventListener("click", function () {
      handleLocationSelection();
    });
}

function updateModels(make) {
  const modelSelect = document.getElementById("model");
  const variantSelect = document.getElementById("variant");

  // Clear existing options
  modelSelect.innerHTML = '<option value="">Select</option>';
  variantSelect.innerHTML = '<option value="">Select</option>';

  if (make && carData[make]) {
    const models = Object.keys(carData[make].models);
    models.forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model.charAt(0).toUpperCase() + model.slice(1);
      modelSelect.appendChild(option);
    });
  }
}

function updateVariants(make, model) {
  const variantSelect = document.getElementById("variant");

  // Clear existing options
  variantSelect.innerHTML = '<option value="">Select</option>';

  if (make && model && carData[make] && carData[make].models[model]) {
    const variants = carData[make].models[model];
    variants.forEach((variant) => {
      const option = document.createElement("option");
      option.value = variant;
      option.textContent = variant;
      variantSelect.appendChild(option);
    });
  }
}

function clearVariants() {
  const variantSelect = document.getElementById("variant");
  variantSelect.innerHTML = '<option value="">Select</option>';
}

// Step navigation functions
function goToStep(step) {
  // Hide current step
  document
    .querySelectorAll(".form-step")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".step")
    .forEach((s) => s.classList.remove("active", "completed"));
  document
    .querySelectorAll(".step-line")
    .forEach((l) => l.classList.remove("completed"));

  // Show target step
  document.getElementById(`step${step}`).classList.add("active");

  // Update stepper
  for (let i = 1; i <= 3; i++) {
    const stepElement = document.querySelector(`[data-step="${i}"]`);
    const stepLine = stepElement.nextElementSibling;

    if (i < step) {
      stepElement.classList.add("completed");
      if (stepLine && stepLine.classList.contains("step-line")) {
        stepLine.classList.add("completed");
      }
    } else if (i === step) {
      stepElement.classList.add("active");
    }
  }

  window.currentStep = step;

  // Calculate final value when reaching step 3
  if (step === 3) {
    calculateFinalValue();
  }
}

function handleStep1Submission() {
  // Collect form data
  const formData = {
    make: document.getElementById("make").value,
    model: document.getElementById("model").value,
    variant: document.getElementById("variant").value,
    year: document.getElementById("year").value,
    mileage: document.getElementById("mileage").value,
    fuelType: document.getElementById("fuelType").value,
    transmission: document.getElementById("transmission").value,
    trim: document.getElementById("trim").value,
    specifications: document.querySelector(
      'input[name="specifications"]:checked'
    )?.value,
    condition: document.querySelector('input[name="condition"]:checked')?.value,
    purpose: document.querySelector('input[name="purpose"]:checked')?.value,
  };

  // Validate required fields
  const requiredFields = [
    "make",
    "model",
    "variant",
    "year",
    "mileage",
    "fuelType",
    "transmission",
    "trim",
  ];
  const missingFields = requiredFields.filter((field) => !formData[field]);

  if (missingFields.length > 0) {
    showAlert("Please fill in all required fields.", "warning");
    return;
  }

  // Store form data
  window.formData = { ...window.formData, ...formData };

  // Go to step 2
  goToStep(2);
}

function calculateEstimatedValue(formData) {
  // Simple valuation logic (in real app, this would be an API call)
  let baseValue = 25000; // Base value in AED

  // Adjust based on year
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - parseInt(formData.year);
  baseValue -= carAge * 2000;

  // Adjust based on mileage
  const mileage = parseInt(formData.mileage.replace(/[^\d]/g, ""));
  if (mileage > 100000) {
    baseValue -= 5000;
  } else if (mileage > 50000) {
    baseValue -= 2000;
  }

  // Adjust based on condition
  switch (formData.condition) {
    case "excellent":
      baseValue += 3000;
      break;
    case "fair":
      baseValue -= 2000;
      break;
    case "poor":
      baseValue -= 5000;
      break;
  }

  // Adjust based on fuel type
  if (formData.fuelType === "electric") {
    baseValue += 5000;
  } else if (formData.fuelType === "hybrid") {
    baseValue += 3000;
  }

  // Ensure minimum value
  baseValue = Math.max(baseValue, 10000);

  return {
    estimated: baseValue,
    range: {
      min: Math.round(baseValue * 0.9),
      max: Math.round(baseValue * 1.1),
    },
  };
}

function showValuationResult(formData, valuation) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Your Car Valuation Result</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="text-center mb-4">
            <h2 class="text-primary">AED ${valuation.estimated.toLocaleString()}</h2>
            <p class="text-muted">Estimated Market Value</p>
            <p class="small">Range: AED ${valuation.range.min.toLocaleString()} - AED ${valuation.range.max.toLocaleString()}</p>
          </div>
          
          <div class="car-details">
            <h6>Car Details:</h6>
            <div class="row">
              <div class="col-md-6">
                <p><strong>Make:</strong> ${formData.make}</p>
                <p><strong>Model:</strong> ${formData.model}</p>
                <p><strong>Year:</strong> ${formData.year}</p>
                <p><strong>Mileage:</strong> ${formData.mileage}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Fuel Type:</strong> ${formData.fuelType}</p>
                <p><strong>Transmission:</strong> ${formData.transmission}</p>
                <p><strong>Condition:</strong> ${formData.condition}</p>
                <p><strong>Specifications:</strong> ${
                  formData.specifications
                }</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="proceedToSell()">Sell My Car</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  // Clean up modal after it's hidden
  modal.addEventListener("hidden.bs.modal", function () {
    document.body.removeChild(modal);
  });
}

function proceedToSell() {
  showAlert("Redirecting to sell your car page...", "success");
  // In real app, redirect to sell page
  setTimeout(() => {
    window.location.href = "../home/index.html#sell";
  }, 1500);
}

function handleLocationSelection() {
  // Simple location selection (in real app, this would integrate with maps API)
  const locations = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
  ];

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select Your Location</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="list-group">
            ${locations
              .map(
                (location) => `
              <button type="button" class="list-group-item list-group-item-action" onclick="selectLocation('${location}')">
                <i class="fas fa-map-marker-alt me-2"></i>${location}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  // Clean up modal after it's hidden
  modal.addEventListener("hidden.bs.modal", function () {
    document.body.removeChild(modal);
  });
}

function selectLocation(location) {
  document.querySelector(".location-text").textContent = location;
  // Close the modal
  const modal = document.querySelector(".modal");
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  showAlert(`Location set to ${location}`, "success");
}

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000);
}

// Step 3 functions
function calculateFinalValue() {
  const estimatedPrice = document.getElementById("estimatedPrice").value;

  // Calculate estimated value using existing logic
  const estimatedValue = calculateEstimatedValue(window.formData);

  let finalValue = estimatedValue.estimated;

  // If user provided estimate, use average
  if (estimatedPrice && !isNaN(estimatedPrice.replace(/,/g, ""))) {
    const userEstimate = parseInt(estimatedPrice.replace(/,/g, ""));
    finalValue = Math.round((estimatedValue.estimated + userEstimate) / 2);
  }

  const minValue = Math.round(finalValue * 0.95);
  const maxValue = Math.round(finalValue * 1.05);

  // Update final result
  document.getElementById("finalAmount").textContent =
    finalValue.toLocaleString();
  document.getElementById("finalAmountMax").textContent =
    maxValue.toLocaleString();

  return { finalValue, minValue, maxValue };
}

// Button handlers
function sellMyCar() {
  showAlert("Redirecting to sell your car page...", "success");
  // Redirect to sell car page
  setTimeout(() => {
    window.location.href = "../sell-my-car/index.html";
  }, 1500);
}

function startAgain() {
  // Reset form
  document.getElementById("step1Form").reset();
  document.getElementById("estimatedPrice").value = "";
  window.formData = {};

  // Reset dropdowns
  document.getElementById("model").innerHTML =
    '<option value="">Select Make First</option>';
  document.getElementById("variant").innerHTML =
    '<option value="">Select Model First</option>';

  // Go back to step 1
  goToStep(1);
}

function editDetails() {
  goToStep(1);
}

// Make functions globally available
window.goToStep = goToStep;
window.sellMyCar = sellMyCar;
window.startAgain = startAgain;
window.editDetails = editDetails;

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle button");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      const mobileMenu = document.getElementById("mobileMenu");
      mobileMenu.classList.toggle("show");
    });
  }
});
