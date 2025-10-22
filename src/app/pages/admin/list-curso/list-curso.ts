import { Component, inject, OnInit } from '@angular/core'; 
import { Curso } from '../../../core/models/entities';
import { Preloader } from '../../../shared/components/preloader/preloader';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../core/services/curso-service';

@Component({
  selector: 'app-list-curso',
  imports: [Preloader, RouterLink],
  templateUrl: './list-curso.html',
  styleUrl: './list-curso.css'
})
export class ListCurso implements OnInit{

  /////////////////////////////////////////////////
  nFases:number = 3;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _cursoService:CursoService = inject(CursoService);
  datos:Array<Curso>;
  
  ngOnInit(): void {
    this.getDatos();
  }
  getDatos():void{
      this._cursoService.getCursos().subscribe({
        next:(data) => {this.datos = data.datos;},
        error: (error) => {},
        complete: () => {this.faseCarga();}
      });
  }
  delete(id:number | undefined): void { 
    if (id === undefined) {
    console.error('ID no definido');
    return;
  }
    this._cursoService.deleteCurso(id).subscribe({
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
  faseCarga():void{

    this.fasesCargadas++;

    if(this.fasesCargadas == this.nFases){

      this.cargaCompletada = true;
    }
  }
  //////////////////////////////////////////////////////
}
