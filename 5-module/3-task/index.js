function initCarousel() {
	let carousel_area = document.querySelector(".carousel__inner");
	let arrow_left = document.querySelector(".carousel__arrow_left");
	let arrow_right = document.querySelector(".carousel__arrow_right");

	arrow_left.style.display = "none";

	let clicks = 0;
	document.querySelector(".carousel").addEventListener("click", event => {

		if (event.target.closest(".carousel__arrow_right")) {
			++clicks;

			if (clicks > 0) arrow_left.style.display = "";
			if (clicks == 3) arrow_right.style.display = "none";
			

			carousel_area.style.transform = `translateX(-${clicks*carousel_area.offsetWidth}px)`;
		}
		if (event.target.closest(".carousel__arrow_left")) {
			--clicks;

			if (clicks < 3) arrow_right.style.display = "";
			if (clicks == 0) arrow_left.style.display = "none";
	

			carousel_area.style.transform = `translateX(-${clicks*carousel_area.offsetWidth}px)`;
		}
		
	});
}
  