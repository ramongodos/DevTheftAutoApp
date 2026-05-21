import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genero {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Videojuego {
  id: number;
  titulo: string;
  genero: Genero;
  plataforma: string;
  precio: number;
  anio: number;
  descripcion: string;
  imagen: string;
  calificacion: number;
  disponible: boolean;
  desarrollador?: string;
}

@Injectable({ providedIn: 'root' })
export class VideojuegoService {
  private apiUrl     = 'http://localhost:8080/api/videojuegos';
  private generosUrl = 'http://localhost:8080/api/generos';

  private _juegos       = signal<Videojuego[]>([]);
  private _busqueda     = signal<string>('');
  private _generoFiltro = signal<string>('');

  readonly juegos       = this._juegos.asReadonly();
  readonly busqueda     = this._busqueda.asReadonly();
  readonly generoFiltro = this._generoFiltro.asReadonly();
  readonly videojuegoSeleccionado = signal<Videojuego | null>(null);

  readonly juegosFiltrados = computed(() => {
    const q = this._busqueda().toLowerCase().trim();
    const g = this._generoFiltro();
    return this._juegos().filter(j =>
      (!q || j.titulo.toLowerCase().includes(q) || j.genero.nombre.toLowerCase().includes(q)) &&
      (!g || j.genero.nombre === g)
    );
  });

  readonly generos          = computed(() => [...new Set(this._juegos().map(j => j.genero.nombre))].sort());
  readonly totalJuegos      = computed(() => this._juegos().length);
  readonly mejorCalificados = computed(() => [...this._juegos()].sort((a, b) => b.calificacion - a.calificacion).slice(0, 3));
  readonly precioPromedio   = computed(() => {
    const j = this._juegos();
    return j.length ? j.reduce((s, x) => s + x.precio, 0) / j.length : 0;
  });

  constructor(private http: HttpClient) {
    this.http.get<Videojuego[]>(this.apiUrl).subscribe(data => this._juegos.set(data));
  }

  setBusqueda(v: string):     void { this._busqueda.set(v); }
  setGeneroFiltro(v: string): void { this._generoFiltro.set(v); }

  getById(id: number): Videojuego | undefined {
    return this._juegos().find(j => j.id === id);
  }

  agregar(datos: Omit<Videojuego, 'id'>): void {
    this.http.post<Videojuego>(this.apiUrl, datos).subscribe(nuevo => {
      this._juegos.update(j => [...j, nuevo]);
    });
  }

  obtenerTodos(): Observable<Videojuego[]>               { return this.http.get<Videojuego[]>(this.apiUrl); }
  obtenerPorId(id: number): Observable<Videojuego>       { return this.http.get<Videojuego>(`${this.apiUrl}/${id}`); }
  crearVideojuego(v: Videojuego): Observable<Videojuego> { return this.http.post<Videojuego>(this.apiUrl, v); }
  obtenerGeneros(): Observable<Genero[]>                 { return this.http.get<Genero[]>(this.generosUrl); }
}