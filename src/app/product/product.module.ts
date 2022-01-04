import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CrearComponent } from './pages/crear/crear.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ProductRoutingModule } from './product-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';



@NgModule({
  declarations: [
    SideBarComponent,
    CrearComponent,
    ListadoComponent,
    HomeComponent,
    ActualizarComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ]
})
export class ProductModule { }
