

export  interface Curso{

    id?:number;
    nombre:string;
    profesor:string;
    activo?:number;
    horas:number;

}

export interface Estudiante{

    id?:number;
    nombre:string;
    dni:string;
    activo?:number;


}
export interface CursoEstudiante{

    estudiante_id?:number; 
    curso_id?:number; 


}
