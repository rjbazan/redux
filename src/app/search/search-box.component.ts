import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'search-box',
  template: `<form novalidate autocomplete="off" class="main">
  <div class="form-group">
    <input  
      type="text"
      name="search"
      #search
      class="form-control"
      (input)="update.emit(search)"
      placeholder="Search Music..."/>
  </div>
</form>`,
  styles: [`
    .main {
      border-bottom: 1px solid #df691a;
      padding: 30px 0;
    }
  `]
})
export class SearchBoxComponent implements OnInit {
  @Output() update = new EventEmitter();
  constructor() { }

  ngOnInit() { }

}