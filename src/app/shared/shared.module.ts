import { CommonModule } from '@angular/common';
import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app.routing';
import { SearcherComponent } from './searcher/searcher.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    SearcherComponent,
    SpinnerComponent,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    SearcherComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
  ],
})
export class SharedModule { }
