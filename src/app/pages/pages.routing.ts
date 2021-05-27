import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { HomeComponent } from './home/home.component';

//Cursos
import { DashboardCursosComponent } from './cursos/components/dashboard/dashboard.component';
import { CursosComponent } from './cursos/cursos.component';
import { MisCursosComponent } from './cursos/components/mis-cursos/mis-cursos.component';

//Perfiles
import { ProfileComponent } from './profiles/profile.component';
import { AlumnoProfileComponent } from './profiles/components/profile/alumno-profile.component';

//Actividaes
import { ActividadesComponent } from './actividades/actividades.component';
import { DashboardActividadesComponent } from './actividades/components/dashboard/dashboard.component';
import { CrearActividadesComponent } from './actividades/components/crear/crear.component';
import { AprenderComponent } from './actividades/components/aprender/aprender.component';


const ROUTES: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent},
    
    { path: 'cursos', component: DashboardCursosComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'miscursos', component: MisCursosComponent},
            { path: 'miscursos/:name', component: MisCursosComponent},
            { path: 'todos', component: CursosComponent },
            { path: 'todos/:name', component: CursosComponent },
            { path: '', redirectTo: '/cursos/todos', pathMatch: 'full' },
        ]
    },
    { path: 'perfil', component: ProfileComponent, 
        canActivate: [AuthGuard],
        children:[
            { path: ':id', component:AlumnoProfileComponent },
        ],
    },
    { path: 'actividades', component: ActividadesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardActividadesComponent },
            { path: 'crear', component: CrearActividadesComponent },
            { path: 'aprender', component:DashboardActividadesComponent },
            { path: 'aprender/:type/:id', component:AprenderComponent },
            { path: 'editar', component: DashboardActividadesComponent   },
            { path: 'editar/:id', component: CrearActividadesComponent },
        ]},
    
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class PagesRoutingModule {}