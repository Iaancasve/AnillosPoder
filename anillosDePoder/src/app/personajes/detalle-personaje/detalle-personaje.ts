import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DatePickerModule } from 'primeng/datepicker';
import { PersonajesService } from "../../servicios/personajes-service";

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, DatePickerModule, RouterLink],
  templateUrl: './detalle-personaje.html',
})
export class DetallePersonaje implements OnInit {

  esEdicion: boolean = false;
  idPersonaje: number | null = null;

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    raza: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl(null, [Validators.required])
  });

  constructor(
    private personajesService: PersonajesService,
    private routeActiva: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.routeActiva.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idPersonaje = +idParam; 
      this.cargarDatosPersonaje(this.idPersonaje);
    }
  }

  cargarDatosPersonaje(id: number) {
    this.personajesService.obtenerPersonajePorId(id).subscribe({
      next: (personajeEncontrado) => {
        if (personajeEncontrado) {
          this.formulario.patchValue({
            nombre: personajeEncontrado.nombre,
            raza: personajeEncontrado.raza,
            fechaNacimiento: personajeEncontrado.fechaNacimiento ? new Date(personajeEncontrado.fechaNacimiento) : null
          });
        }
      },
      error: (error) => console.error('Error al cargar', error)
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    
    const datos = { ...this.formulario.value };

    
    if (datos.raza) {
      datos.raza = datos.raza.toUpperCase();
    }

   
    if (datos.fechaNacimiento instanceof Date) {
      const d = datos.fechaNacimiento;
      datos.fechaNacimiento = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    if (this.esEdicion && this.idPersonaje !== null) {
     
      const personajeActualizado = { 
        ...datos, 
        id: this.idPersonaje 
      };

      this.personajesService.actualizarPersonaje(personajeActualizado).subscribe({
        next: (response) => {
          alert('Personaje actualizado con éxito');
          this.router.navigate(['/buscar-personajes']);
        },
        error: (err) => {
          console.error('Error al actualizar', err);
          alert('Error al actualizar personaje');
        }
      });
    } else {
      
      this.personajesService.crearPersonaje(datos).subscribe({
        next: (response) => {
          alert('Personaje creado con éxito');
          this.router.navigate(['/buscar-personajes']);
        },
        error: (err) => {
          console.error('Error al crear', err);
          alert('Error al crear personaje');
        }
      });
    } 
  }

  volver() {
    this.router.navigate(['/buscar-personajes']);
  }
}