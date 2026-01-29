import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { DetalleRaza } from './detalle/detalle-raza/detalle-raza';
import { BusquedaRaza } from './busquedaRaza/busqueda-raza/busqueda-raza';
import { BuscarPersonaje } from './personajes/buscar-personaje/buscar-personaje';
import { DetallePersonaje } from './personajes/detalle-personaje/detalle-personaje';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'buscar', component: Busqueda },
    { path: 'detalleRaza', component: DetalleRaza },
    { path: 'buscarRaza', component: BusquedaRaza },
    
    // Rutas para Personajes
    { path: 'buscar-personajes', component: BuscarPersonaje },
    { path: 'editar/:id', component: DetallePersonaje },
    { path: 'crearPersonaje', component: DetallePersonaje },
    
    
];