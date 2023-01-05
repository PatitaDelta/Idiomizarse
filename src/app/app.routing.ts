import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { PagesRoutingModule } from './pages/pages.routing';

const ROUTES: Routes = [
  // '/inicio',     in    PagesRouting 
  // '/cursos',     in    PagesRouting 
  // '/actividades' in    PagesRouting 
  // '/perfil',     in    PagesRouting 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
    PagesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
