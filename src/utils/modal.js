//Setting varaibles from the queries
var btn = document.getElementById("modal_opener");
var modal = document.querySelector(".modal");

//Generate methods for toggle the Modal
function attachModalListeners(modalElm) {
  modalElm.querySelector(".close_modal").addEventListener("click", toggleModal);
  modalElm.querySelector(".overlay").addEventListener("click", toggleModal);
}

//Detatch the modal from the queries
function detachModalListeners(modalElm) {
  modalElm
    .querySelector(".close_modal")
    .removeEventListener("click", toggleModal);
  modalElm.querySelector(".overlay").removeEventListener("click", toggleModal);
}

//Resspnsible for action the toggling the methods
function toggleModal() {
  var currentState = modal.style.display;

  // If modal is visible, hide it. Else, display it.
  if (currentState === "none") {
    modal.style.display = "block";
    attachModalListeners(modal);
  } else {
    modal.style.display = "none";
    detachModalListeners(modal);
  }
}

btn.addEventListener("click", toggleModal);
