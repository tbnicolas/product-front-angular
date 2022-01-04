import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, of } from 'rxjs';
import { Product,  } from '../interfaces/product.interfaces';
import { CrearProductoInterface } from '../interfaces/crear-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _baseUrl = environment.baseUrl;

  private _products:Product[] = [];

  get products():Product[] {
    return [ ...this._products ];
  }
  private token = localStorage.getItem('token');
  constructor( private http :HttpClient) {
  } 


  public obtenerListaPorUSuario():Observable<any>{
    const url = `${ this._baseUrl }/products/`;
    const headers = new HttpHeaders().set('x-token', this.token!);
    return this.http.get<any>(url,{headers})
                    .pipe(
                      tap( resp => {
                        if( resp.ok ){
                          this._products = resp.products
                        }
                      }),
                      map( resp => resp.ok ),
                      catchError( err => of(err.error.msg) )
                    );
  }

  public eliminarProductoPorId( id:number ):Observable<any> {
    const url = `${ this._baseUrl }/products/${ id }`;
    console.log('url',url);
    const headers = new HttpHeaders().set('x-token', this.token!);

    return this.http.delete<any>(url,{headers})
                    .pipe(
                      catchError( err => of(err.error.msg) )
                    );
    
  }

  public crearProducto( producto:CrearProductoInterface ):Observable<any> {
    const url = `${ this._baseUrl }/products/`;
    console.log('url',url);
    const headers = new HttpHeaders().set('x-token', this.token!);

    return this.http.post<any>(url,producto,{headers})
                    .pipe(
                      catchError( err => of(err.error.msg) )
                    );
  }

  public actualizarProductoPorId( id:string, form:CrearProductoInterface ):Observable<any> {
    const url = `${ this._baseUrl }/products/${ id }`;
    console.log('url',url);
    const headers = new HttpHeaders().set('x-token', this.token!);

    return this.http.put<any>(url,form,{headers})
                    .pipe(
                      catchError( err => of(err.error.msg) )
                    );
    
  }


}
