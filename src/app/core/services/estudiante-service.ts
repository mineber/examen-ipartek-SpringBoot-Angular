import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';
import { Curso, Estudiante } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {


  private _http:HttpClient =  inject(HttpClient);


  getEstudiantes():Observable< any >{

    return this._http.get<any>(`${URL_API}estudiantes`);
  } 

  getEstudiante(id:number):Observable<any>{

    return this._http.get<any>(`${URL_API}estudiante/${id}`);
  }


  addEstudiante(estudiante:Estudiante):Observable<any>{

    return this._http.post<any>(`${URL_API}estudiante`,estudiante);
  }


  updateEstudiante(estudiante:Estudiante):Observable<any>{

    return this._http.put<any>(`${URL_API}estudiante`,estudiante);
  }
  deleteEstudiante(id:number):Observable<any>{

    return this._http.delete<any>(`${URL_API}estudiante/${id}`);
  }

  getCursosEstudiante(id:number):Observable<any>{

    return this._http.get<any>(`${URL_API}estudiante/estudiante-${id}/cursos`);
  }
  
  addEstudianteToCurso(id: number, id2: number):Observable<any>{

    return this._http.post<any>(`${URL_API}estudiante/estudiante-${id}/curso/curso-${id2}`,{});
  } 

  deleteEstudianteCurso(id:number, id2:number):Observable<any>{

    return this._http.delete<any>(`${URL_API}estudiante/estudiante-${id}/curso/curso-${id2}`);
  }
}
