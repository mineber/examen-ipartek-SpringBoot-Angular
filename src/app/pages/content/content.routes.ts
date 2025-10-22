import { Routes } from "@angular/router";
import { Home } from "./home/home"; 

export const CONTENT_ROUTES:Routes = [

{

    path:'',
    component: Home
}
,
{

    path:'home',
    component: Home
} 

]