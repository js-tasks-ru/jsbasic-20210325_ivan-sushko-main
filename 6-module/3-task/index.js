import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
	 constructor(slides) {
		this.slides = slides;
		this.elem = this.render();
		this.initCarousel();
	 }
	 
	 render() {
		 let carousel = document.createElement("div");
		 carousel.className = "carousel";
		 
		 let makeArrows = () => {
			 let arrow_right = document.createElement("div");
			 arrow_right.className = "carousel__arrow";
			 let arrow_left = arrow_right.cloneNode(true);
			 
			 arrow_right.classList.add("carousel__arrow_right");
			 arrow_left.classList.add("carousel__arrow_left");
			 
			 let arrow_imageR = document.createElement("img");
			 arrow_imageR.setAttribute("src", "assets/images/icons/angle-icon.svg");
			 arrow_right.append(arrow_imageR);
			 let arrow_imageL = document.createElement("img");
			 arrow_imageL.setAttribute("src", "assets/images/icons/angle-left-icon.svg")
			 arrow_left.append(arrow_imageL);
			 
			 carousel.append(arrow_right, arrow_left);
			 
			 arrow_right = arrow_left = arrow_imageL = arrow_imageR = null;
		 };
		 
		 let makeSlides = () => {
			 let slides_area = document.createElement("div");
			 slides_area.className = "carousel__inner";
			 
			 for (let slide of this.slides) {
				 let created = document.createElement("div");
				 created.className = "carousel__slide";
				 created.dataset.id = `${slide.id}`;
				 
				 created.insertAdjacentHTML("beforeEnd", `
					<img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
						
					<div class="carousel__caption">
						<span class="carousel__price">€${slide.price.toFixed(2)}</span>
						<div class="carousel__title">${slide.name}</div>
							
						<button type="button" class="carousel__button">
							<img src="/assets/images/icons/plus-icon.svg" alt="icon">
						</button>
					</div>
				 `);
				 
				 slides_area.append(created);
				 
				 created = slide = null;
			 }
			 
			 carousel.append(slides_area);
			
			 slides_area = null;
		 };
		 
		 let initListener = () => {
			 carousel.addEventListener("click", event => {
				 event.target.parentElement.tagName == "BUTTON" || event.target.tagName == "BUTTON" ?
					 event.target.dispatchEvent(new CustomEvent("product-add", {
						detail: event.target.closest(".carousel__slide").dataset.id,
						bubbles: true
					 })) : false;
			 });			
		 };
		 
		 makeArrows();
		 makeSlides();
		 initListener();
		
		 return carousel;
	 }
	 

	 
	initCarousel() {
		 let slides_area = this.elem.querySelector(".carousel__inner");
		 let arrow_left = this.elem.querySelector(".carousel__arrow_left");
		 let arrow_right = this.elem.querySelector(".carousel__arrow_right");

		 arrow_left.style.display = "none";

		 let clicks = 0;
		 this.elem.addEventListener("click", event => {

			 if (event.target.closest(".carousel__arrow_right")) {
				++clicks;

				if (clicks > 0) arrow_left.style.display = "";
				if (clicks == (this.slides.length - 1)) arrow_right.style.display = "none";
					

				slides_area.style.transform = `translateX(-${clicks*slides_area.offsetWidth}px)`;
			 }
			 if (event.target.closest(".carousel__arrow_left")) {
				--clicks;

				if (clicks < (this.slides.length - 1)) arrow_right.style.display = "";
				if (clicks == 0) arrow_left.style.display = "none";
			

				slides_area.style.transform = `translateX(-${clicks*slides_area.offsetWidth}px)`;
			 }
				
		 });
	 }
}