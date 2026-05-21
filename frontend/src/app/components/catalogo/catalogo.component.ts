import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { VideojuegoService } from '../../services/videojuego';
 
@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, CurrencyPipe],
  styles: [`
    .page { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.25rem; }
    .subtitle { color: #94a3b8; margin-bottom: 2rem; }
    .filters { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.75rem; align-items: flex-start; }
    .search-wrap { flex: 1; min-width: 220px; position: relative; }
    .search-wrap input {
      width: 100%;
      padding: 0.65rem 1rem 0.65rem 2.4rem;
      background: #16162a;
      border: 1px solid #2e2e52;
      border-radius: 10px;
      color: #e2e8f0;
      font-size: 0.95rem;
      outline: none;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    .search-wrap input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.12); }
    .search-icon { position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; }
    .genre-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .pill { padding: 0.45rem 1rem; border: 1px solid #2e2e52; background: transparent; border-radius: 20px; color: #94a3b8; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
    .pill:hover { border-color: #7c3aed; color: #a78bfa; }
    .pill.active { background: rgba(124,58,237,.2); border-color: #7c3aed; color: #a78bfa; }
    .info { font-size: 0.85rem; color: #64748b; margin-bottom: 1.25rem; }
    .info strong { color: #94a3b8; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
    .card { background: #16162a; border: 1px solid #2e2e52; border-radius: 12px; overflow: hidden; transition: all 0.25s; text-decoration: none; color: inherit; display: block; }
    .card:hover { border-color: #7c3aed; transform: translateY(-4px); box-shadow: 0 8px 28px rgba(124,58,237,.2); }
    .card img { width: 100%; height: 160px; object-fit: cover; }
    .card-body { padding: 1rem; }
    .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
    .card-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem; }
    .card-desc { font-size: 0.82rem; color: #94a3b8; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #1e1e36; }
    .price { font-weight: 800; color: #a78bfa; }
    .rating { font-size: 0.82rem; color: #f59e0b; font-weight: 700; }
    .empty { text-align: center; padding: 4rem 1rem; color: #64748b; }
    .empty h3 { color: #94a3b8; margin-bottom: 0.5rem; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-RPG { background: rgba(124,58,237,.2); color: #a78bfa; border: 1px solid rgba(124,58,237,.4); }
    .badge-Acción { background: rgba(239,68,68,.2); color: #f87171; border: 1px solid rgba(239,68,68,.4); }
    .badge-Aventura { background: rgba(245,158,11,.2); color: #fbbf24; border: 1px solid rgba(245,158,11,.4); }
    .badge-Deportes { background: rgba(34,197,94,.2); color: #4ade80; border: 1px solid rgba(34,197,94,.4); }
    .badge-Terror { background: rgba(148,163,184,.1); color: #94a3b8; border: 1px solid rgba(148,163,184,.3); }
    .badge-Sandbox { background: rgba(16,185,129,.2); color: #6ee7b7; border: 1px solid rgba(16,185,129,.4); }
  `],
  template: `
    <div class="page">
      <h1>🎮 Catálogo</h1>
      <p class="subtitle">Explora nuestra colección completa de videojuegos</p>
 
      <div class="filters">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por título o género..."
            [value]="busqueda()"
            (input)="onBusqueda($event)"
          />
        </div>
        <div class="genre-pills">
          <button class="pill" [class.active]="generoFiltro() === ''" (click)="setGenero('')">Todos</button>
          @for (g of generos(); track g) {
            <button class="pill" [class.active]="generoFiltro() === g" (click)="setGenero(g)">{{ g }}</button>
          }
        </div>
      </div>
 
      <p class="info">
        Mostrando <strong>{{ filtrados().length }}</strong> de <strong>{{ total() }}</strong> juegos
      </p>
 
      @if (filtrados().length > 0) {
        <div class="grid">
          @for (j of filtrados(); track j.id) {
            <a [routerLink]="['/catalogo', j.id]" class="card">
              <img [src]="j.imagen" [alt]="j.titulo" loading="lazy" />
              <div class="card-body">
                <div class="card-top">
                  <span class="badge" [class]="'badge-' + j.genero.nombre">{{ j.genero.nombre }}</span>
                  <span class="rating">★ {{ j.calificacion }}</span>
                </div>
                <div class="card-title">{{ j.titulo }}</div>
                <div class="card-desc">{{ j.descripcion }}</div>
                <div class="card-foot">
                  <span class="price">{{ j.precio | currency:'EUR' }}</span>
                  <span style="font-size:0.78rem;color:#475569">{{ j.anio }}</span>
                </div>
              </div>
            </a>
          }
        </div>
      } @else {
        <div class="empty">
          <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
          <h3>No se encontraron juegos</h3>
          <p>Prueba con otro término o quita los filtros</p>
          <button class="pill active" style="margin-top:1rem" (click)="limpiar()">Limpiar filtros</button>
        </div>
      }
    </div>
  `
})
export class Catalogo {
  private svc = inject(VideojuegoService);
 
  filtrados    = this.svc.juegosFiltrados;
  generos      = this.svc.generos;
  busqueda     = this.svc.busqueda;
  generoFiltro = this.svc.generoFiltro;
  total        = this.svc.totalJuegos;
 
  onBusqueda(e: Event): void { this.svc.setBusqueda((e.target as HTMLInputElement).value); }
  setGenero(g: string):  void { this.svc.setGeneroFiltro(g); }
  limpiar():             void { this.svc.setBusqueda(''); this.svc.setGeneroFiltro(''); }
}