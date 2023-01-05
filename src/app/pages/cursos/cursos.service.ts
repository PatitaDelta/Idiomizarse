import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2'
import { Curso } from '../../models/curso';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CursosService {
    
    private cursos:Curso[] = []
    private cursos$ = new Subject<Curso[]>();
    
    private myCursos:Curso[] = []
    private myCursos$ = new Subject<Curso[]>(); 

    private userType = localStorage.getItem("profesor") ? "profesores" : "alumnos"

    constructor(private httpSer:HttpService, private userSer:UserService){ }

    
//**********************************************************************************************************************************************************
// GET *****************************************************************************************************************************************************
//**********************************************************************************************************************************************************

    getCursosOf$(){
        let listOfCursos:Curso[] = [];

        this.httpSer.getPropertyOf(this.userType, this.userSer.user.id!, "cursos").subscribe(
            (list) => {
                if(list){
                    list.forEach((cursoID: string) => {
                        this.httpSer.getById("cursos", cursoID)
                        .pipe(
                            //Añade la id que da Firebase a la propiedad ID del curso 
                            map(curso =>{ return {...curso, id: cursoID} })
                        ).subscribe(
                            curso => { listOfCursos.push(curso);}
                        );
                    });
                }                
                this.myCursos = listOfCursos
                this.myCursos$.next(this.myCursos);
            }
        )

        return this.myCursos$;
    }

    getCursos$(): Observable<Curso[]> {
        this.httpSer.getAll("cursos").subscribe(resp => { 
            this.cursos = resp 
            this.cursos$.next(this.cursos);
        })

        return this.cursos$;
    }

//**********************************************************************************************************************************************************
// ADD *****************************************************************************************************************************************************
//**********************************************************************************************************************************************************

    addToEdit(curso:Curso){
        this.myCursos.push(curso)
        this.myCursos$.next(this.myCursos)
    }

    addCurso(curso:Curso){
        this.httpSer.post("cursos",curso)
        .subscribe(
            (response)=>{
                //Actualiza la lista con el nuevo curso que no tendra id
                let pos = this.myCursos.findIndex(c => c.id === "" )                
                this.myCursos[pos] = curso

                this.myCursos$.next(this.myCursos)
                
                //Añadel el id del curso en la tabla del usr
                if(this.userSer.user.cursos)
                    this.userSer.user.cursos.push(curso.id);
                else
                    this.userSer.user.cursos = [curso.id];
                
                this.httpSer.putById(this.userType,this.userSer.user,this.userSer.user.id!).subscribe(
                    () =>  this.userSer.userSubject.next(this.userSer.user)
                );

                Swal.fire({
                    title: 'Añadido',
                    text: 'Añadido correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    showConfirmButton: true,
                    timer: 1500,
                })
            },
            responseError=>{
                Swal.fire({
                    title: 'Error',
                    text: 'A ocurrido un error durante el guardado',
                    icon: 'error',
                    footer: responseError.error.error,
                    confirmButtonText: 'Ok',
                    showConfirmButton: true,
                    timer: 1500,
                })
            }
        );
    }


    addCursoToUser(curso:Curso){
        //Actualiza la lista con el nuevo curso
        this.myCursos.push(curso)
        this.myCursos$.next(this.myCursos)


        //Añadel el id del curso en la tabla del usr
        if(this.userSer.user.cursos)
            this.userSer.user.cursos.push(curso.id);
        else
            this.userSer.user.cursos = [curso.id];
        
        this.httpSer.putById(this.userType,this.userSer.user,this.userSer.user.id!).subscribe(
            () =>  this.userSer.userSubject.next(this.userSer.user)
        );
        
    }

//**********************************************************************************************************************************************************
// EDIT *****************************************************************************************************************************************************
//**********************************************************************************************************************************************************

    editCurso(curso:Curso){     

        this.httpSer.putById("cursos",curso,curso.id)
        .subscribe(
            (response)=>{
                //Al confirmar el guardado en la BD EDITA en la lista
                let pos = this.myCursos.findIndex(c => c.id === curso.id )
                this.myCursos[pos] = curso
                this.myCursos$.next(this.myCursos)

                Swal.fire({
                    title: 'Editado',
                    text: 'Editado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    showConfirmButton: true,
                    timer: 1500,
                })
            },
            responseError=>{
                Swal.fire({
                    title: 'Error',
                    text: 'A ocurrido un error durante el guardado',
                    icon: 'error',
                    footer: responseError.error.error,
                    confirmButtonText: 'Ok',
                    showConfirmButton: true,
                    timer: 1500,
                })
            }
        );
    }

//**********************************************************************************************************************************************************
// DELETE *****************************************************************************************************************************************************
//**********************************************************************************************************************************************************

    deleteNullCurso(curso:Curso){
        this.myCursos.splice(this.myCursos.indexOf(curso), 1)
    }

    deleteCurso(curso:Curso){
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            //Al confirmar el guardado en la BD ELIMINA de la lista
            if (result.isConfirmed) {
                
                this.httpSer.deleteById("cursos",curso.id)
                .subscribe(
                    ()=>{
                        //Elimina de la lista myCursos
                        this.myCursos.splice(this.myCursos.indexOf(curso), 1)
                        this.myCursos$.next(this.myCursos)

                        //Elimina de la lista de cursos del usr
                        this.userSer.user.cursos.splice(this.userSer.user.cursos.indexOf(curso.id),1);
                        this.userSer.userSubject.next(this.userSer.user);     

                        //Actualiza el usuario
                        this.httpSer.putById(this.userType,this.userSer.user,this.userSer.user.id!).subscribe()

                        Swal.fire({
                            title: 'Borrado',
                            text: 'Borrado correctamente',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            showConfirmButton: true,
                            timer: 1500,
                        })
                    },
                    responseError=>{
                        Swal.fire({
                            title: 'Error',
                            text: 'A ocurrido un error durante la eliminacion ' + responseError.error.error,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            showConfirmButton: true,
                            timer: 1500,
                        })
                    });
            }
        })   
    }
    
    deleteCursoOfUser(curso:Curso){
        //Elimina de la lista el curso
        this.myCursos.splice(this.myCursos.indexOf(curso), 1)
        this.myCursos$.next(this.myCursos)

        //Elimina el id del curso en la tabla del usr
        this.userSer.user.cursos.splice(this.myCursos.indexOf(curso), 1)
        
        this.httpSer.putById(this.userType,this.userSer.user,this.userSer.user.id!).subscribe(
            () =>  this.userSer.userSubject.next(this.userSer.user)
        );
    }
}