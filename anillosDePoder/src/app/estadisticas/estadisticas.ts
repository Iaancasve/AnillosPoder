import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaHistorial } from '../interfaces/partida-historial'; 

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; color: white;">
      <h2>Estadísticas de Partidas</h2>
      <p>Victorias: {{ victorias }} | Derrotas: {{ derrotas }}</p>
      <hr>
      <ul>
        @for (p of historial; track p.idPartida) {
          <li>{{ p.fecha }} - Partida #{{ p.idPartida }}: {{ p.resultado }} ({{ p.aciertos }} aciertos)</li>
        }
      </ul>
    </div>
  `
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