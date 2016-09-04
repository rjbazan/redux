import { Component, OnInit } from '@angular/core';
import { MyDatePicker } from 'MyDatePicker/src/index';

@Component({
  moduleId: module.id,
  selector: 'entry-form',
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnInit {
  private options: any;
  constructor() { }

  ngOnInit() {
    this.options = {
      dateFormat: 'yyyy-mm-dd',
      height: '34px',
      width: '260px'
    }
  }

  onDateChanged(event) {
    console.log(event);
  }
}