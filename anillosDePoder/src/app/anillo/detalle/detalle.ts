import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select'; 
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    InputTextModule, 
    ButtonModule, 
    SelectModule, 
    SliderModule, 
    RouterLink
  ],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {
  opcionesRazas = [
    { label: 'Elfo', value: 'Elfo' },
    { label: 'Enano', value: 'Enano' },
    { label: 'Humano', value: 'Humano' },
    { label: 'Maiar', value: 'Maiar' },
    { label: 'Oscuro', value: 'Oscuro' }
  ];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    portador: new FormControl('', [Validators.required]),
    raza: new FormControl(null, [Validators.required]),
    poder: new FormControl('', [Validators.required]),
    corrupcion: new FormControl(0) 
  });

  guardar() {
    if (this.formulario.valid) {
      console.log('Anillo guardado:', this.formulario.value);
      alert('¡Anillo forjado con éxito!');
      this.limpiar()
    } 
  }

  limpiar() {
    this.formulario.setValue({
      nombre: '',
      portador: '',
      raza: null,
      poder: '',
      corrupcion: 0
    });

    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
  }

  
}