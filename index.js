// dropdown functionality
document
  .querySelector("#trigonometry-dropdown")
  .addEventListener("click", trigonometryFunction);
 
document
  .querySelector("#functional-dropdown")
  .addEventListener("click", functionDropdown);
 
function trigonometryFunction() {
  document.getElementById("trigonometryDropdown").classList.toggle("show");
}
 
function functionDropdown() {
  document.getElementById("functionDropdown").classList.toggle("showFn");
}
 
window.onclick = function (event) {
  let trigDropdown = document.getElementById("trigonometryDropdown");
  let funcDropdown = document.getElementById("functionDropdown");
 
  if (!event.target.closest(".dropbtn")) {
    if (trigDropdown.classList.contains("show")) {
      trigDropdown.classList.remove("show");
    }
  }
 
  if (!event.target.closest(".functionDropbtn")) {
    if (funcDropdown.classList.contains("showFn")) {
      funcDropdown.classList.remove("showFn");
    }
  }
};

