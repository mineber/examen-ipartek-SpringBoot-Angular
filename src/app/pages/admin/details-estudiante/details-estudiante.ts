import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EstudianteService } from '../../../core/services/estudiante-service';
import { Curso, Estudiante } from '../../../core/models/entities';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Preloader } from '../../../shared/components/preloader/preloader';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../../core/services/curso-service';

@Component({
  selector: 'app-details-estudiante',
  imports: [Preloader, FormsModule, RouterLink ],
  templateUrl: './details-estudiante.html',
  styleUrl: './details-estudiante.css'
})
export class DetailsEstudiante implements OnInit, OnDestroy {

  /////////////////////////////////////////////////
  nFases: number = 3;
  cargaCompletada: boolean = false;
  fasesCargadas: number = 0;
  /////////////////////////////////////////////////



  private _estudianteService: EstudianteService = inject(EstudianteService); 
  private _route: ActivatedRoute = inject(ActivatedRoute);
  estudiante: Estudiante;
  cursosest: Array<Curso>;
  cursos: Array<Curso>;
  
  datos:Array<Curso>;
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
      
      this._estudianteService.getCursosEstudiante(this.id).subscribe({
        next: (data) => {
          this.cursosest = data.datos; 
          console.log('Cursos del Estudiante recibido:', this.cursosest); 
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
delete(id:number | undefined, id2:number | undefined): void { 
  console.log('ID estudiante:', id, 'ID curso:', id2);
   if (typeof id !== 'number' || typeof id2 !== 'number') {
    console.error('ID no definido');
    return;
  }
    this._estudianteService.deleteEstudianteCurso(id, id2).subscribe({
      next: (data) => {
          window.location.href = window.location.href;
      }
      ,
      error: (error) => { }
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
