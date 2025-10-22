import { Component, inject, OnDestroy, OnInit } from '@angular/core'; 
import { Curso } from '../../../core/models/entities';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Preloader } from '../../../shared/components/preloader/preloader';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../../core/services/curso-service';

@Component({
  selector: 'app-edit-curso',
  imports: [Preloader, FormsModule ],
  templateUrl: './edit-curso.html',
  styleUrl: './edit-curso.css'
})
export class EditCurso implements OnInit, OnDestroy {

  /////////////////////////////////////////////////
  nFases: number = 3;
  cargaCompletada: boolean = false;
  fasesCargadas: number = 0;
  /////////////////////////////////////////////////



  private _cursoService: CursoService = inject(CursoService);
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  curso: Curso;
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
      this._cursoService.getCurso(this.id).subscribe({
        next: (data) => {
          this.curso = data.datos; 
          console.log('Estudiante recibido:', this.curso);
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
    this.curso.nombre = this.curso.nombre.toUpperCase();
    this.curso.activo = Number(this.curso.activo);
    this._cursoService.updateCurso(this.curso).subscribe({
      next: (data) => {
          this._router.navigate(['./admin/list-curso']);
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
