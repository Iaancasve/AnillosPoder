import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../servicios/juego-service';
import { Pregunta } from '../interfaces/juego';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego.html'
})
export class JuegoComponent implements OnInit {
  preguntaActual?: Pregunta;
  idPartidaActual?: number;
  aciertos: number = 0;
  respondidas: number[] = [];
  juegoTerminado = false;
  mensajeFinal: string = '';

  constructor(private juegoService: JuegoService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.iniciar();
  }

  iniciar() {
    this.juegoService.empezarPartida().subscribe(partida => {
      this.idPartidaActual = partida.id;
      this.aciertos = 0;
      this.respondidas = [];
      this.juegoTerminado = false;
      this.cargarPregunta();
    });
  }

  cargarPregunta() {
    let id;
    do {
      id = Math.floor(Math.random() * 10) + 1;
    } while (this.respondidas.includes(id) && this.respondidas.length < 10);

    this.juegoService.obtenerPregunta(id).subscribe(data => {
      this.preguntaActual = data;
      this.cdr.detectChanges();
      this.respondidas.push(id);
    });
  }

  responder(indice: number) {
    if (!this.preguntaActual || !this.idPartidaActual) return;

    this.juegoService.comprobarRespuesta(this.preguntaActual.id, indice).subscribe(esCorrecta => {
      if (esCorrecta) {
        this.aciertos++;
        this.juegoService.sumarPunto(this.idPartidaActual!).subscribe();

        if (this.aciertos === 5) {
          this.terminar('victoria');
        } else {
          this.cargarPregunta();
        }
      } else {
        this.terminar('derrota');
      }
      this.cdr.detectChanges();
    });
  }

  terminar(resultado: 'victoria' | 'derrota') {
    this.juegoService.finalizarPartida(this.idPartidaActual!).subscribe(() => {
      this.juegoTerminado = true;
      this.mensajeFinal = resultado === 'victoria'
        ? '¡Has ganado! Eres un auténtico maestre de la Tierra Media.'
        : 'Has caído en la oscuridad. ¡Inténtalo de nuevo!';

      // Guardar en localStorage para estadísticas
      const stats = JSON.parse(localStorage.getItem('historial') || '[]');
      stats.push({
        idPartida: this.idPartidaActual,
        fecha: new Date().toLocaleString(),
        resultado: resultado,
        aciertos: this.aciertos
      });
      localStorage.setItem('historial', JSON.stringify(stats));
    });
  }
}