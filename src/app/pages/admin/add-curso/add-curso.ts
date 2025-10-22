import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../../core/models/entities'; 
import { Router } from '@angular/router';
import { CursoService } from '../../../core/services/curso-service';

@Component({
  selector: 'app-add-curso',
  imports: [FormsModule],
  templateUrl: './add-curso.html',
  styleUrl: './add-curso.css'
})
export class AddCurso {
private _cursoService:CursoService = inject(CursoService);
  private _router: Router = inject(Router);
curso:Curso = {
  nombre: "",
  horas: 0,
  profesor: ""
  
}
add():void{

    this.curso.nombre = this.curso.nombre.toUpperCase();
    this.curso.profesor = this.curso.profesor.toUpperCase();
  this._cursoService.addCurso(this.curso).subscribe({
    next:(data)=>{
          this._router.navigate(['/admin/list-curso']);

    }
    ,
    error:(error)=>{}
    ,
    complete:()=>{}
  });

}
}