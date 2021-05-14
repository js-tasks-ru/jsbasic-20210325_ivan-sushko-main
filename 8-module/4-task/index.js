import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let selected = this.cartItems.find( el => { el.product.id === product.id; } );
	
	if (selected) {
		selected.count += 1;
		this.onProductUpdate(selected);
	}
	else {
		let obj = { product: product, count: 1, };
		this.cartItems.push(obj);
		this.onProductUpdate(obj);
	}
  }

  updateProductCount(productId, amount) {
    let selected = this.cartItems.find( el => { el.product.id === productId; } );
	
	selected ? selected.count += amount : this.cartItems = this.cartItems.filter( el => {
		if (el.count > 0) return el;
	} );
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let quant_total = 0;
	this.cartItems.forEach( el => { quant_total += el.count; } );
	return quant_total;
  }

  getTotalPrice() {
    let price_total = 0;
	this.cartItems.forEach( el => { price_total += el.product.price * el.count; } );
	return price_total;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal_window = new Modal();
	this.modal_window.setTitle("Your Order");
	
	let cart_modal = document.createElement("div");
	this.cartItems.forEach( el => { cart_modal.append( this.renderProduct(el, el.count) ); } );
	this.renderOrderForm();
	
	this.modal_window.setBody(cart_modal);
	
	this.modal_window.modal.onclick = event => {
		if (event.target.src.includes("plus")) {
			updateProductCount(event.target.closest(".cart-product").dataset.product-id, +1);
		}
		if (event.target.src.includes("minus")) {
			updateProductCount(event.target.closest(".cart-product").dataset.product-id, -1);
		}
	};
	
	this.modal_window.modal.querySelector(".cart-form").onsubmit = async this.onSubmit(event);
	
	this.modal_window.open();
  }

  onProductUpdate(cartItem) {
	  if (this.cartItems.length <= 0) { this.modal_window.close(); return; };
	  
	  this.cartIcon.update(this);
	  
	  if (document.querySelector("body").className.includes("is-modal-open")) {
		  let quant = this.modal_window.modal.querySelector(` [data-product-id="${cartItem.product.id}"] .cart-counter__count `);
		  let price = this.modal_window.modal.querySelector(` [data-product-id="${cartItem.product.id}"] .cart-product__price `);
		  let total = this.modal_window.modal.querySelector(" .cart-buttons__info-price ");
		  
		  quant.innerHTML = getTotalCount();
		  price.innerHTML = cartItem.product.price;
		  total.innerHTML = getTotalPrice();
	  }
  }

  onSubmit(event) {
    event.preventDefault();
	document.querySelector(" button[type='submit'] ").classList.add("is-loading");
	
	let response = await fetch("https://httpbin.org/post", {
		method: "POST",
		body: new FormData( document.querySelector(".cart-form") )
	});
	
	if (response.ok) {
		this.modal_window.setTitle("Success!");
		this.cartItems = [];
		this.modal_window.setBody(`
		<div class="modal__body-inner">
		  <p>
			Order successful! Your order is being cooked :) <br>
			We’ll notify you about delivery time shortly.<br>
			<img src="/assets/images/delivery.gif">
		  </p>
		</div>
		`);
	}
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

