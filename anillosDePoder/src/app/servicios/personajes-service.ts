import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  private urlESDLN = environment.apiESDLA;

  constructor(private http: HttpClient){}

obtenerPersonajes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlESDLN}listaPersonajes`);
}

obtenerPersonajePorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.urlESDLN}obtenerPersonaje/${id}`);
}

crearPersonaje(personaje: any): Observable<any> {
  return this.http.post<any>(`${this.urlESDLN}insertarPersonaje`, personaje);
}

actualizarPersonaje(personaje: any): Observable<any> {
  return this.http.put<any>(`${this.urlESDLN}actualizarPersonaje/${personaje.id}`, personaje);
}
}