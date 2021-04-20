import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  constructor(private userSer: UserService) { }

  ngOnInit(): void {
    localStorage.setItem("isLoggin", `${this.isLogin}`)
    this.myForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "pass-group": new FormGroup({
        "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
        "confirm-pass": new FormControl(null)
      }, [this.equalPassChild]),
      "typeUser": new FormControl(null, [Validators.required]),
    });
  }

  onClose() {
    localStorage.removeItem("isLoggin")
    this.close.emit();
  }

  onSubmit() {
    localStorage.removeItem("isLoggin")

    let teacher = new Profesor(
      this.myForm.value.email,
      this.myForm.get("pass-group.password")!.value,
      new Date()
    );


    let student = new Alumno(
      this.myForm.value.email,
      this.myForm.get("pass-group.password")!.value,
      new Date());

    // LOGIN ---------
    if (this.isLogin) {
      if (this.myForm.value.typeUser == "alumno")
        this.userSer.logIn(student, this.myForm.value.typeUser);
      else
        this.userSer.logIn(teacher, this.myForm.value.typeUser);
    }
    // REGISTER ---------
    else {
      if (this.myForm.value.typeUser == "alumno")
        this.userSer.register(student, this.myForm.value.typeUser);
      else
        this.userSer.register(teacher, this.myForm.value.typeUser);
    }
  }

  equalPassChild(control: FormGroup) {
    if (control.controls.password.value !== control.get("confirm-pass")!.value && localStorage.getItem("isLoggin") == "false") {
      control.get("confirm-pass")!.setErrors({ "passwordNotEqual": true })
    }

    return null;

  }
}
