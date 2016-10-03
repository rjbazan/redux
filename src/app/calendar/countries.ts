import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'country-picker',
  templateUrl: 'countries.html',
  styles: [
    `
      ul {
        list-style: none;
        padding-left: 0px;
      }
    `
  ]
})
export class CountriesComponent implements OnInit {
  @Input() selectedCountry;
  @Output() selectedCountryChange = new EventEmitter();
  
  private countries = [{id: 1, name: 'Argentina'}, {id: 5, name: 'Chile'}, {id: 2, name: 'Brasil'}, {id: 4, name: 'Uruguay'}, {id: 3, name: 'Colombia'}];
  constructor() { }

  ngOnInit() { }

  changeCountry(id) {
    this.selectedCountryChange.emit(id);
  }

  printSelected(test) {
    console.log(test)
  }
}