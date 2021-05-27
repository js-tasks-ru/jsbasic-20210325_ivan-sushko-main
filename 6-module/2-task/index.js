import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
	  this.product = product;
	  this.elem = this.createCard();
  }
  
  createCard() {
	  let created_card = document.createElement("div")
	  created_card.className = "card";
	  
	  created_card.onclick = event => {
		  event.target.closest(".card__button") ? event.target.dispatchEvent(new CustomEvent("product-add", {
			  detail: this.product.id,
			  bubbles: true,
		  })) : false;
	  };
	  
	  created_card.insertAdjacentHTML("beforeEnd", `  
		
		<div class="card__top">
			<img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
			<span class="card__price">€${this.product.price.toFixed(2)}</span>
		</div>
		
		<div class="card__body">
			<div class="card__title">${this.product.name}</div>			
			<button type="button" class="card__button">
					<img src="/assets/images/icons/plus-icon.svg" alt="icon">
			</button>
		</div>
		
	  `);
	  
	  return created_card;
  }
}
