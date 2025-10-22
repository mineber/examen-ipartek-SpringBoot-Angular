import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';
import { Curso } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  private _http:HttpClient =  inject(HttpClient);


  getCursos():Observable< any >{

    return this._http.get<any>(`${URL_API}cursos`);
  }


  getCurso(id:number):Observable<any>{

    return this._http.get<any>(`${URL_API}curso/${id}`);
  }


  addCurso(curso:Curso):Observable<any>{

    return this._http.post<any>(`${URL_API}curso`,curso);
  }


  updateCurso(curso:Curso):Observable<any>{

    return this._http.put<any>(`${URL_API}curso`,curso);
  }
  deleteCurso(id:number):Observable<any>{

    return this._http.delete<any>(`${URL_API}curso/${id}`);
  }
  
}
