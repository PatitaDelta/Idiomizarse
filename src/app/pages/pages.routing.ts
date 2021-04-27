import { ActividadesComponent } from './actividades/actividades.component';
import { CursosComponent } from './cursos/cursos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditCursoComponent } from './cursos/components/edit-curso/edit-curso.component';

const ROUTES: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent },
    {
        path: 'cursos', 
        component: CursosComponent,
        // children: [
        //     { path: 'edit', component: EditCursoComponent },
        //     { path: '', component: CursosComponent },
        // ]
    },
    { path: 'actividades', component: ActividadesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class PagesRoutingModule {}