import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VideojuegoService, Videojuego } from '../../services/videojuego';
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  miFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private videojuegoService: VideojuegoService,
    private router: Router
  ) {
    this.miFormulario = this.fb.group({
      titulo:       ['', [Validators.required]],
      genero:       ['', [Validators.required]],
      plataforma:   ['', [Validators.required]],
      precio:       [0,  [Validators.required, Validators.min(0)]],
      anio:         [new Date().getFullYear(), [Validators.required]],
      calificacion: [5,  [Validators.required, Validators.min(0), Validators.max(10)]],
      imagen:       [''],
      descripcion:  ['', [Validators.required]],
      disponible:   [true]
    });
  }

  guardar() {
    if (this.miFormulario.valid) {
      const v = this.miFormulario.value as Omit<Videojuego, 'id'>;
      this.videojuegoService.agregar(v);
      this.router.navigate(['/catalogo']);
    }
  }
}