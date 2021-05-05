import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
	this.renderElem();
	this.cache = new Map();
	this.result = [];
  }
  
  renderElem() {
	  this.elem = createElement(`
		  <div class="products-grid">
			<div class="products-grid__inner"></div>
		  </div>
	  `);
	  
	  for (let dish of this.products) {
		  this.elem.querySelector(".products-grid__inner").append( this.renderCard(dish) );
	  }
  }
  
  renderCard(dish) {
	  return new ProductCard(dish).elem;
  }
  
  updateFilter(filters) {
	  // Filling cache:
	  for (let filter in filters) {
		  this.cache.set(filter, filters[filter]);
	  }
	  
	  // Selecting dishes from this.products and make flow to start from the selected:
	  for (let [key, value] of this.cache) {
		  if (key == "vegeterianOnly") {
			  key = "vegeterian";
			  this.result.push( this.products.filter( e => {
				  if ( e[key] ) return e;
			  } ) );
			  this.products = this.result;
		  }
		  if (key == "noNuts") {
			  key = "nuts";
			  this.result.push( this.products.filter( e => {
				  if ( e[key] == false || e[key] == undefined ) return e; 
			  } ) );
			  this.products = this.result;
		  }
		  if (key == "maxSpiciness") {
			  key = "spiciness";
			  this.result.push( this.products.filter( e => {
				  if ( e[key] <= value ) return e;
			  } ) );
			  this.products = this.result;
		  }
		  if (key == "category") {
			  this.result.push( this.products.filter( e => {
				  if ( e[key] == value ) return e;
			  } ) );
			  this.products = this.result;
		  }
		  
		  // The last element of the new this.products accumulated all changes:
		  this.products = this.products[this.products.length -1];
		  this.products = this.products.flat();
		  this.products = new Set(this.products);
		  this.products = Array.from(this.products);
	  }
	  
	  // Rendering grid:
	  this.elem.querySelector(".products-grid__inner").innerHTML = null;
	  for (let dish of this.products) {
		  this.elem.querySelector(".products-grid__inner").append( this.renderCard(dish) );
	  }
  }
}
