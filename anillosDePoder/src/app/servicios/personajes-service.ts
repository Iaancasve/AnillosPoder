import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  // Usamos la URL base definida en el environment
  private urlESDLN = environment.apiESDLA;

  constructor(private http: HttpClient){}

  // Método existente para listar todos los personajes
  obtenerPersonajes(): Observable<any[]>{
    return this.http.get<any[]>(`${this.urlESDLN}listaPersonajes`);
  }

  // NUEVO: Obtener un solo personaje por su ID para editarlo
  obtenerPersonajePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlESDLN}personaje/${id}`);
  }

  // NUEVO: Enviar datos para crear un nuevo personaje
  crearPersonaje(personaje: any): Observable<any> {
    return this.http.post<any>(`${this.urlESDLN}crear`, personaje);
  }

  // NUEVO: Enviar datos para actualizar un personaje existente
  actualizarPersonaje(personaje: any): Observable<any> {
    return this.http.put<any>(`${this.urlESDLN}editar`, personaje);
  }
}