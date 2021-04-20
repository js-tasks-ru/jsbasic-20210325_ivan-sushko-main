function initCarousel() {
  let carousel_area = document.querySelector(".carousel__inner");
  
  document.querySelector(".carousel").addEventListener("click", function(event) {
	  
	  (event.target.closest(".carousel__arrow_right"))
		? carousel_area.append(carousel_area.children[0]) :
		
	  (event.target.closest(".carousel__arrow_left"))
		? carousel_area.prepend(carousel_area.children[carousel_area.children.length - 1]) :
		
	  false;
  })
}
