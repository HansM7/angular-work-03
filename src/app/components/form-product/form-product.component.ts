import { Component, Input, EventEmitter, Output, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { products } from 'src/app/db/product.db';
import { IProduct, IStore } from 'src/app/interfaces/product.interface';
import { MatDialog, } from '@angular/material/dialog';
import { ModalListComponent } from '../modal-list/modal-list.component';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { valueInProducts } from 'src/app/utils/custom-validators';
import { DataFakeService } from 'src/app/data-fake.service';



@Component({
	selector: 'app-form-product',
	templateUrl: './form-product.component.html',
	styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent {

	// @Input() cartShopping: IStore[] = []

	productForm: FormGroup;

	// products: IProduct[] = products

	productSugestions: IProduct[] = []

	// @Output() productEmitter: EventEmitter<object> = new EventEmitter<object>()

	durationInSeconds = 2;

	cartShopping = this.dataFakeService.cartShopping
	products = this.dataFakeService.products

	constructor(
		private _snackBar: MatSnackBar,
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		public dataFakeService: DataFakeService
	) {
		this.productForm = this.formBuilder.group({
			description: ['', [Validators.required, valueInProducts]],
			ammount: ['', [Validators.required, Validators.max(10)]],
		})
	}


	getErrorControl(field: string) {
		return this.productForm.controls[field];
	}

	get getErrorAmmount() {
		const control = this.productForm.controls['ammount'];
		return control.invalid && control.touched;
	}

	onSubmit(): void {
		if (!this.productForm.invalid) {
			const id = this.dataFakeService.cartShopping.length + 1;
			const product = this.dataFakeService.products.find(product => product.description === this.productForm.value['description'])
			const ammount = this.productForm.value['ammount'];
			const state = false;
			if (!product) {
				this.openSnackBar("Product not found!")
			} else {
				this.dataFakeService.addProductToCart({ id, product, ammount, state })
				this.openSnackBar("Register correct!")
			}
		} else {
			this.openSnackBar('Invalid form. Please check your input.')
		}
	}

	filterSuggestions(event: Event) {
		const input = (event.target as HTMLInputElement).value;
		this.productSugestions = this.dataFakeService.products.filter(products =>
			products.description.toLowerCase().includes(input.toLowerCase())
		);
	}

	openDialog(): void {
		this.dialog.open(ModalListComponent, {
			data: this.dataFakeService.cartShopping
		});
	}

	openSnackBar(message: string) {
		this._snackBar.openFromComponent(ErrorForm, {
			data: message,
			duration: this.durationInSeconds * 1000,
		});
	}

	handleChangeState(id: number): void {
		this.dataFakeService.changeStateToCart(id)
	}

}

@Component({
	selector: 'snack-bar-annotated-component-example-snack',
	templateUrl: './form-error.component.html',

})
export class ErrorForm {
	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: any,
		private snackBarRef: MatSnackBarRef<ErrorForm>
	) { }
}