import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { DetalleRaza } from './detalle/detalle-raza/detalle-raza';
import { BusquedaRaza } from './busquedaRaza/busqueda-raza/busqueda-raza';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'buscar', component: Busqueda },
    { path: 'detalleRaza', component: DetalleRaza },
    { path: 'buscarRaza', component: BusquedaRaza },
];
