import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VideojuegoService } from '../../services/videojuego';
 
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    nav {
      background: #12121f;
      border-bottom: 1px solid #2e2e52;
      padding: 0 2rem;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.25rem;
      font-weight: 800;
      color: #a78bfa;
      text-decoration: none;
    }
    .brand em { color: #e2e8f0; font-style: normal; }
    ul {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      list-style: none;
    }
    a {
      padding: 0.45rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #94a3b8;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    a:hover { color: #e2e8f0; background: rgba(124,58,237,.12); }
    a.active { color: #a78bfa; background: rgba(124,58,237,.18); }
    .btn-add {
      background: linear-gradient(135deg, #7c3aed, #a855f7) !important;
      color: white !important;
      box-shadow: 0 0 16px rgba(124,58,237,.3);
    }
    .btn-add:hover { box-shadow: 0 0 26px rgba(124,58,237,.5) !important; }
    .count {
      background: rgba(124,58,237,.25);
      color: #a78bfa;
      padding: 1px 7px;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 700;
    }
  `],
  template: `
    <nav>
      <a class="brand" routerLink="/home">🎮 Game<em>Vault</em></a>
      <ul>
        <li><a routerLink="/home" routerLinkActive="active">Inicio</a></li>
        <li>
          <a routerLink="/catalogo" routerLinkActive="active">
            Catálogo <span class="count">{{ total() }}</span>
          </a>
        </li>
        <li><a routerLink="/agregar" routerLinkActive="active" class="btn-add">+ Agregar</a></li>
      </ul>
    </nav>
  `
})
export class Navbar {
  private svc = inject(VideojuegoService);
  total = this.svc.totalJuegos;
}
 
 