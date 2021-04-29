import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  public error = "404";
  public message = "La página que esta buscando no existe"

  constructor() { }

  ngOnInit(): void {
  }

}
