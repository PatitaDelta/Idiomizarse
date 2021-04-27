import { CommonModule } from '@angular/common';
import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app.routing';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    AppRoutingModule,
  ],
})
export class SharedModule { }
