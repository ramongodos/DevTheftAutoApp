import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Videojuego {
  id?: number;
  titulo: string;
  genero: string;
  fechaLanzamiento: string;
  estudioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class VideojuegoService {
  private apiUrl = 'http://localhost:8080/api/videojuegos';

  public videojuegoSeleccionado = signal<Videojuego | null>(null);

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Videojuego[]> {
    return this.http.get<Videojuego[]>(this.apiUrl);
  }
}