import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/product.interfaces';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  public isLoading: boolean = false;
  public products:Product[] = [];

  constructor(private productService:ProductService,private router: Router ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.obtenerListaPorUSuario().subscribe(
      resp => {
        if( resp === true ){
          this.isLoading = false;
          this.products = this.productService.products;
        } else {
          this.isLoading = false;
          Swal.fire('Error',resp,'error');
        }
      }
    );
  }

  public eliminar( id:number ):void {
    /* this.products = this.products.filter(
      ( {id} ) => {
        return id !== resp
      }
    ); */

    this.productService.eliminarProductoPorId( id ).subscribe(
      resp=>{
        if ( resp.ok === true ) {
          console.log('Entro', resp.id);
          this.products = this.products.filter(
            ( {id} ) => {
              return id !== parseInt(resp.id)
            }
          )
        } 
      }
    )
  }

  public actualizar( id:number ):void {
    this.router.navigate([`product/update`,id]);
  }

}
