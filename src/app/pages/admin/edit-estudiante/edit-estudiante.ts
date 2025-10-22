import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EstudianteService } from '../../../core/services/estudiante-service';
import { Estudiante } from '../../../core/models/entities';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Preloader } from '../../../shared/components/preloader/preloader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-estudiante',
  imports: [Preloader, FormsModule ],
  templateUrl: './edit-estudiante.html',
  styleUrl: './edit-estudiante.css'
})
export class EditEstudiante implements OnInit, OnDestroy {

  /////////////////////////////////////////////////
  nFases: number = 3;
  cargaCompletada: boolean = false;
  fasesCargadas: number = 0;
  /////////////////////////////////////////////////



  private _estudianteService: EstudianteService = inject(EstudianteService);
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  estudiante: Estudiante;
  id: number;
  suscription: Subscription;
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getDatos();
  }
  getDatos(): void {
  this.suscription = this._route.params.subscribe({
    next: (params) => {
      this.id = +params['id'];
      this._estudianteService.getEstudiante(this.id).subscribe({
        next: (data) => {
          this.estudiante = data.datos; 
          console.log('Estudiante recibido:', this.estudiante);
        },
        error: (error) => {
          console.error('Error al obtener estudiante:', error);
        },
        complete: () => {
          this.faseCarga();
        }
      });
    }
  });
}
  edit(): void {
    this.estudiante.nombre = this.estudiante.nombre.toUpperCase();
    this.estudiante.activo = Number(this.estudiante.activo);
    this._estudianteService.updateEstudiante(this.estudiante).subscribe({
      next: (data) => {
          this._router.navigate(['./admin/list-estudiante']);
      }
      ,
      error: (error) => {
        console.log(error,"e"); }
      ,
      complete: () => { }
    });

  }


  ///////////////////////////////////////////////////////
  faseCarga(): void {

    this.fasesCargadas++;

    if (this.fasesCargadas == this.nFases) {

      this.cargaCompletada = true;
    }
  }
  //////////////////////////////////////////////////////
}
