import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
	  this.render();
	  this.open = () => this.show();
	  this.close = () => this.del();
	  this.setTitle = data => this.makeTitle(data);
	  this.setBody = data => this.makeBody(data);
  }
  
  render() {  
	  let create = function(elem_name, class_name) {
		  elem_name = document.createElement(elem_name);
		  elem_name.className = class_name;
		  return elem_name;
	  };
	  
	  this.modal = create("div", "modal");
	  this.body = create("div", "modal__body");
	  this.body.innerHTML = "<h1>Default Body</h1>";
	  this.title = create("h3", "modal__title");
	  this.title.innerHTML = "Default Title";
	  
	  let overlay = create ("div", "modal__overlay");
	  let area = create("div", "modal__inner");
	  let head = create("div", "modal__header");
	  let butt = create("button", "modal__close");
	  butt.setAttribute("type", "button");
	  butt.insertAdjacentHTML("beforeEnd", '<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" >');
	  butt.onclick = () => { this.close() };
	  
	  this.modal.append(overlay, area);
	  area.append(head, this.body);
	  head.append(butt, this.title);
	  
	  overlay = area = head = butt = create = null;
	  
	  this.initListener();
  }
  
  initListener() {
	  let el = document.querySelector("body");
	  el.addEventListener("modal-open", () => {
		  el.classList.add("is-modal-open");
	  });
	  el.addEventListener("modal-del", () => {
		  el.classList.remove("is-modal-open");
	  })
	  el.addEventListener("keydown", event => {
		  if (event.code === "Escape") this.del();
	  });
  }
  
  show() {
	  let el = document.querySelector("body");
	  el.append(this.modal);
	  el.dispatchEvent(new CustomEvent("modal-open", {bubbles: true}));
  }
  
  del() {
	  this.modal.dispatchEvent(new CustomEvent("modal-del", {bubbles: true}));
	  this.modal.remove();
  }
  
  makeTitle(data) {
	  this.title.innerText = data;
  }
  
  makeBody(data) {
	  this.body.innerHTML = null;
	  this.body.append(data);
  }
}
