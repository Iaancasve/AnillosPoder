import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonajesService } from './../../servicios/personajes-service';

// Importaciones de PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
  // IMPORTANTE: Asegúrate de que TableModule y ButtonModule están aquí
  imports: [
    CommonModule, 
    RouterModule, 
    TableModule, 
    ButtonModule
  ], 
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit {
  personajes: any[] = [];
  error: string = "";

  constructor(
    private personajesService: PersonajesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("Componente BuscarPersonaje iniciado"); // Para depurar
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.personajesService.obtenerPersonajes().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data); // Mira la consola (F12) para ver si llegan datos
        this.personajes = data;
        this.error = "";
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al traer personajes:', err);
        this.error = 'No se ha podido conectar con el servidor.';
        this.cdr.detectChanges();
      }
    });
  }
}