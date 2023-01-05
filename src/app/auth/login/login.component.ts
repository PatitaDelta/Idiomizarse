import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Input('whatIs') isLogin!: boolean;
  @Output() close = new EventEmitter<void>();
  myForm!: FormGroup;
  typeUsers: string[] = ["profesor", "alumno"];
  public loading:boolean = false;


  constructor(private userSer: UserService) { }

  ngOnInit(): void {
    localStorage.setItem("isLoggin", `${this.isLogin}`)
    this.myForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      "pass-group": new FormGroup({
        "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
        "confirm-pass": new FormControl(null)
        // @ts-ignore
      }, [this.equalPassChild]),
      "typeUser": new FormControl(null),
    });
  }

  onClose() {    
    localStorage.removeItem("isLoggin")
    this.close.emit();
  }

  onSubmit() {
    this.loading = true;
    localStorage.removeItem("isLoggin")
    

    let teacher = new Profesor(
      this.myForm.value.email,
      this.myForm.get("pass-group.password")!.value,
      formatDate(new Date(),"yyyy-MM-d","en-US"),
      []
    );


    let student = new Alumno(
      this.myForm.value.email,
      this.myForm.get("pass-group.password")!.value,
      formatDate(new Date(),"yyyy-MM-d","en-US"),
      []
    );

    // LOGIN ---------

    if (this.isLogin) {
      let loginPromise:Promise<any>;

      if (this.myForm.value.typeUser == "alumno")
        loginPromise = this.userSer.logIn(student, this.myForm.value.typeUser);
      else
        loginPromise = this.userSer.logIn(teacher, this.myForm.value.typeUser);

      loginPromise
      .then(
        () => {
          this.loading = false;
          this.onClose();
        }, (err) => {Swal.fire("Error",err.message,"error") ;this.loading = false;});
    }
    // REGISTER ---------
    else {
      let registerPromise:Promise<any>;

      if (this.myForm.value.typeUser == "alumno")
        registerPromise = this.userSer.register(student, this.myForm.value.typeUser);
      else
        registerPromise = this.userSer.register(teacher, this.myForm.value.typeUser);

      registerPromise
        .then(
          () => {
            Swal.fire("Registrado","Se ha registrado correctamente","success")
            this.loading = false;
            this.onClose();
          }, (err) => {Swal.fire("Error",err.message,"error") ;this.loading = false;});
    }


  }

  equalPassChild(control: FormGroup) {
    if (control.controls.password.value !== control.get("confirm-pass")!.value && localStorage.getItem("isLoggin") == "false") {
      control.get("confirm-pass")!.setErrors({ "passwordNotEqual": true })
    }
    
    return null;
  }
}
