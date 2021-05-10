import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActividadesComponent } from './actividades/actividades.component';
import { DashboardCursosComponent } from './cursos/components/dashboard/dashboard.component';
import { CursosComponent } from './cursos/cursos.component';
import { MisCursosComponent } from './cursos/components/mis-cursos/mis-cursos.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';

const ROUTES: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent},
    {
        path: 'cursos', 
        component: DashboardCursosComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'miscursos', component: MisCursosComponent},
            { path: 'todos', component: CursosComponent },
            { path: '', redirectTo: '/cursos/todos', pathMatch: 'full' },
        ]
    },
    { path: 'actividades', component: ActividadesComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class PagesRoutingModule {}