import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './product-model';


@Injectable({
    providedIn: 'root'
})
export class ProductStoreService extends Subject<DataStateChangeEventArgs>{

    apiurl= 'api/products';
    constructor(private http: HttpClient){super();} 

    public execute(state: any):void{
        this.getProducts(state).subscribe(x=>super.next(x as  DataStateChangeEventArgs));
    }

    getProducts(state?:any):Observable<any[]>{
        return this.http.get<ProductModel[]>(this.apiurl).pipe(
            map((response: any)=>(<any>{
                result: state.take>0? response.slice(0,state.take): response,
                count: response.length
            })));
        
    }
    
}