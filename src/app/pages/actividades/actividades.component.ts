import { ActividadesService } from './actividades.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Actividad } from 'src/app/models/actividad';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit,OnDestroy {

  public myActividades:Actividad[] = [];
  private myActividadesSubs!:Subscription;

  public loading:boolean = true;

  constructor(private actividadesSer:ActividadesService) {}
  
  ngOnInit(): void { 
    this.getActividades();
  }
  
  getActividades(){
    this.myActividadesSubs = this.actividadesSer.getActividadesOf$().subscribe(
      (list) =>{ 
        this.myActividades = list;
        this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.myActividadesSubs.unsubscribe();
  }

}
