import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav style="background: #2f3542; padding: 15px; display: flex; gap: 20px; font-family: sans-serif;">
      <a routerLink="/" routerLinkActive="active" style="color: white; text-decoration: none; font-weight: bold;">🏠 Home</a>
      <a routerLink="/catalogo" routerLinkActive="active" style="color: white; text-decoration: none; font-weight: bold;">🎮 Catálogo</a>
      <a routerLink="/agregar" routerLinkActive="active" style="color: white; text-decoration: none; font-weight: bold;">➕ Añadir Juego</a>
    </nav>
  `
})
export class NavbarComponent { }