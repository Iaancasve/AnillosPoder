import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para las directivas
import { PersonajesService } from './../../servicios/personajes-service';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true, // Asegúrate de que sea standalone si no usas NgModules
  imports: [CommonModule], 
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit {
  personajes: any[] = [];
  error = "";

  constructor(private personajesService: PersonajesService) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.personajesService.obtenerPersonajes().subscribe({
      next: (data) => {
        this.personajes = data;
      },
      error: (err) => {
        this.error = 'Se ha producido un error en la petición';
      }
    });
  }
}


