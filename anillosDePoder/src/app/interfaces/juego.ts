
export interface Pregunta {
  id: number;
  pregunta: string;      
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;
  respuestaCorrecta: number;
}

export interface Partida {
  id: number;
  puntos: number;
  finalizada: boolean;
}