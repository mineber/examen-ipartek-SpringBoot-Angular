import { Component, inject, OnInit } from '@angular/core';
import { EstudianteService } from '../../../core/services/estudiante-service';
import { Estudiante } from '../../../core/models/entities';
import { Preloader } from '../../../shared/components/preloader/preloader';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-estudiante',
  imports: [Preloader, RouterLink],
  templateUrl: './list-estudiante.html',
  styleUrl: './list-estudiante.css'
})
export class ListEstudiante implements OnInit{

  /////////////////////////////////////////////////
  nFases:number = 3;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _estudianteService:EstudianteService = inject(EstudianteService);
  datos:Array<Estudiante>;
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  
    id: number;
    suscription: Subscription;
  
  ngOnInit(): void {
    this.getDatos();
  }
  getDatos():void{
      this._estudianteService.getEstudiantes().subscribe({
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
    this._estudianteService.deleteEstudiante(id).subscribe({
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
