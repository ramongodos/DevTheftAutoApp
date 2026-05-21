import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { DetalleComponent } from './components/catalogo/detalle.component';
import { FormularioComponent } from './components/catalogo/formulario.component';

export const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: '**', redirectTo: '' }
];