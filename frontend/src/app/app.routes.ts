import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { DetalleComponent } from './components/catalogo/detalle.component'; // Apunta a donde está realmente metido en vuestro árbol
import { AgregarComponent } from './components/agregar/agregar';

export const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: '**', redirectTo: '' }
];