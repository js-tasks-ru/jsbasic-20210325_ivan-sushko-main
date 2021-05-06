import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
	constructor(products) {
		this.products = products;
		this.renderElem();
		this.filters = {};
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
		for (let filter in filters) {
			Object.defineProperty(this.filters, `${filter}`, {value: filters[filter], writable: true, enumerable: true});
		}
		
		for (let [key, value] of Object.entries(this.filters)) {
			
			if (this.result.length == 0) this.result = [...this.products];
			
			( key == "noNuts" && value != false ) ? this.result = this.result.filter( el => { if ( !el.nuts ) return el; } ) :
			( key == "vegeterianOnly" && value ) ? this.result = this.result.filter( el => { if ( el.vegeterian ) return el; } ) :
			( key == "maxSpiciness" ) ? this.result = this.result.filter( el => { if ( el.spiciness <= value ) return el; } ) :
			( key == "category" && value ) ? this.result = this.result.filter( el => { if ( el.category == value ) return el; } ) :
			this.result = [...this.products];
			
			this.result = new Set(this.result);
			this.result = Array.from(this.result);
		}
		
		this.elem.querySelector(".products-grid__inner").innerHTML = null;
		for (let dish of this.result) {
			this.elem.querySelector(".products-grid__inner").append( this.renderCard(dish) );
		}
	}
}