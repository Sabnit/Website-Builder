// Loads templates
function loadTemplate(templateURL) {
  fetch(templateURL) // Fetch the template file
    .then((response) => response.text())
    // Get the response as text
    .then((data) => {
      const canvas = document.getElementById("template-container");
      // console.log(data);
      canvas.innerHTML = data; // Inject the template content into the canvas
    })
    .catch((error) => console.error("Error fetching template:", error));
}

const container = document.getElementById("template-container");

container.addEventListener("mousedown", function (event) {
  const divs = document.querySelectorAll("#template-container div");
  divs.forEach((div) => {
    div.style.border = "1px solid red";
    console.log(div);
  });
  console.log(divs);
  const draggable = event.target.closest(".draggable");

  if (!draggable) return;
  event.preventDefault();
  let shiftX = event.clientX - draggable.getBoundingClientRect().left;
  let shiftY = event.clientY - draggable.getBoundingClientRect().top;

  draggable.style.position = "absolute";
  draggable.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    draggable.style.left = pageX - shiftX + "px";
    draggable.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  draggable.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", onMouseMove);
    draggable.removeEventListener("mouseup", onMouseMove);
  });
});

container.addEventListener("dragstart", function () {
  return false;
});
