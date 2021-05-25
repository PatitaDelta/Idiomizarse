import { UploadFilesService } from 'src/app/services/upload-files.service';
import { Curso } from 'src/app/models/curso';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actividad } from 'src/app/models/actividad';
import { ActividadesService } from '../../actividades.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private actividadesSer:ActividadesService, private router:Router, private upFileSer:UploadFilesService) {}

  ngOnInit(): void { 
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

  
  editActividad(positionY:number, idCurso:string){
    this.router.navigate([`actividades/editar/${positionY}`],{fragment:idCurso});
  }

  //Hacer que elimine tambien el archivo
  deleteActividad(positionX:number, positionY:number, idCurso:string){
    Swal.fire({
      title: 'Cuidado',
      text: "Estas seguro de que quieres borrarlo",
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
