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
    this.personajesService.obtenerPersonajes().subscribe({
      next: (listaPersonajes) => {
        const personajeEncontrado = listaPersonajes.find((p: any) => p.id === id);
        if (personajeEncontrado) {
          let fecha = null;
          if (personajeEncontrado.fechaNacimiento) {
            fecha = new Date(personajeEncontrado.fechaNacimiento);
          }
          this.formulario.patchValue({
            nombre: personajeEncontrado.nombre,
            raza: personajeEncontrado.raza,
            fechaNacimiento: fecha
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

  // Obtenemos los valores del formulario
  const datos = { ...this.formulario.value };

  // Formateamos la fecha a string (YYYY-MM-DD) para que el servidor la acepte
  if (datos.fechaNacimiento instanceof Date) {
    const d = datos.fechaNacimiento;
    datos.fechaNacimiento = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  if (this.esEdicion && this.idPersonaje !== null) {
    // UNIFICAMOS: Metemos el ID dentro del objeto 'datos'
    const personajeActualizado = { 
      ...datos, 
      id: this.idPersonaje 
    };

    // LLAMADA CON UN SOLO ARGUMENTO (personajeActualizado)
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
    // Lógica para crear (insertarPersonaje)
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