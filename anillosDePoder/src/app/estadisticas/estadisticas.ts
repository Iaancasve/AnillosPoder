import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaHistorial } from '../interfaces/partida-historial'; 
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class EstadisticasComponent implements OnInit {
  historial: PartidaHistorial[] = []; 
  victorias = 0;
  derrotas = 0;

  ngOnInit() {
    this.historial = JSON.parse(localStorage.getItem('historial') || '[]');
    
    this.victorias = this.historial.filter(p => p.resultado === 'victoria').length;
    this.derrotas = this.historial.filter(p => p.resultado === 'derrota').length;
  }
}