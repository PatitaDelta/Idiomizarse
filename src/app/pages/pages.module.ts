import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';

//Perfiles
import { ProfileComponent } from './profiles/profile.component';
import { AlumnoProfileComponent } from './profiles/components/profile/alumno-profile.component';

//Cursos
import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './cursos/components/curso/curso.component';
import { EditCursoComponent } from './cursos/components/edit-curso/edit-curso.component';
import { MisCursosComponent } from './cursos/components/mis-cursos/mis-cursos.component';
import { DashboardCursosComponent } from './cursos/components/dashboard/dashboard.component';

//Actividades
import { ActividadesComponent } from './actividades/actividades.component';
import { DashboardActividadesComponent } from './actividades/components/dashboard/dashboard.component';
import { CrearActividadesComponent } from './actividades/components/crear/crear.component';
import { AprenderComponent } from './actividades/components/aprender/aprender.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardCursosComponent,
    CursosComponent,
    CursoComponent,
    EditCursoComponent,
    MisCursosComponent,
    ProfileComponent,
    AlumnoProfileComponent,
    ActividadesComponent,
    DashboardActividadesComponent,
    CrearActividadesComponent,
    AprenderComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    HomeComponent,
    DashboardCursosComponent,
    CursosComponent,
    CursoComponent,
    EditCursoComponent,
    MisCursosComponent,
    ProfileComponent,
    AlumnoProfileComponent,
    ActividadesComponent,
  ]
})
export class PagesModule { }
