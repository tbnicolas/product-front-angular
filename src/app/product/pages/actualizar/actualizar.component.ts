import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CrearProductoInterface } from '../../interfaces/crear-product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {

  public isLoading: boolean = false;
  public id: string='';

  public crearFromulario: CrearProductoInterface = {
    nombre: '',
    descripcion: ''
  }

  constructor( 
    private productoService:ProductService,
    private router: Router,
    private activateRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
        /* .pipe(
          switchMap(({ id })=> {
            return this.productoService.products.filter(
              (product) =>  product.id === id 
            )
          }),

        ) */
        .subscribe(( {id } ) => {
          const newProduct = this.productoService.products.filter(
            (product) =>  {
              return product.id === parseInt(id)
            }
          ); 
          this.id = id;
          this.crearFromulario = {
           nombre: newProduct[0]?.nombre ?? '',
           descripcion: newProduct[0]?.descripcion ?? ''
          }
        });

  }

  public crearProducto():void {
    if( 
      this.crearFromulario.nombre.length === 0 ||
      this.crearFromulario.descripcion.length === 0 
    ) {
      Swal.fire('Error','Porfavor llene todo los campos','error');
      return;
    }
    this.isLoading = true;
    this.productoService.actualizarProductoPorId(this.id,this.crearFromulario).subscribe(
      (resp) => {
        if( resp.ok === true ) {
          this.isLoading = false;
          this.crearFromulario.nombre = '';
          this.crearFromulario.descripcion='';
          this.router.navigate(['./product']);
        } else {
            this.isLoading = false;
            Swal.fire('Error',resp,'error');

        }
      }
    )
  }

  public enableOrDisableButton():string {
    return ( this.isLoading )
          ? 'custom-button btn-disable'
          : 'custom-button'
  }
}
