const zoomIn = document.getElementById("zoom-in");
const zoomOut = document.getElementById("zoom-out");
const zoomInHover = document.getElementById("hover-info-zoom-out");
const zoomOutHover = document.getElementById("hover-info-zoom-in");

zoomOut.style.display = "flex";
zoomIn.style.display = "none";
zoomOutHover.style.display = "none";

zoomOut.addEventListener("click", () => {
  zoomIn.style.display = "flex";
  zoomOut.style.display = "none";
  zoomInHover.style.display = "none";
  zoomOutHover.style.display = "block";
});

zoomIn.addEventListener("click", () => {
  zoomIn.style.display = "none";
  zoomOut.style.display = "flex";
  zoomInHover.style.display = "block";
  zoomOutHover.style.display = "none";
});
