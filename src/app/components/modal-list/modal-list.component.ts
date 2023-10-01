import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DataFakeService } from 'src/app/data-fake.service';
import { IStore } from 'src/app/interfaces/product.interface';

@Component({
	selector: 'app-modal-list',
	templateUrl: './modal-list.component.html',
	styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IStore[],
		public dataFakeService: DataFakeService) { }

	changeState(id: number) {
		this.dataFakeService.changeStateToCart(id)
	}

	deleteProduct(id: number): void {
		console.log(id);
		this.dataFakeService.deleteProductToCart(id)
	}

}
