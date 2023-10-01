import { Injectable } from '@angular/core';
import { products } from './db/product.db';
import { IProduct, IStore } from './interfaces/product.interface';

@Injectable({
	providedIn: 'root'
})
export class DataFakeService {

	products: IProduct[] = products;
	cartShopping: IStore[] = []

	constructor() { }

	addProductToCart(product: IStore): void {

		const existingProduct = this.cartShopping.find(item => item.product.description === product.product.description);

		if (existingProduct) { existingProduct.ammount += product.ammount; }
		else { this.cartShopping.push(product); }
	}


	changeStateToCart(id: number): void {
		this.cartShopping.forEach(item => {
			if (item.id === id) {
				item.state = !item.state;
			}
		});
	}

	deleteProductToCart(id: number): void {
		const index = this.cartShopping.findIndex(item => item.id === id);
		if (index !== -1) {
			this.cartShopping.splice(index, 1);
		}
	}

}
