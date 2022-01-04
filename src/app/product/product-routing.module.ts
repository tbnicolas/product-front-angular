import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './pages/crear/crear.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';

const routes: Routes = [{
    path:'',
    component: HomeComponent,
    children:[
        {
            path:'list',
            component: ListadoComponent
        },
        {
            path:'create',
            component: CrearComponent
        },
        {
            path:'update/:id',
            component: ActualizarComponent

        },
        {
            path: '**',
            redirectTo: 'list'
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule{}