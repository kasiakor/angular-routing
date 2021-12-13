import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable( {
    providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {
    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id = route.paramMap.get('id');
        if(isNaN(+id)) {

            const message = `Product id is not a number: ${id}`;
            console.log(message);

            return of({product:  null, error: message});

        }
        return  this.productService.getProduct(+id).pipe(
            //we map obseravble of product to to our resolved data structure
            map( product => ({ product: product })),
            //catch error from the product service
            catchError(error => {
                const message = `The retrival error is ${error}`;
                console.log(error);
                return of({product:  null, error: message});
            })
        );
    }
}