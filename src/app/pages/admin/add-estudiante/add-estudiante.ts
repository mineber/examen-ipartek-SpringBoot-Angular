import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../../../core/models/entities';
import { EstudianteService } from '../../../core/services/estudiante-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-estudiante',
  imports: [FormsModule],
  templateUrl: './add-estudiante.html',
  styleUrl: './add-estudiante.css'
})
export class AddEstudiante {
private _estudianteService:EstudianteService = inject(EstudianteService);
  private _router: Router = inject(Router);
estudiante:Estudiante = {
  nombre: "",
  dni: ""

  
}
add():void{
    this.estudiante.nombre = this.estudiante.nombre.toUpperCase();
    this.estudiante.dni = this.estudiante.dni.toUpperCase();
  this._estudianteService.addEstudiante(this.estudiante).subscribe({
    next:(data)=>{
          this._router.navigate(['./admin/list-estudiante']);

    }
    ,
    error:(error)=>{}
    ,
    complete:()=>{}
  });

}
}