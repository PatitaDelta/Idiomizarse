import { HttpService } from 'src/app/services/http.service';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2'
import { Curso } from '../../models/curso';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CursosService {
    
    private cursos:Curso[] = []
    private cursos$ = new Subject<Curso[]>(); 

    constructor(private httpSer:HttpService){ }
    
    getCursos$(): Observable<Curso[]> {
        this.httpSer.getAll("cursos").subscribe(resp => { 
            this.cursos = resp 
            this.cursos$.next(this.cursos);
        })

        return this.cursos$;
    }
    
    addToEdit(curso:Curso){
        this.cursos.push(curso)
        this.cursos$.next(this.cursos)
    }

    addCurso(curso:Curso){
        this.httpSer.post("cursos",curso)
        .subscribe(
            (response)=>{
                let pos = this.cursos.findIndex(c => c.id === "" )                
                this.cursos[pos] = curso

                this.cursos$.next(this.cursos)

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

    editCurso(curso:Curso){     

        this.httpSer.putById("cursos",curso,curso.id)
        .subscribe(
            (response)=>{
                //Al confirmar el guardado en la BD entonces EDITA en la lista
                let pos = this.cursos.findIndex(c => c.id === curso.id )
                this.cursos[pos] = curso
                this.cursos$.next(this.cursos)
                
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

    deleteNullCurso(curso:Curso){
        this.cursos.splice(this.cursos.indexOf(curso), 1)
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

            if (result.isConfirmed) {
                //Al confirmar el guardado en la BD entonces ELIMINA de la lista
                this.cursos.splice(this.cursos.indexOf(curso), 1)
                this.cursos$.next(this.cursos)

                this.httpSer.deleteById("cursos",curso.id)
                .subscribe(
                    (response)=>{
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
}