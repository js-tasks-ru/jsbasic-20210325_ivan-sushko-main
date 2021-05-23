import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.addEventListeners();
    this.elem.style.zIndex = 9000; // over9000

    this.squeeze = function() {
      return document.documentElement.clientWidth < this.elem.closest(".container").getBoundingClientRect().right + this.elem.offsetWidth;
    };
    this.scroll = function() {
      return window.scrollY > this.elem.getBoundingClientRect().y;
    };
    this.onTop = function() {
      return window.scrollY < this.elem.getBoundingClientRect().y;
    };
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
    if ( document.documentElement.clientWidth < 767 ) {
      this.elem.style.position = "fixed";
      this.elem.style.top = "50px";
      this.elem.style.right = "0px";
      this.elem.style.removeProperty("left");
      return;
    }

    if ( this.onTop() ) {
      this.elem.style.position = "absolute";
      this.elem.style.top = "50px";
      this.elem.style.removeProperty("left");
      return;
    }

    if ( this.squeeze() ) {
      this.elem.style.position = "fixed";
      this.elem.style.right = "10px";
      this.elem.style.left = document.documentElement.clientWidth - this.elem.offsetWidth - 10 + "px";
      return;
    }

    if ( this.scroll() ) {
      this.elem.style.position = "fixed";
      this.elem.style.top = "50px";
      this.elem.style.left = this.elem.closest(".container").getBoundingClientRect().right + 20 + "px";
      return;
    }
  }
}
