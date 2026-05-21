import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Videojuego {
  id: number;
  titulo: string;
  genero: string;
  plataforma: string;
  precio: number;
  anio: number;
  descripcion: string;
  imagen: string;
  calificacion: number;
  disponible: boolean;
}

const MOCK_JUEGOS: Videojuego[] = [
  { id: 1,  titulo: 'Elden Ring',             genero: 'RPG',      plataforma: 'PC / PS5 / Xbox',        precio: 59.99, anio: 2022, calificacion: 9.5, disponible: true,  imagen: 'https://placehold.co/400x240/7c3aed/ffffff?text=Elden+Ring',         descripcion: 'RPG de accion en mundo abierto por FromSoftware. Explora las Tierras Intermedias y sus innumerables secretos ocultos.' },
  { id: 2,  titulo: 'God of War Ragnarok',    genero: 'Accion',   plataforma: 'PS5 / PS4',              precio: 69.99, anio: 2022, calificacion: 9.4, disponible: true,  imagen: 'https://placehold.co/400x240/dc2626/ffffff?text=God+of+War',         descripcion: 'Kratos y Atreus viajan por los nueve reinos para enfrentarse al inminente Ragnarok en una aventura epica.' },
  { id: 3,  titulo: 'Cyberpunk 2077',         genero: 'RPG',      plataforma: 'PC / PS5 / Xbox',        precio: 39.99, anio: 2020, calificacion: 8.8, disponible: true,  imagen: 'https://placehold.co/400x240/f59e0b/000000?text=Cyberpunk+2077',    descripcion: 'RPG de accion en mundo abierto ambientado en Night City, una megalopolis futurista obsesionada con el poder.' },
  { id: 4,  titulo: 'FIFA 24',                genero: 'Deportes', plataforma: 'PC / PS5 / Xbox',        precio: 49.99, anio: 2023, calificacion: 7.8, disponible: true,  imagen: 'https://placehold.co/400x240/22c55e/ffffff?text=FIFA+24',           descripcion: 'La ultima entrega de la saga FIFA con tecnologia HyperMotion V y el modo Ultimate Team completamente renovado.' },
  { id: 5,  titulo: 'Call of Duty: MW3',      genero: 'Accion',   plataforma: 'PC / PS5 / Xbox',        precio: 69.99, anio: 2023, calificacion: 7.5, disponible: true,  imagen: 'https://placehold.co/400x240/374151/ffffff?text=Call+of+Duty',      descripcion: 'El shooter tactico mas esperado con campana renovada, multijugador clasico y modo Zombies renovado.' },
  { id: 6,  titulo: 'The Last of Us Part II', genero: 'Aventura', plataforma: 'PS4 / PS5',              precio: 44.99, anio: 2020, calificacion: 9.3, disponible: true,  imagen: 'https://placehold.co/400x240/166534/ffffff?text=The+Last+of+Us+II', descripcion: 'Ellie emprende un viaje a traves de EE.UU. en una historia de supervivencia, amor y consecuencias.' },
  { id: 7,  titulo: 'Red Dead Redemption 2',  genero: 'Aventura', plataforma: 'PC / PS4 / Xbox',        precio: 34.99, anio: 2018, calificacion: 9.8, disponible: true,  imagen: 'https://placehold.co/400x240/92400e/ffffff?text=Red+Dead+2',        descripcion: 'Epica historia sobre Arthur Morgan en el declive de la era forajida del salvaje oeste americano.' },
  { id: 8,  titulo: 'Hogwarts Legacy',        genero: 'RPG',      plataforma: 'PC / PS5 / Xbox',        precio: 54.99, anio: 2023, calificacion: 8.9, disponible: true,  imagen: 'https://placehold.co/400x240/4f46e5/ffffff?text=Hogwarts+Legacy',   descripcion: 'Vive la experiencia de ser estudiante en Hogwarts en el siglo XIX con magia, misiones y exploracion.' },
  { id: 9,  titulo: 'Minecraft',              genero: 'Sandbox',  plataforma: 'PC / PS / Xbox / Mobile', precio: 26.99, anio: 2011, calificacion: 9.0, disponible: true,  imagen: 'https://placehold.co/400x240/65a30d/ffffff?text=Minecraft',         descripcion: 'El juego sandbox mas vendido de la historia. Construye, explora y sobrevive en mundos infinitos.' },
  { id: 10, titulo: "Baldur's Gate 3",        genero: 'RPG',      plataforma: 'PC / PS5',               precio: 59.99, anio: 2023, calificacion: 9.6, disponible: true,  imagen: 'https://placehold.co/400x240/581c87/ffffff?text=Baldur+Gate+3',     descripcion: "RPG por turnos basado en D&D 5a edicion. Forja tu destino en un universo de alta fantasia." },
  { id: 11, titulo: 'Forza Horizon 5',        genero: 'Deportes', plataforma: 'PC / Xbox',              precio: 49.99, anio: 2021, calificacion: 9.2, disponible: true,  imagen: 'https://placehold.co/400x240/f97316/ffffff?text=Forza+Horizon+5',   descripcion: 'Explora el vibrante mundo abierto de Mexico en el juego de conduccion de mundo abierto definitivo.' },
  { id: 12, titulo: 'Resident Evil 4 Remake', genero: 'Terror',   plataforma: 'PC / PS5 / Xbox',        precio: 59.99, anio: 2023, calificacion: 9.3, disponible: true,  imagen: 'https://placehold.co/400x240/1e293b/f87171?text=Resident+Evil+4',  descripcion: 'Reimaginacion del clasico survival horror donde Leon S. Kennedy rescata a la hija del presidente.' },
];

@Injectable({ providedIn: 'root' })
export class VideojuegoService {
  private apiUrl = 'http://localhost:8080/api/videojuegos';

  private _juegos        = signal<Videojuego[]>(MOCK_JUEGOS);
  private _busqueda      = signal<string>('');
  private _generoFiltro  = signal<string>('');

  readonly juegos       = this._juegos.asReadonly();
  readonly busqueda     = this._busqueda.asReadonly();
  readonly generoFiltro = this._generoFiltro.asReadonly();
  readonly videojuegoSeleccionado = signal<Videojuego | null>(null);

  readonly juegosFiltrados = computed(() => {
    const q = this._busqueda().toLowerCase().trim();
    const g = this._generoFiltro();
    return this._juegos().filter(j =>
      (!q || j.titulo.toLowerCase().includes(q) || j.genero.toLowerCase().includes(q)) &&
      (!g || j.genero === g)
    );
  });

  readonly generos          = computed(() => [...new Set(this._juegos().map(j => j.genero))].sort());
  readonly totalJuegos      = computed(() => this._juegos().length);
  readonly mejorCalificados = computed(() => [...this._juegos()].sort((a, b) => b.calificacion - a.calificacion).slice(0, 3));
  readonly precioPromedio   = computed(() => {
    const j = this._juegos();
    return j.length ? j.reduce((s, x) => s + x.precio, 0) / j.length : 0;
  });

  setBusqueda(v: string):     void { this._busqueda.set(v); }
  setGeneroFiltro(v: string): void { this._generoFiltro.set(v); }

  getById(id: number): Videojuego | undefined {
    return this._juegos().find(j => j.id === id);
  }

  agregar(datos: Omit<Videojuego, 'id'>): void {
    const maxId = Math.max(0, ...this._juegos().map(j => j.id));
    this._juegos.update(j => [...j, { ...datos, id: maxId + 1 }]);
  }

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Videojuego[]>               { return this.http.get<Videojuego[]>(this.apiUrl); }
  obtenerPorId(id: number): Observable<Videojuego>       { return this.http.get<Videojuego>(`${this.apiUrl}/${id}`); }
  crearVideojuego(v: Videojuego): Observable<Videojuego> { return this.http.post<Videojuego>(this.apiUrl, v); }
}