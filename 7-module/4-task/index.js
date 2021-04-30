export default class StepSlider {
  constructor({ steps, value = 0 }) {
	  this.data = arguments[0];
	  this.elem = this.render();
	  this.initSlider();
	  this.beforeStart();
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
	  
	  let setLeft = (moveEvent) => {
		  return `${ ( moveEvent.pageX - this.elem.getBoundingClientRect().left) / this.percent }%`;
	  };
	  
	  let getStep = () => {
		  return `${ parseFloat( Math.round( parseFloat(select(".slider__thumb").style.left) /  this.step * this.percent) ) }`;
	  };
	  
	  select(".slider__thumb").setAttribute("style", "left: 0%");
	  select(".slider__progress").setAttribute("style", "width: 0%");
	  
	  let changeOnClick = (clickEvent) => {
		  let step = Math.round(this.elem.getBoundingClientRect().width/(this.data.steps - 1));
		  let percent = this.elem.getBoundingClientRect().width/100;
		  let click = Math.round( (clickEvent.clientX - this.elem.getBoundingClientRect().left)/step );
		  
		  select(".slider__value").innerHTML = click;
		  select(".slider__step-active").removeAttribute("class");
		  select(".slider__steps").children.item(click).setAttribute("class", "slider__step-active");
		  select(".slider__thumb").setAttribute("style", `left: ${Math.floor( (step * click)/percent )}%`);
		  select(".slider__progress").setAttribute("style", `width: ${Math.floor( (step * click)/percent )}%`);
		  
		  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
			  detail: click,
			  bubbles: true
		  }));
	  };
	  
	  select(".slider__thumb").onpointerdown = () => {
		  this.step = Math.round( this.elem.getBoundingClientRect().width/(this.data.steps - 1) );
		  this.percent = this.elem.getBoundingClientRect().width/100;
		  document.querySelector(".slider").classList.toggle("slider_dragging");
		  
		  let move = moveEvent => {
			  select(".slider__thumb").style.left = setLeft(moveEvent);
			  if ( parseInt( select(".slider__thumb").style.left ) >= 100 ) {
				  select(".slider__thumb").style.left = "100%";
			  }
			  if ( parseInt( select(".slider__thumb").style.left ) <= 1 ) {
				  select(".slider__thumb").style.left = "0%";
			  }

			  
			  select(".slider__step-active").removeAttribute("class");
			  select(".slider__steps").children.item( getStep() ).setAttribute("class", "slider__step-active");

			  select(".slider__progress").setAttribute("style", `width: ${setLeft(moveEvent)}`);
			  if ( parseInt( select(".slider__progress").style.width ) >= 100) {
				  select(".slider__progress").style.width = "100%";
			  }
			  if ( parseInt( select(".slider__progress").style.width ) <= 1 ) {
				  select(".slider__progress").style.width = "0%";
			  }

			  select(".slider__value").innerHTML = getStep();
			  
			  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
				  detail: Number( getStep() ),
				  bubbles: true
			  }));
		  };
		  
		  document.addEventListener("pointermove", move);
		  
		  select(".slider__thumb").onpointerup = () => {
			  document.querySelector(".slider").classList.toggle("slider_dragging");
			  select(".slider__thumb").setAttribute("style", `left: ${Math.floor( getStep() * 25 )}%`);
			  select(".slider__progress").setAttribute("style", `width: ${ select(".slider__thumb").style.left }`);
			  document.removeEventListener("pointermove", move);
			  select(".slider__thumb").onpointerup = null;
		  };
	  };
	  
	  this.elem.addEventListener("click", changeOnClick);
  }
  
  beforeStart() {
	  this.elem.querySelector(".slider__thumb").ondragstart = function() { return false };
  }
}
