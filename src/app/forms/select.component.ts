import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'radio-selector',
  template: `
    <div class="form-group">
          <label class="control-label">Select all</label>
          <div class="controls">
            <label class="radio inline">
              <input type="radio" name="selectAll "(change)="selectionHandler($event)"  [checked]="selection == 'NOT_IMPORT'" value="NOT_IMPORT"/>

                    Do not import
                </label>
            <label class="radio inline">
              <input type="radio" name="selectAll" (change)="selectionHandler($event)" [checked]="selection == 'OVERWRITE'" value="OVERWRITE"/>

                    Overwrite
                </label>
            <label class="radio inline">
              <input type="radio" name="selectAll" (change)="selectionHandler($event)" [checked]="selection == 'INSERT'" value="INSERT"/>

                    Insert or duplicate
                </label>
          </div>
        </div>
  `
})
export class RadioSelectorComponent implements OnInit {
  @Output() onSelectAllChanged = new EventEmitter();
  @Input() selection: string;
  constructor() { }

  ngOnInit() { }

  selectionHandler(selection) {
    this.onSelectAllChanged.emit({Action: selection.target.value})
  }

}