import { AbstractControl, ValidationErrors } from "@angular/forms";
import { products } from "../db/product.db";


export function valueInProducts(control: AbstractControl): ValidationErrors | null {
    const product = control.value;
    if (control.dirty || control.touched) {
        const response = products.find(e => e.description === product)
        if (!response) return {
            invalidProduct: true
        }
    }
    return null;
}