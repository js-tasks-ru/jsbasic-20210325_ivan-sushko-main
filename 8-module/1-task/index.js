import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
	  switch (document.documentElement.clientWidth) {
		  case 766: break;
		  default:
			if (window.scrollY > this.elem.getBoundingClientRect().y && this.elem.offsetWidth) {
				this.elem.style.position = "fixed";
				this.elem.style.left = this.elem.closest(".container").getBoundingClientRect().right + 20 + "px";
				this.elem.style.top = "50px";
			}
			if (window.scrollY < this.elem.getBoundingClientRect().y && this.elem.offsetWidth) {
				this.elem.style.position = "absolute";
				this.elem.style.removeProperty("left");
			}
			if (document.documentElement.clientWidth < this.elem.closest(".container").getBoundingClientRect().right + this.elem.offsetWidth) {
				this.elem.style.position = "fixed";
				this.elem.style.left = document.documentElement.clientWidth - this.elem.offsetWidth - 10 + "px";
			}
	  }
  }
}
