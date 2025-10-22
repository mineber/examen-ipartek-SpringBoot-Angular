import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/components/error-component/error-component';
import { Header } from './shared/components/header/header';
import { AddEstudiante } from './pages/admin/add-estudiante/add-estudiante';
import { ListEstudiante } from './pages/admin/list-estudiante/list-estudiante';
import { EditEstudiante } from './pages/admin/edit-estudiante/edit-estudiante';
import { ListCurso } from './pages/admin/list-curso/list-curso';
import { AddCurso } from './pages/admin/add-curso/add-curso';
import { EditCurso } from './pages/admin/edit-curso/edit-curso';

export const routes: Routes = [


    {
        path:'',
        loadChildren: () => import('./pages/content/content.routes').then(m => m.CONTENT_ROUTES )
    
    }
    ,
    {
        path:'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES )
    
    }
    ,
    {
        path:'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES )
    
    }
    ,
    {
        path:'**',
        component: ErrorComponent
        /* ESTA RUTA SIEMPRE TIENE QUE ESTAR EN LA ÚLTIMA POSICIÓN*/
    },
    




]; 