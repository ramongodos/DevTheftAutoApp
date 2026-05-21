import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./components/catalogo/catalogo').then(m => m.Catalogo)
  },
  {
    path: 'catalogo/:id',
    loadComponent: () => import('./components/detalle/detalle').then(m => m.Detalle)
  },
  {
    path: 'agregar',
    loadComponent: () => import('./components/agregar/agregar').then(m => m.Agregar)
  },
  { path: '**', redirectTo: 'home' }
];