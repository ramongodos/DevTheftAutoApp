import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VideojuegoService } from '../../services/videojuego';
 
@Component({
  selector: 'app-agregar',
  imports: [ReactiveFormsModule, RouterLink],
  styles: [`
    .page { max-width: 720px; margin: 0 auto; padding: 2rem; }
    .back { display: inline-flex; align-items: center; gap: 0.4rem; color: #94a3b8; font-size: 0.9rem; text-decoration: none; margin-bottom: 2rem; transition: color 0.2s; }
    .back:hover { color: #a78bfa; }
    h1 { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.25rem; }
    .subtitle { color: #64748b; margin-bottom: 2rem; }
    .success { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.3); color: #4ade80; padding: 1rem 1.25rem; border-radius: 10px; margin-bottom: 1.5rem; font-weight: 600; }
    .form-card { background: #16162a; border: 1px solid #2e2e52; border-radius: 16px; padding: 2rem; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .full { grid-column: 1 / -1; }
    .fg { display: flex; flex-direction: column; gap: 0.4rem; }
    label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
    input, select, textarea {
      padding: 0.7rem 1rem;
      background: #0d0d14;
      border: 1px solid #2e2e52;
      border-radius: 8px;
      color: #e2e8f0;
      font-size: 0.95rem;
      font-family: inherit;
      transition: border-color 0.2s;
      outline: none;
      width: 100%;
    }
    input:focus, select:focus, textarea:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.12); }
    .invalid-field { border-color: #ef4444 !important; }
    .err { font-size: 0.76rem; color: #f87171; }
    .chk-row { display: flex; align-items: center; gap: 0.75rem; }
    .chk-row input { width: 18px; height: 18px; accent-color: #7c3aed; cursor: pointer; }
    .chk-row label { text-transform: none; letter-spacing: 0; font-size: 0.95rem; color: #e2e8f0; font-weight: 500; cursor: pointer; }
    .actions { display: flex; gap: 1rem; margin-top: 1.75rem; flex-wrap: wrap; }
    .btn-save { flex: 1; min-width: 160px; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 0.85rem 1.75rem; border-radius: 10px; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; box-shadow: 0 0 16px rgba(124,58,237,.35); transition: all 0.2s; }
    .btn-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 28px rgba(124,58,237,.55); }
    .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-cancel { border: 1px solid #2e2e52; color: #e2e8f0; padding: 0.85rem 1.5rem; border-radius: 10px; font-weight: 600; background: transparent; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; }
    .btn-cancel:hover { border-color: #7c3aed; background: rgba(124,58,237,.08); }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
  `],
  template: `
    <div class="page">
      <a routerLink="/catalogo" class="back">← Volver al catálogo</a>
      <h1>➕ Agregar juego</h1>
      <p class="subtitle">Rellena el formulario para añadir un nuevo videojuego al catálogo</p>
 
      @if (exito()) {
        <div class="success">✓ ¡Juego agregado! Redirigiendo al catálogo...</div>
      }
 
      <div class="form-card">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="grid">
 
            <div class="fg full">
              <label for="titulo">Título *</label>
              <input id="titulo" type="text" formControlName="titulo"
                [class.invalid-field]="f['titulo'].invalid && f['titulo'].touched"
                placeholder="Ej: The Legend of Zelda" />
              @if (f['titulo'].invalid && f['titulo'].touched) {
                <span class="err">El título es obligatorio (mín. 2 caracteres)</span>
              }
            </div>
 
            <div class="fg">
              <label for="genero">Género *</label>
              <select id="genero" formControlName="genero"
                [class.invalid-field]="f['genero'].invalid && f['genero'].touched">
                <option value="" disabled>Selecciona un género</option>
                @for (g of generos; track g) {
                  <option [value]="g">{{ g }}</option>
                }
              </select>
              @if (f['genero'].invalid && f['genero'].touched) {
                <span class="err">Selecciona un género</span>
              }
            </div>
 
            <div class="fg">
              <label for="plataforma">Plataforma *</label>
              <input id="plataforma" type="text" formControlName="plataforma"
                [class.invalid-field]="f['plataforma'].invalid && f['plataforma'].touched"
                placeholder="PC / PS5 / Xbox" />
              @if (f['plataforma'].invalid && f['plataforma'].touched) {
                <span class="err">La plataforma es obligatoria</span>
              }
            </div>
 
            <div class="fg">
              <label for="precio">Precio (€) *</label>
              <input id="precio" type="number" formControlName="precio"
                [class.invalid-field]="f['precio'].invalid && f['precio'].touched"
                placeholder="49.99" step="0.01" min="0" />
              @if (f['precio'].invalid && f['precio'].touched) {
                <span class="err">Introduce un precio válido (≥ 0)</span>
              }
            </div>
 
            <div class="fg">
              <label for="anio">Año *</label>
              <input id="anio" type="number" formControlName="anio"
                [class.invalid-field]="f['anio'].invalid && f['anio'].touched"
                placeholder="2024" min="1970" max="2030" />
              @if (f['anio'].invalid && f['anio'].touched) {
                <span class="err">Año entre 1970 y 2030</span>
              }
            </div>
 
            <div class="fg">
              <label for="calificacion">Calificación (0–10) *</label>
              <input id="calificacion" type="number" formControlName="calificacion"
                [class.invalid-field]="f['calificacion'].invalid && f['calificacion'].touched"
                placeholder="8.5" step="0.1" min="0" max="10" />
              @if (f['calificacion'].invalid && f['calificacion'].touched) {
                <span class="err">Calificación entre 0 y 10</span>
              }
            </div>
 
            <div class="fg full">
              <label for="imagen">URL de imagen (opcional)</label>
              <input id="imagen" type="url" formControlName="imagen" placeholder="https://..." />
            </div>
 
            <div class="fg full">
              <label for="descripcion">Descripción *</label>
              <textarea id="descripcion" formControlName="descripcion" rows="4"
                [class.invalid-field]="f['descripcion'].invalid && f['descripcion'].touched"
                placeholder="Describe el videojuego..."></textarea>
              @if (f['descripcion'].invalid && f['descripcion'].touched) {
                <span class="err">La descripción es obligatoria (mín. 20 caracteres)</span>
              }
            </div>
 
            <div class="fg full">
              <div class="chk-row">
                <input type="checkbox" id="disponible" formControlName="disponible" />
                <label for="disponible">Disponible para compra</label>
              </div>
            </div>
 
          </div>
          <div class="actions">
            <button type="submit" class="btn-save" [disabled]="form.invalid">✓ Guardar juego</button>
            <a routerLink="/catalogo" class="btn-cancel">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class Agregar {
  private fb = inject(FormBuilder);
  private svc = inject(VideojuegoService);
  private router = inject(Router);
 
  exito = signal(false);
 
  generos = ['RPG', 'Acción', 'Aventura', 'Deportes', 'Terror', 'Sandbox', 'Estrategia', 'Simulación', 'Plataformas', 'Lucha'];
 
  form = this.fb.group({
    titulo:       ['', [Validators.required, Validators.minLength(2)]],
    genero:       ['', Validators.required],
    plataforma:   ['', Validators.required],
    precio:       [null as number | null, [Validators.required, Validators.min(0)]],
    anio:         [null as number | null, [Validators.required, Validators.min(1970), Validators.max(2030)]],
    calificacion: [null as number | null, [Validators.required, Validators.min(0), Validators.max(10)]],
    imagen:       [''],
    descripcion:  ['', [Validators.required, Validators.minLength(20)]],
    disponible:   [true]
  });
 
  get f() { return this.form.controls; }
 
  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    this.svc.agregar({
      titulo:       v.titulo!,
      genero:       v.genero!,
      plataforma:   v.plataforma!,
      precio:       Number(v.precio),
      anio:         Number(v.anio),
      calificacion: Number(v.calificacion),
      imagen:       v.imagen || `https://placehold.co/400x240/7c3aed/ffffff?text=${encodeURIComponent(v.titulo!)}`,
      descripcion:  v.descripcion!,
      disponible:   v.disponible ?? true
    });
    this.exito.set(true);
    setTimeout(() => this.router.navigate(['/catalogo']), 1500);
  }
}
 