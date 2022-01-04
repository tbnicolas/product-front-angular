import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrearProductoInterface } from '../../interfaces/crear-product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  public isLoading: boolean = false;

  public crearFromulario: CrearProductoInterface = {
    nombre: '',
    descripcion: ''
  }

  constructor( private productoService:ProductService,private router: Router ) { }

  ngOnInit(): void {
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
    this.productoService.crearProducto(this.crearFromulario).subscribe(
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
