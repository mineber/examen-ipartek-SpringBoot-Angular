import { Routes } from "@angular/router";
import { AddEstudiante } from "./add-estudiante/add-estudiante";  
import { EditCurso } from "./edit-curso/edit-curso";
import { ListCurso } from "./list-curso/list-curso";
import { AddCurso } from "./add-curso/add-curso";
import { ListEstudiante } from "./list-estudiante/list-estudiante";
import { EditEstudiante } from "./edit-estudiante/edit-estudiante"; 
import { DetailsEstudiante } from "./details-estudiante/details-estudiante";
import { AsignarCurso } from "./asignar-curso/asignar-curso";

export const ADMIN_ROUTES:Routes = [

    {
    
        path:'add-estudiante',
        component: AddEstudiante
    }

    ,

    {
    
        path:'list-estudiante',
        component: ListEstudiante
    }

    ,

    {
    
        path:'edit-estudiante/:id',
        component: EditEstudiante
    }, 
    
    {
    
        path:'details-estudiante/:id',
        component: DetailsEstudiante
    }, 
    {
    
        path:'asignar-curso/:id',
        component: AsignarCurso
    }

    ,
    {
    
        path:'add-curso',
        component: AddCurso
    }

    ,

    {
    
        path:'list-curso',
        component: ListCurso
    }

    ,

    {
    
        path:'edit-curso/:id',
        component: EditCurso
    }

    

    
]