import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { VideojuegoService } from '../../services/videojuego';
 
@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe, DecimalPipe],
  styles: [`
    .hero {
      background: linear-gradient(135deg, #0d0d14 0%, #1a0533 60%, #0d0d14 100%);
      padding: 5rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      width: 700px; height: 700px;
      background: radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 65%);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1.25rem;
      position: relative;
    }
    h1 span { color: #a78bfa; }
    .hero p {
      font-size: 1.1rem;
      color: #94a3b8;
      max-width: 520px;
      margin: 0 auto 2.25rem;
      position: relative;
    }
    .hero-btns {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
    }
    .btn-primary {
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1rem;
      box-shadow: 0 0 20px rgba(124,58,237,.4);
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 32px rgba(124,58,237,.6); }
    .btn-outline {
      border: 1px solid #2e2e52;
      color: #e2e8f0;
      padding: 0.8rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-outline:hover { border-color: #7c3aed; background: rgba(124,58,237,.1); }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .stat {
      background: #16162a;
      border: 1px solid #2e2e52;
      border-radius: 12px;
      padding: 1.5rem 1rem;
      text-align: center;
    }
    .stat-val { font-size: 2rem; font-weight: 900; color: #a78bfa; }
    .stat-lbl { font-size: 0.82rem; color: #64748b; margin-top: 4px; }
    .section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .section-hdr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .section-title { font-size: 1.4rem; font-weight: 800; }
    .ver-todos { color: #7c3aed; font-size: 0.9rem; font-weight: 600; text-decoration: none; }
    .ver-todos:hover { color: #a78bfa; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }
    .card {
      background: #16162a;
      border: 1px solid #2e2e52;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.25s;
      text-decoration: none;
      color: inherit;
      display: block;
    }
    .card:hover { border-color: #7c3aed; transform: translateY(-4px); box-shadow: 0 8px 28px rgba(124,58,237,.2); }
    .card img { width: 100%; height: 180px; object-fit: cover; }
    .card-body { padding: 1rem; }
    .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
    .card-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.35rem; }
    .card-desc { font-size: 0.83rem; color: #94a3b8; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #1e1e36; }
    .price { font-weight: 800; font-size: 1.1rem; color: #a78bfa; }
    .rating { font-size: 0.85rem; color: #f59e0b; font-weight: 700; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-RPG { background: rgba(124,58,237,.2); color: #a78bfa; border: 1px solid rgba(124,58,237,.4); }
    .badge-Acción { background: rgba(239,68,68,.2); color: #f87171; border: 1px solid rgba(239,68,68,.4); }
    .badge-Aventura { background: rgba(245,158,11,.2); color: #fbbf24; border: 1px solid rgba(245,158,11,.4); }
    .badge-Deportes { background: rgba(34,197,94,.2); color: #4ade80; border: 1px solid rgba(34,197,94,.4); }
    .badge-Terror { background: rgba(148,163,184,.1); color: #94a3b8; border: 1px solid rgba(148,163,184,.3); }
    .badge-Sandbox { background: rgba(16,185,129,.2); color: #6ee7b7; border: 1px solid rgba(16,185,129,.4); }
  `],
  template: `
    <section class="hero">
      <h1>Tu tienda de<br><span>videojuegos</span> favorita</h1>
      <p>Descubre los mejores títulos del momento. Desde RPGs épicos hasta deportes de alta velocidad.</p>
      <div class="hero-btns">
        <a routerLink="/catalogo" class="btn-primary">Ver catálogo completo</a>
        <a routerLink="/agregar" class="btn-outline">+ Agregar juego</a>
      </div>
    </section>
 
    <div class="stats">
      <div class="stat">
        <div class="stat-val">{{ total() }}</div>
        <div class="stat-lbl">Juegos disponibles</div>
      </div>
      <div class="stat">
        <div class="stat-val">{{ generos().length }}</div>
        <div class="stat-lbl">Géneros</div>
      </div>
      <div class="stat">
        <div class="stat-val">{{ precioPromedio() | currency:'EUR':'symbol':'1.0-0' }}</div>
        <div class="stat-lbl">Precio promedio</div>
      </div>
      <div class="stat">
        <div class="stat-val">⭐ {{ top()[0]?.calificacion | number:'1.1-1' }}</div>
        <div class="stat-lbl">Top calificación</div>
      </div>
    </div>
 
    <section class="section">
      <div class="section-hdr">
        <h2 class="section-title">🏆 Mejor valorados</h2>
        <a routerLink="/catalogo" class="ver-todos">Ver todos →</a>
      </div>
      <div class="grid">
        @for (j of top(); track j.id) {
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
                <span style="font-size:0.78rem;color:#475569">{{ j.plataforma }}</span>
              </div>
            </div>
          </a>
        }
      </div>
    </section>
  `
})
export class Home {
  private svc = inject(VideojuegoService);
  total = this.svc.totalJuegos;
  generos = this.svc.generos;
  top = this.svc.mejorCalificados;
  precioPromedio = this.svc.precioPromedio;
}