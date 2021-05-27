import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Curso } from 'src/app/models/curso';
import { Actividad } from 'src/app/models/actividad';

import { UserService } from 'src/app/services/user.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { ActividadesService } from '../../actividades.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardActividadesComponent implements OnInit {

  public allActividades:Actividad[][] = [];
  private myActividadesSubs!:Subscription;

  public myCursos:Curso[] = [];
  private myCursosSubs!:Subscription;

  public loading:boolean = true;
  public userType!:string;
  public routeSnapshot!:string;

  constructor(
    private actividadesSer:ActividadesService, 
    private router:Router,
    private route:ActivatedRoute,
    private upFileSer:UploadFilesService, 
    private userSer:UserService) {}

  ngOnInit(): void { 
    this.userType = this.userSer.userType;
    this.routeSnapshot = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : "actividades"
    
    this.getActividades();
    this.getCursos();
  }
  
  getActividades(){
    this.myActividadesSubs = this.actividadesSer.getAllActividadesOfUser$().subscribe(
      (list) => { 
        this.allActividades = list;
        this.loading = false;
    });
  }

  getCursos(){
    this.myCursosSubs = this.actividadesSer.getCursosOf$().subscribe(
      (list)=>{
        this.myCursos = list;
      }
    );
  }

  getCurso(id:string){
    return this.myCursos.find((curso) => curso.id == id)!
  }

  goToAprender(actividadType:string, idActividad:string, idCurso:string){
    this.router.navigate([`actividades/aprender/${actividadType}/${idActividad}`],{fragment:idCurso});
  }

  editActividad(positionY:number, idCurso:string){
    this.router.navigate([`actividades/editar/${positionY}`],{fragment:idCurso});
  }

  deleteActividad(positionX:number, positionY:number, idCurso:string){
    Swal.fire({
      title: 'Cuidado',
      text: "¿Estas seguro de que quieres borrarlo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {
          let actividadList = this.allActividades[positionX];
          let CursoToUpdate = this.myCursos.find((curso) => curso.id == idCurso);
          let idActividadToDelete =  actividadList[positionY].id;

          actividadList.splice(positionY,1);
          this.actividadesSer.deleteActividad(CursoToUpdate!, positionY).subscribe(
            (resp)=>{
              console.log(resp);
              this.upFileSer.deleteImg("actividades",idActividadToDelete+idCurso);

              Swal.fire({
                title: 'Borrado',
                text: 'Borrado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                showConfirmButton: true,
                timer: 1500,
              });
            }
          );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.myActividadesSubs.unsubscribe();
    this.myCursosSubs.unsubscribe();
  }

}
