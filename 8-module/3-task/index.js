export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
	  this.cartIcon = cartIcon;
  }

  addProduct(product) {
	  let selected = null;
	  
	  for (let item of this.cartItems) {
		  if ( item.product.id === product.id ) {
			  selected = item;
			  item.count = item.count + 1;
		  }
	  }
	  
	  if (selected) {
		  this.onProductUpdate(selected);
	  }
	  else {
		  let obj = { product: product, count: 1, };
		  this.cartItems.push(obj);
		  this.onProductUpdate(obj);
	  }
  }

  updateProductCount(productId, amount) {
	  for (let item of this.cartItems) {
		  if ( item.product.id === productId ) {
			  item.count = item.count + amount;
			  this.onProductUpdate(item);
		  }
	  }
	  this.cartItems = this.cartItems.filter( el => { if (el.count > 0) return el; } );
  }

  isEmpty() {
	  return !this.cartItems.length;
  }

  getTotalCount() {
	  let quant_total = 0;
	  for (let el of this.cartItems) { quant_total = quant_total + el.count }
	  return quant_total;
  }

  getTotalPrice() {
	  let price_total = 0;
	  for (let el of this.cartItems) { price_total = price_total + (el.product.price * el.count) }
	  return price_total;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

