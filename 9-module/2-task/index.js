import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector(`[data-carousel-holder]`).append(this.carousel.elem);
    
    this.ribbon = new RibbonMenu(categories);
    document.querySelector(`[data-ribbon-holder]`).append(this.ribbon.elem);
    
    this.slider = new StepSlider( {steps: 5, value: 3} )
    document.querySelector(`[data-slider-holder]`).append(this.slider.elem);
    document.querySelector(".slider__thumb").style.left = "75%";
    document.querySelector(".slider__progress").style.width = "75%";
    
    this.icon = new CartIcon();
    document.querySelector(`[data-cart-icon-holder]`).append(this.icon.elem);
    
    this.cart = new Cart(this.icon);

    this.dishes = await fetch("/products.json")
    .then( response => { return response.json(); })
    .then( data => { return data; } )
    .catch( error => { return `${error.message}` });

    this.grid = new ProductsGrid(this.dishes);
    document.querySelector(`[data-products-grid-holder]`).innerHTML = null;
    document.querySelector(`[data-products-grid-holder]`).append(this.grid.elem);

    this.sortElements();
    this.initListeners();
  }

  sortElements() {
    this.grid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.slider.data.value,
      category: this.ribbon.categories[0].id,
    });
  }

  initListeners() {
    document.body.addEventListener("product-add", additionEvent => {
      this.dishes.forEach( el => { if (el.id === additionEvent.detail) this.cart.addProduct(el) } );
    });

    document.body.addEventListener("change", changeEvent => {
      changeEvent.target.id === "nuts-checkbox" ? this.grid.updateFilter( {noNuts: changeEvent.target.checked,} ) :
      changeEvent.target.id === "vegeterian-checkbox" ? this.grid.updateFilter( {vegeterianOnly: changeEvent.target.checked,} ) :
      false;
    });

    this.slider.elem.addEventListener("slider-change", sliderEvent => {
      this.grid.updateFilter( {maxSpiciness: sliderEvent.detail,} )
    });

    this.ribbon.elem.addEventListener("ribbon-select", ribbonEvent => {
      this.grid.updateFilter( {category: ribbonEvent.detail,} );
    });
  }
}
