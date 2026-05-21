import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideojuegoService } from '../../services/videojuego.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent {
  juego = this.videojuegoService.videojuegoSeleccionado;

  constructor(private videojuegoService: VideojuegoService) {}
}