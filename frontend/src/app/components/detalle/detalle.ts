import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { VideojuegoService, Videojuego } from '../../services/videojuego';
 
@Component({
  selector: 'app-detalle',
  imports: [RouterLink, CurrencyPipe, DecimalPipe],
  styles: [`
    .page { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .back { display: inline-flex; align-items: center; gap: 0.4rem; color: #94a3b8; font-size: 0.9rem; text-decoration: none; margin-bottom: 2rem; transition: color 0.2s; }
    .back:hover { color: #a78bfa; }
    .card { background: #16162a; border: 1px solid #2e2e52; border-radius: 16px; overflow: hidden; }
    .card img { width: 100%; height: 320px; object-fit: cover; }
    .card-body { padding: 2rem; }
    .card-hdr { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .title { font-size: 2rem; font-weight: 900; line-height: 1.2; }
    .price { font-size: 2rem; font-weight: 900; color: #a78bfa; white-space: nowrap; }
    .meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
    .meta-item { display: flex; flex-direction: column; gap: 3px; }
    .meta-lbl { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700; }
    .meta-val { font-size: 0.95rem; font-weight: 600; }
    .rating { color: #f59e0b; font-size: 1.1rem; font-weight: 800; }
    .disp-on { display: inline-flex; align-items: center; gap: 0.3rem; padding: 3px 10px; border-radius: 20px; background: rgba(34,197,94,.15); color: #4ade80; border: 1px solid rgba(34,197,94,.3); font-size: 0.8rem; font-weight: 700; }
    .disp-off { display: inline-flex; align-items: center; gap: 0.3rem; padding: 3px 10px; border-radius: 20px; background: rgba(239,68,68,.15); color: #f87171; border: 1px solid rgba(239,68,68,.3); font-size: 0.8rem; font-weight: 700; }
    .desc-lbl { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700; margin-bottom: 0.6rem; }
    .desc { color: #94a3b8; line-height: 1.8; }
    .actions { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
    .btn-buy { background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 0.8rem 2rem; border-radius: 10px; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; box-shadow: 0 0 16px rgba(124,58,237,.35); transition: all 0.2s; }
    .btn-buy:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(124,58,237,.55); }
    .btn-back { border: 1px solid #2e2e52; color: #e2e8f0; padding: 0.8rem 1.75rem; border-radius: 10px; font-weight: 600; background: transparent; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; }
    .btn-back:hover { border-color: #7c3aed; background: rgba(124,58,237,.1); }
    .not-found { text-align: center; padding: 5rem 1rem; color: #64748b; }
    .not-found h2 { color: #94a3b8; margin-bottom: 1rem; font-size: 1.4rem; }
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
      <a routerLink="/catalogo" class="back">← Volver al catálogo</a>
      @if (juego()) {
        <div class="card">
          <img [src]="juego()!.imagen" [alt]="juego()!.titulo" />
          <div class="card-body">
            <div class="card-hdr">
              <h1 class="title">{{ juego()!.titulo }}</h1>
              <span class="price">{{ juego()!.precio | currency:'EUR' }}</span>
            </div>
            <div class="meta">
              <div class="meta-item">
                <span class="meta-lbl">Género</span>
                <span class="badge" [class]="'badge-' + juego()!.genero">{{ juego()!.genero }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Plataforma</span>
                <span class="meta-val">{{ juego()!.plataforma }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Año</span>
                <span class="meta-val">{{ juego()!.anio }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Calificación</span>
                <span class="rating">★ {{ juego()!.calificacion | number:'1.1-1' }} / 10</span>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Disponibilidad</span>
                @if (juego()!.disponible) {
                  <span class="disp-on">✓ Disponible</span>
                } @else {
                  <span class="disp-off">✗ No disponible</span>
                }
              </div>
            </div>
            <div class="desc-lbl">Descripción</div>
            <p class="desc">{{ juego()!.descripcion }}</p>
            <div class="actions">
              <button class="btn-buy">🛒 Agregar al carrito</button>
              <a routerLink="/catalogo" class="btn-back">← Ver más juegos</a>
            </div>
          </div>
        </div>
      } @else {
        <div class="not-found">
          <div style="font-size:3rem;margin-bottom:1rem">🎮</div>
          <h2>Juego no encontrado</h2>
          <a routerLink="/catalogo" class="btn-back" style="display:inline-flex;margin-top:1rem">Volver al catálogo</a>
        </div>
      }
    </div>
  `
})
export class Detalle implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(VideojuegoService);
 
  juego = signal<Videojuego | undefined>(undefined);
 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.svc.getById(id);
    if (!found) {
      this.router.navigate(['/catalogo']);
      return;
    }
    this.juego.set(found);
  }
}