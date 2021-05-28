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
	  slider.querySelector(".slider__steps").children[this.data.value || 0].className = "slider__step-active";
	  
	  return slider;
  }

  initSlider() {
	  let select = el_name => {
		  el_name = this.elem.querySelector(`${el_name}`);
		  return el_name;
	  };
	  
	  let dynamic = Number( select(".slider__value").innerHTML );
	  
	  this.step = null;
	  let setStep = () => {
		  return this.step = Math.round( this.elem.getBoundingClientRect().width / (this.data.steps - 1) );
	  };
	  
	  this.percent = null;
	  let getPercent =() => {
		  return this.percent = this.elem.getBoundingClientRect().width/100;
	  };
	  
	  let setLeft = (moveEvent) => {
		  return ( moveEvent.pageX - this.elem.getBoundingClientRect().left ) / this.percent;
	  };
	  
	  let getStep = () => {
		  return Math.round( parseFloat( select(".slider__thumb").style.left ) /  this.step * this.percent);
	  };
	  
	  select(".slider__thumb").style.left = "0%";
	  select(".slider__progress").style.width = "0%";
	  
	  let changeOnClick = (clickEvent) => {
		  if (this.step == null) setStep();
		  if (this.percent == null) getPercent();
		  dynamic = Math.round( ( clickEvent.clientX - this.elem.getBoundingClientRect().left ) / this.step );
		  
		  select(".slider__value").innerHTML = dynamic;
		  select(".slider__step-active").removeAttribute("class");
		  select(".slider__steps").children.item(dynamic).setAttribute("class", "slider__step-active");
		  select(".slider__thumb").style.left =  Math.floor( (this.step * dynamic) / this.percent ) + "%";
		  select(".slider__progress").style.width = Math.floor( (this.step * dynamic) / this.percent ) + "%";
		  
		  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
			  detail: dynamic,
			  bubbles: true
		  }));
	  };
	  
	  select(".slider__thumb").onpointerdown = () => {
		  if (this.step == null) setStep();
		  if (this.percent == null) getPercent();
		  
		  document.querySelector(".slider").classList.toggle("slider_dragging");
		  
		  let move = moveEvent => {
			  select(".slider__step-active").removeAttribute("class");
			  select(".slider__steps").children.item( getStep() ).setAttribute("class", "slider__step-active");
			  
			  select(".slider__thumb").style.left = setLeft(moveEvent) + "%";
			  if ( parseInt( select(".slider__thumb").style.left ) >= 100 ) {
				  select(".slider__thumb").style.left = "100%";
			  }
			  if ( parseInt( select(".slider__thumb").style.left ) <= 1 ) {
				  select(".slider__thumb").style.left = "0%";
			  }

			  select(".slider__progress").style.width = setLeft(moveEvent) + "%";
			  if ( parseInt( select(".slider__progress").style.width ) >= 100) {
				  select(".slider__progress").style.width = "100%";
			  }
			  if ( parseInt( select(".slider__progress").style.width ) <= 1 ) {
				  select(".slider__progress").style.width = "0%";
			  }

			  select(".slider__value").innerHTML = getStep();

			  if ( Number( select(".slider__value").innerHTML ) == dynamic + 1 ) {
				  dynamic = dynamic + 1;
				  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
					  detail: dynamic,
					  bubbles: true
				  }));
			  }
			  if ( Number( select(".slider__value").innerHTML ) == dynamic - 1 ) {
				  dynamic = dynamic - 1;
				  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
					  detail: dynamic,
					  bubbles: true
				  }));
			  }	  
		  };
		  
		  let end = () => {
			  document.querySelector(".slider").classList.toggle("slider_dragging");
			  
			  select(".slider__thumb").style.left = Math.floor( getStep() * 25 ) + "%";
			  select(".slider__progress").style.width = select(".slider__thumb").style.left;
			  
			  document.removeEventListener("pointermove", move);
			  select(".slider__thumb").onpointerup = null;
			  
			  document.querySelector(".slider").dispatchEvent(new CustomEvent("slider-change", {
				  detail: dynamic,
				  bubbles: true
			  }));
		  };

		  document.addEventListener("pointermove", move);
		  document.onpointerup = end;
	  };
	  
	  this.elem.addEventListener("click", changeOnClick);
  }
  
  beforeStart() {
	  this.elem.querySelector(".slider__thumb").ondragstart = function() { return false };
  }
}
