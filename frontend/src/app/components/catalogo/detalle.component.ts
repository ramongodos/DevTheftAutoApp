import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VideojuegoService } from '../../services/videojuego';
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  public juego = computed(() => this.videojuegoService.videojuegoSeleccionado());

  constructor(
    private videojuegoService: VideojuegoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.juego()) {
      this.router.navigate(['/']);
    }
  }
}