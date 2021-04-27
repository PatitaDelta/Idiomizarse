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
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CursosComponent,
    CursoComponent,
    EditCursoComponent,
    ActividadesComponent,
    HomeComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
  ],
  exports:[
    CursosComponent,
    CursoComponent,
    EditCursoComponent,
    ActividadesComponent,
    HomeComponent,
  ]
})
export class PagesModule { }
