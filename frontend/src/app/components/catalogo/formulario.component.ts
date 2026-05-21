import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VideojuegoService } from '../../services/videojuego'; 
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
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaLanzamiento: ['', [Validators.required]],
      estudioId: [1, [Validators.required]]
    });
  }

  guardar() {
    if (this.miFormulario.valid) {
      this.videojuegoService.crearVideojuego(this.miFormulario.value).subscribe({
        next: () => {
          alert('¡Videojuego guardado con éxito!');
          this.router.navigate(['/catalogo']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
        }
      });
    }
  }
}