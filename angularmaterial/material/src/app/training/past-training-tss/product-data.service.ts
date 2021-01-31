import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ProductModel } from './product-model';

@Injectable({
    providedIn: 'root'
})
export class ProductDataService implements InMemoryDbService{
    constructor(){

    }
    createDb(){
        const products: ProductModel[]=  [
            { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
        ];
        return {products};
    }
}