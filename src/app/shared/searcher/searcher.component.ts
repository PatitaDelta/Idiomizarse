import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: []
})
export class SearcherComponent implements OnInit {

  @Input("found") inputSearch = "";
  @Input("placeholder") placeholder = "Buscar...";
  @Output("terms") eventEmiter:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}

  onSearch(term:string){
    this.eventEmiter.emit(term);
  }

}
