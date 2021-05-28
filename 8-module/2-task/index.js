import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductsGrid {
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
		
		// Taken from https://github.com/js-tasks-ru/jsbasic-20210325_alexander-kuimov/blob/master/8-module/2-task/index.js#L29
		this.result = this.products
		.filter( item => (this.filters["noNuts"] ? this.filters["noNuts"] === !item["nuts"] : item) )
		.filter( item => (this.filters["vegeterianOnly"] ? this.filters["vegeterianOnly"] === item["vegeterian"] : item) )
		.filter( item => (this.filters["maxSpiciness"] ? item["spiciness"] <= this.filters["maxSpiciness"] : item) )
		.filter( item => (this.filters["category"] ? this.filters["category"] === item["category"] : item) );
		
		this.elem.querySelector(".products-grid__inner").innerHTML = null;
		for (let dish of this.result) {
			this.elem.querySelector(".products-grid__inner").append( this.renderCard(dish) );
		}
	}
}