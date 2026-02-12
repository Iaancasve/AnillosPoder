import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portadores-component',
  imports: [FormsModule],
  templateUrl: './portadores-component.html',
  styleUrl: './portadores-component.css',
})

export class PortadoresComponent implements OnInit {

  nombreAnillo = ""
  nombrePortador = ""
  raza = ""
  nivel = 0

  ngOnInit(){
    this.nombreAnillo = localStorage.getItem("nombreAnillo") ?? ''
    this.nombrePortador = localStorage.getItem("nombrePortador") ?? ''
    this.raza = localStorage.getItem("raza") ?? ''
    this.nivel = Number(localStorage.getItem("nivel")) ?? 0
  }


  guardarDatos() {
    localStorage.setItem("nombrePortador", this.nombrePortador)
    localStorage.setItem("nombreAnilo", this.nombreAnillo)
    localStorage.setItem("raza", this.raza)
    localStorage.setItem("nivel", JSON.stringify(this.nivel))
    alert("Se han guardado los datos")
  }


  
}
