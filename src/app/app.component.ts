import { Component } from '@angular/core';
import { products } from './db/product.db';
import { IProduct, IStore } from './interfaces/product.interface';
// import {MatCardModule} from '@angular/material/card'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	// cartShopping: IStore[] = []

	// captureEmitter(event: object): void {
	// 	this.cartShopping.push(event as IStore)
	// 	console.log(this.cartShopping);
	// }


}
