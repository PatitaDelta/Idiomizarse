import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actividad } from 'src/app/models/actividad';
import { ActividadesService } from '../../actividades.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardActividadesComponent implements OnInit {

  public myActividades:Actividad[] = [];
  private myActividadesSubs!:Subscription;

  public loading:boolean = true;

  constructor(private actividadesSer:ActividadesService) {}

  ngOnInit(): void { 
    this.getActividades();
  }
  
  getActividades(){
    this.myActividadesSubs = this.actividadesSer.getAllActividadesOfUser$().subscribe(
      (list) =>{ 
        this.myActividades = list;
        this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.myActividadesSubs.unsubscribe();
  }

}
