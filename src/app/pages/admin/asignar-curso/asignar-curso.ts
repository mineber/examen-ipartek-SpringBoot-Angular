import { Component, inject, OnInit } from '@angular/core';
import { Curso, Estudiante } from '../../../core/models/entities';
import { Preloader } from '../../../shared/components/preloader/preloader'; 
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../core/services/curso-service';
import { EstudianteService } from '../../../core/services/estudiante-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asignar-curso',
  imports: [Preloader],
  templateUrl: './asignar-curso.html',
  styleUrl: './asignar-curso.css'
})
export class AsignarCurso implements OnInit {

  /////////////////////////////////////////////////
  nFases: number = 3;
  cargaCompletada: boolean = false;
  fasesCargadas: number = 0;
  /////////////////////////////////////////////////

  private _estudianteService: EstudianteService = inject(EstudianteService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  cursosest: Array<Curso>;
  cursos: Array<Curso>;
  private _cursoService: CursoService = inject(CursoService);
  datos: Array<Curso>;
  id: number;
  suscription: Subscription;
  estudiante: Estudiante;
  cursosDisponibles: Curso[] = [];

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
    this._cursoService.getCursos().subscribe({
      next: (data) => {
        this.datos = data.datos;
        this.getDatosCursos();
      },
      error: (error) => { },
      complete: () => { this.faseCarga(); }
    });



  }
  getDatosCursos(): void {

    this._estudianteService.getCursosEstudiante(this.id).subscribe({
      next: (data2) => {
        this.cursosest = data2.datos;

        this.filtrarCursosNoAsignados();

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
  asignar(id: number | undefined, id2: number | undefined): void {
    console.log('ID estudiante:', id, 'ID curso:', id2);
    if (typeof id !== 'number' || typeof id2 !== 'number') {
      console.error('ID no definido');
      return;
    }
    this._estudianteService.addEstudianteToCurso(id, id2).subscribe({
      next: (data) => {

        this.filtrarCursosNoAsignados();
        window.location.href = window.location.href; 0
      }
      ,
      error: (error) => { }
      ,
      complete: () => { }
    });

  }



  //Esta función filtra los cursos que tiene el estudiante y muestra solo los que no tiene asignados
  filtrarCursosNoAsignados(): void {
    if (this.datos) {
      this.cursosDisponibles = this.datos.filter(curso =>
        !this.cursosest?.some(asignado => asignado.id === curso.id)
      );
    } else {
      this.cursosDisponibles = [];
    }
    console.log('Cursos disponibles para asignar:', this.cursosDisponibles, this.datos, this.cursosest);
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
