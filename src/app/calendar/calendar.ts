import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit {
  private selectedCountry;
  constructor() { }

  ngOnInit() { }

  getSelectedCountry(event) {
    this.selectedCountry = event.target.value;
  }
  getSelectedOnClick($event) {
    console.log($event)
  }
}