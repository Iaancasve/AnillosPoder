import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {

  constructor(private http: HttpClient){}

  private urlESDLN = environment.apiESDLA;

  obtenerPersonajes(): Observable <any []>{
    return this.http.get<any []>(`${this.urlESDLN}listaPersonajes`)  
  }
}
