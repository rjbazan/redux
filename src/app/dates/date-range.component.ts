import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'date-range',
  templateUrl: 'date-range.component.html'
})
export class DateRangeComponent {

  @Output() dateRange = new EventEmitter();
  constructor() { }


  formHandler(fromDateInput, toDateInput) {
    this.dateRange.emit([fromDateInput.value, toDateInput.value])
  }
}