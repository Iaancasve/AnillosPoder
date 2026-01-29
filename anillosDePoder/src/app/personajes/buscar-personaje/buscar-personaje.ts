import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonajesService } from './../../servicios/personajes-service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
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
    console.log("Componente BuscarPersonaje iniciado"); 
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.personajesService.obtenerPersonajes().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data); 
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