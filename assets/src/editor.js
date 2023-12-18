// Elements related to adding elements
const addElementIcon = document.querySelector(".add-element-icon");
const infoBoxElement = document.querySelector(".info-box-element");
const addElementPanel = document.querySelector(".add-element-panel");

// Elements related to selecting templates
const selectTemplateIcon = document.querySelector(".select-templates-icon");
const infoBoxTemplate = document.querySelector(".info-box-template");
const addTemplatePanel = document.querySelector(".add-template-panel");

// Cancel icons
const cancelIcons = document.querySelectorAll(".exit");

// Event listeners for adding elements
addElementIcon.addEventListener("mouseover", () => {
  infoBoxElement.style.display = "block";
});

addElementIcon.addEventListener("mouseout", () => {
  infoBoxElement.style.display = "none";
});

addElementIcon.addEventListener("click", () => {
  addElementPanel.style.display = "block";
  addTemplatePanel.style.display = "none";
});

// Event listeners for selecting templates
selectTemplateIcon.addEventListener("mouseover", () => {
  infoBoxTemplate.style.display = "block";
});

selectTemplateIcon.addEventListener("mouseout", () => {
  infoBoxTemplate.style.display = "none";
});

selectTemplateIcon.addEventListener("click", () => {
  addTemplatePanel.style.display = "block";
  addElementPanel.style.display = "none";
});

// Event listener for cancel icons
cancelIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const parentPanel = icon.closest(".add-element-panel, .add-template-panel");
    if (parentPanel) {
      parentPanel.style.display = "none";
    }
  });
});

// Function to create a new section
function createSection() {
  // Create a new section element
  const newSection = document.createElement("div");
  newSection.classList.add("section");

  // You can customize the content or styles of the section here
  newSection.innerHTML =
    "<h2>New Section</h2><p>This is a new section added dynamically.</p>";

  // Append the new section to the sections container
  const sectionsContainer = document.getElementById("main");
  sectionsContainer.appendChild(newSection);
}

// Event listener for adding a new section when the button is clicked
// const addSectionBtn = document.getElementById("add-section-btn");
// addSectionBtn.addEventListener("click", createSection);

// Elements related to styling elements
const fontSelect = document.getElementById("font-select");
const fontWeight = document.getElementById("weight-select");
const fontSize = document.getElementById("size");
let LogoClickedListener = false;
let navClickedListener = false;

let logo, navbar;

function loadHeader() {
  fetch("./templates/header_template_1.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById(
        "header-layout-container"
      );
      headerContainer.innerHTML = data;

      // Find logo and navbar elements within the loaded template
      logo = headerContainer.querySelector(".template-logo p");
      navbar = headerContainer.querySelector(".navbar ul");

      // Function to apply styles and border on click
      function applyBorder(element) {
        element.style.border = "2px solid blue";
      }

      // Event listeners for logo and navbar elements
      logo.addEventListener("click", function () {
        navbar.style.border = ""; // Remove border from navbar
        getStyleInfo(logo);
        applyBorder(logo); // Apply border to clicked logo
        LogoClickedListener = true;
        navClickedListener = false;
        fontUpdateColor(logo);
      });

      navbar.addEventListener("click", function () {
        logo.style.border = ""; // Remove border from logo
        getStyleInfo(navbar);
        applyBorder(navbar); // Apply border to clicked navbar
        navClickedListener = true;
        LogoClickedListener = false;
      });
    })
    .catch((error) => console.error("Error fetching header template:", error));
}

function removeQuotesFromFontFamily(fontFamily) {
  // Check if the font-family value contains quotes
  if (fontFamily.startsWith('"') && fontFamily.endsWith('"')) {
    // Remove quotes from the font-family value
    return fontFamily.slice(1, -1);
  } else {
    return fontFamily; // No quotes, return the original value
  }
}

function removePxFromFontSize(stringValue) {
  return stringValue.replace("px", "");
}

// send logo and navbar style
function getStyleInfo(element) {
  const computedStyles = window.getComputedStyle(element);

  const size = removePxFromFontSize(computedStyles.fontSize);
  const font = removeQuotesFromFontFamily(computedStyles.fontFamily);
  const weight = computedStyles.fontWeight;

  fontSize.value = size;
  fontSelect.value = font;
  fontWeight.value = weight;
}

function changeStyle() {
  const selectedFont = fontSelect.value;
  const selectedFontSize = fontSize.value + "px";
  const selectedFontWeight = fontWeight.value;

  // console.log(clickedListener);
  if (LogoClickedListener) {
    logo.style.fontFamily = selectedFont;
    logo.style.fontSize = selectedFontSize;
    logo.style.fontWeight = selectedFontWeight;
  }

  if (navClickedListener) {
    navbar.style.fontFamily = selectedFont;
    navbar.style.fontSize = selectedFontSize;
    navbar.style.fontWeight = selectedFontWeight;
  }
}

fontSelect.addEventListener(
  "change",
  changeStyle // Apply font change to logo when select changes
);

fontSize.addEventListener(
  "input",
  changeStyle // Apply font change to logo when select changes
);

fontWeight.addEventListener(
  "change",
  changeStyle // Apply font change to logo when select changes
);

// Event listener for color-box click to display the font color palette
const fontRGBBox = document.querySelector(".color-palette-box");
const fontColorPalette = document.getElementById("color-palette");
const fontColorInput = document.getElementById("color-box");

const backgroundRGBBox = document.querySelector(
  ".background-color-palette-box"
);
const backgroundColorPalette = document.getElementById(
  "background-color-palette"
);
const backgroundColorInput = document.getElementById("background-color-box");

let fontRGBBoxClicked = false;
let backgroundRGBBoxClicked = false;

fontRGBBox.addEventListener("click", () => {
  fontColorPalette.style.display = "block";
  fontRGBBoxClicked = true;
});

backgroundRGBBox.addEventListener("click", () => {
  backgroundColorPalette.style.display = "block";
  backgroundRGBBoxClicked = true;
});

// Function to update the color based on RGB sliders
function backgroundUpdateColor() {
  if (LogoClickedListener) {
    const colorEntered = backgroundColorInput.value;
    logo.style.color = colorEntered;
  }
}

function backgroundRGBColorBox() {
  const red = document.getElementById("background-red").value;
  const green = document.getElementById("background-green").value;
  const blue = document.getElementById("background-blue").value;

  const color = `RGB(${red},${green},${blue})`;

  // Update the color-box input value with the new color
  backgroundColorInput.value = color;
}

// Function to update the color based on RGB sliders
function fontUpdateColor() {
  if (LogoClickedListener) {
    const colorEntered = fontColorInput.value;
    logo.style.color = colorEntered;
  }
}

function fontRGBColorBox() {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;

  const color = `RGB(${red},${green},${blue})`;

  // Update the color-box input value with the new color
  fontColorInput.value = color;
}

// event listeners for color input
fontColorInput.addEventListener("input", fontUpdateColor);
backgroundColorInput.addEventListener("input", backgroundUpdateColor);

// Event listeners for font RGB sliders
const fontRedSlider = document.getElementById("red");
const fontGreenSlider = document.getElementById("green");
const fontBlueSlider = document.getElementById("blue");

fontRedSlider.addEventListener("input", fontRGBColorBox);
fontGreenSlider.addEventListener("input", fontRGBColorBox);
fontBlueSlider.addEventListener("input", fontRGBColorBox);

// Event listeners for RGB sliders
const backgroundRedSlider = document.getElementById("background-red");
const backgroundGreenSlider = document.getElementById("background-green");
const backgroundBlueSlider = document.getElementById("background-blue");

backgroundRedSlider.addEventListener("input", fontRGBColorBox);
backgroundGreenSlider.addEventListener("input", fontRGBColorBox);
backgroundBlueSlider.addEventListener("input", fontRGBColorBox);

// Function to synchronize the sliders with the color values
function syncSliders() {
  const colorValues = fontColorInput.value
    .substring(4, fontColorInput.value.length - 1)
    .split(",");
  redSlider.value = colorValues[0].trim();
  greenSlider.value = colorValues[1].trim();
  blueSlider.value = colorValues[2].trim();
}

// Event listener for color box input changes
fontColorInput.addEventListener("input", syncSliders);

function loadSection() {
  fetch("./templates/section_template_1.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById(
        "section-layout-container"
      );
      // console.log(headerContainer);
      headerContainer.innerHTML = data;
    })
    .catch((error) => console.error("Error fetching header template:", error));
}

function loadFooter() {
  fetch("./templates/footer_template_1.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById(
        "footer-layout-container"
      );
      // console.log(headerContainer);
      headerContainer.innerHTML = data;
    })
    .catch((error) => console.error("Error fetching header template:", error));
}

loadHeader();
loadSection();
loadFooter();

let highlightedContainer = null; // Global variable to track the currently highlighted container

// Function to handle hover effects
function applyHoverEffect(targetSelector, backgroundColor, titleSelector) {
  document.addEventListener("mouseover", function (event) {
    const target = document.querySelector(targetSelector);
    const layoutTitle = document.querySelector(titleSelector);

    if (highlightedContainer !== null && target === highlightedContainer)
      return;

    if (event.target.closest(targetSelector) === target) {
      target.style.backgroundColor = backgroundColor; // Apply hover color
      layoutTitle.style.display = "block";
    } else {
      target.style.backgroundColor = ""; // Reset the color
      layoutTitle.style.display = "none";
    }
  });
}

// Function to handle click events for layout containers to add border lines
function handleClickEvent(containerId, templateClass) {
  document.getElementById(containerId).addEventListener("click", function () {
    // Remove border from previously clicked container
    if (highlightedContainer !== null) {
      highlightedContainer.style.outline = "";
    }

    // Add border to the clicked container
    const clickedContainer = document.getElementById(containerId);
    clickedContainer.style.outline = "2px dotted red";

    highlightedContainer = clickedContainer; // Update the highlighted container
  });
}

// Attach click event handlers to layout containers
handleClickEvent("header-layout-wrapper", ".template-header");
handleClickEvent("section-layout-wrapper", ".template-section");
handleClickEvent("footer-layout-wrapper", ".template-footer");

// Hover Effect on Header
applyHoverEffect(".template-header", "lightgray", ".header-layout-info-title");

// Hover Effect on Section
applyHoverEffect(".template-section", "#f9eed8", ".section-layout-info-title");

// Hover Effect on Footer
applyHoverEffect(".template-footer", "red", ".footer-layout-info-title");
