import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
	this.elem = this.render();
  }
  
	  render() {
		  this.names = {
			  arrow: "ribbon__arrow",
			  left: "ribbon__arrow_left",
			  right: "ribbon__arrow_right",
			  visible: "ribbon__arrow_visible",
			  area: "ribbon__inner",
			  item: "ribbon__item",
			  active: "ribbon__item_active",
		  };
		  
		  this.ribbon = document.createElement("div");
		  this.ribbon.className = "ribbon";
		  
		  this.makeArrows();
		  this.makeList();
		  this.initArrows();
		  this.initSelect();
		  
		  return this.ribbon;
	  } 
	  
	  makeArrows() {		  
		  let button_left = document.createElement("button");
		  button_left.classList.add(this.names.arrow, this.names.left);
		  button_left.insertAdjacentHTML("beforeEnd", `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`);
		  let button_right = button_left.cloneNode(true);
		  button_right.classList.remove(this.names.left);
		  button_right.classList.add(this.names.right, this.names.visible);
		  
		  this.ribbon.append(button_left, button_right);
		  button_left = button_right = null;
	  }
	  
	  makeList() {
		  let list_area = document.createElement("nav");
		  list_area.className = this.names.area;

		  for (let item of this.categories) {
			  let created = document.createElement("a");
			  created.href = "#";
			  created.className = this.names.item;
			  created.dataset.id = item.id;
			  created.innerText = item.name;
			  
			  list_area.append(created);
			  item = created = null;
		  }
		  
		  list_area.firstElementChild.classList.add(this.names.active);
		  this.ribbon.firstElementChild.after(list_area);
		  list_area = null;
	  }
	  
	  initSelect() {
		  this.ribbon.addEventListener("click", event => {
			  if (event.target.className.includes(this.names.item)) {
				  event.preventDefault();
				  document.getElementsByClassName(this.names.active).item(0).classList.remove(this.names.active);
				  event.target.classList.add(this.names.active);
				  this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
					  detail: event.target.dataset.id,
					  bubbles: true,
				  }));
			  }
		  });
	  }
	  
	  initArrows() {
		  let left = this.ribbon.firstElementChild;
		  let right = this.ribbon.lastElementChild;
		  let list = left.nextSibling;
		  
		  list.addEventListener("scroll", () => {
			  if (list.scrollLeft < 1) {
				  left.classList.remove(this.names.visible);
				  right.classList.add(this.names.visible);
			  } else {
				  left.classList.add(this.names.visible);
			  }
			  
			  if (list.scrollWidth - list.scrollLeft - list.clientWidth < 1) {
				  right.classList.remove(this.names.visible);
				  left.classList.add(this.names.visible);
			  } else {
				  right.classList.add(this.names.visible);
			  }
		  });
		  
		  this.ribbon.addEventListener("click", event => {
			  if (event.target.closest(`.${this.names.right}`)) list.scrollBy(350, 0);
			  if (event.target.closest(`.${this.names.left}`)) list.scrollBy(-350, 0);
		  });
	  }
}
