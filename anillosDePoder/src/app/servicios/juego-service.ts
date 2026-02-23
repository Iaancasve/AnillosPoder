import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pregunta } from '../interfaces/juego';
import { Partida } from '../interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private url = environment.apiESDLA;

  constructor(private http: HttpClient) {}

  empezarPartida(): Observable<Partida> {
    return this.http.get<Partida>(`${this.url}empezarPartida/`);
  }

  obtenerPregunta(id: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.url}obtenerPregunta/${id}`);
  }

  comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}respuesta/${idPregunta}/?respuestaUsuario=${respuestaUsuario}`);
  }

  sumarPunto(idPartida: number): Observable<Partida> {
    return this.http.put<Partida>(`${this.url}correcta/${idPartida}/`, {});
  }

  finalizarPartida(idPartida: number): Observable<Partida> {
    return this.http.put<Partida>(`${this.url}finalizar/${idPartida}/`, {});
  }
}