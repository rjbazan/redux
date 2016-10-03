import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'country-details',
  templateUrl: 'country-details.html'
})
export class CountryDetailsComponent implements OnInit {
  @Input() selectedCountry;
  private list = [1, 2, 3];

  constructor() { }

  ngOnInit() { }

  onDateChanged(event) {
    console.log(event)
  }
}