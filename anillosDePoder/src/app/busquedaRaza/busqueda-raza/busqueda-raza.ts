import { Raza } from './../../interfaces/raza';
import { RAZAS } from '../../clases/razas';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'; 
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-busqueda',
  standalone: true, 
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    TableModule,
    CardModule
  ],
  templateUrl: './busqueda-raza.html',
  styleUrl: './busqueda-raza.css',
})
export class BusquedaRaza {
  raza = new RAZAS();
  razasFiltradas: Raza[] = this.raza.razas;
  campoBusqueda: string = '';

  buscarRaza() {
    const t = this.campoBusqueda.toLowerCase();
    this.razasFiltradas = this.raza.razas.filter(r =>
      r.nombre.toLowerCase().includes(t) ||
      r.regionPrincipal.toLowerCase().includes(t) ||
      r.longevidad.toLowerCase().includes(t) ||
      r.descripcion.toLowerCase().includes(t)
    );
  }
}