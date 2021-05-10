import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';

import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './cursos/components/curso/curso.component';
import { EditCursoComponent } from './cursos/components/edit-curso/edit-curso.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisCursosComponent } from './cursos/components/mis-cursos/mis-cursos.component';
import { DashboardCursosComponent } from './cursos/components/dashboard/dashboard.component';




@NgModule({
  declarations: [
    CursosComponent,
    CursoComponent,
    EditCursoComponent,
    MisCursosComponent,
    ActividadesComponent,
    HomeComponent,
    DashboardCursosComponent,
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
  exports:[
    DashboardCursosComponent,
    CursosComponent,
    CursoComponent,
    EditCursoComponent,
    MisCursosComponent,
    ActividadesComponent,
    HomeComponent,
  ]
})
export class PagesModule { }
