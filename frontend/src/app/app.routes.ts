import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { DetalleComponent } from './detalle/detalle';
import { AgregarComponent } from './agregar/agregar';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: '**', redirectTo: '' }
];