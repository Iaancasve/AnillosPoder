import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonajesService } from './../../servicios/personajes-service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
  providers: [ConfirmationService, MessageService],
})
export class BuscarPersonaje implements OnInit {
  personajes: any[] = [];
  error: string = "";

  constructor(
    private personajesService: PersonajesService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log("Componente BuscarPersonaje iniciado");
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.personajesService.obtenerPersonajes().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);
        this.personajes = data;
        this.error = "";
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al traer personajes:', err);
        this.error = 'No se ha podido conectar con el servidor.';
        this.cdr.detectChanges();
      }
    });
  }

  confirmarBajaFisica(id: number) {
    this.confirmationService.confirm({
      message: 'Se va a borrar de forma definitiva el registro ¿Estás seguro que deseas borrarlo?',
      header: 'Confirmación de Borrado Físico',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personajesService.bajaFisica(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Borrado', detail: 'Personaje eliminado definitivamente' });
            this.cargarPersonajes();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede borrar ese personaje porque es portador' });
          }
        });
      }
    });
  }

  confirmarBajaLogica(id: number) {
    this.confirmationService.confirm({
      message: 'Se va a dar de baja el personaje ¿Estás seguro?',
      header: 'Confirmación de Baja',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.personajesService.bajaLogica(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Se ha dado de baja correctamente'
            });
            this.cargarPersonajes();
          }
        });
      }
    });
  }

  confirmarReactivacion(id: number) {
    this.confirmationService.confirm({
      message: '¿Deseas reactivar el personaje?',
      header: 'Reactivar Personaje',
      icon: 'pi pi-refresh',
      accept: () => {
        this.personajesService.reactivar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Personaje reactivado correctamente' });
            this.cargarPersonajes();
          }
        });
      }
    });
  }
}