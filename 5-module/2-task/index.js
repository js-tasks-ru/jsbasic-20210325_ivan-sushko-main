function toggleText() {
  document.querySelector(".toggle-text-button").onclick = function() {
	  document.querySelector("#text").toggleAttribute("hidden");
  }
}
