import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VideojuegoService, Videojuego } from '../../services/videojuego.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  videojuegos: Videojuego[] = [];

  constructor(private videojuegoService: VideojuegoService, private router: Router) {}

  ngOnInit(): OnInit {
    this.videojuegoService.obtenerTodos().subscribe(data => {
      this.videojuegos = data;
    });
  }

  verDetalle(juego: Videojuego) {
    this.videojuegoService.videojuegoSeleccionado.set(juego);
    this.router.navigate(['/detalle']);
  }
}