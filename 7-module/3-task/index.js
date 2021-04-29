export default class StepSlider {
  constructor({ steps, value = 0 }) {
	  this.data = arguments[0];
	  this.elem = this.render();
	  this.initSlider();
  }
  
  render() {
	  let slider = document.createElement("div");
	  slider.className = "slider";
	  
	  slider.insertAdjacentHTML("beforeEnd", `
			  <div class="slider__thumb">
				<span class="slider__value">${this.data.value || 0}</span>
			  </div>

			  <div class="slider__progress"></div>
			  
			  <div class="slider__steps"></div>
	  `);

	  for (let step = 0; step < this.data.steps; step++) {
		  slider.querySelector(".slider__steps").append( document.createElement("span") );
	  }
	  slider.querySelector(".slider__steps").children[0].className = "slider__step-active";
	  
	  return slider;
  }

  initSlider() {
	  let select = el_name => {
		  el_name = this.elem.querySelector(`${el_name}`);
		  return el_name;
	  };
	  
	  select(".slider__thumb").setAttribute("style", "left: 0%");
	  select(".slider__progress").setAttribute("style", "width: 0%");
	  
	  this.elem.addEventListener("click", event => {
		  this.step = Math.round(this.elem.getBoundingClientRect().width/(this.data.steps - 1));
		  this.percent = this.elem.getBoundingClientRect().width/100;
		  this.click = Math.round( (event.clientX - this.elem.getBoundingClientRect().left)/this.step );
		  
		  select(".slider__value").innerHTML = this.click;
		  select(".slider__step-active").removeAttribute("class");
		  select(".slider__steps").children.item(this.click).setAttribute("class", "slider__step-active");
		  select(".slider__thumb").setAttribute("style", `left: ${Math.floor( (this.step * this.click)/this.percent )}%`);
		  select(".slider__progress").setAttribute("style", `width: ${Math.floor( (this.step * this.click)/this.percent )}%`);

		  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
			  detail: this.click,
			  bubbles: true
		  }));
	  });
  }
}
