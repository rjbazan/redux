import { Component } from '@angular/core';
import { NotesComponent } from './notes';
import { NotesControllerComponent } from './notes';
import { NotesDataService } from './notes';
import { NotesServiceServerFirstOnAdd } from './notes';
import { NotesServiceStoreFirstOnAdd } from './notes';
import { NotesServiceHttpOnly } from './notes';
import { NotesServiceStoreOnly } from './notes';
import { DateRangeComponent } from './dates/date-range.component';
import { MainViewComponent } from './dates/main-view.component';
import { ItemsService } from './dates/items.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [NotesComponent, NotesControllerComponent, DateRangeComponent, MainViewComponent],
  providers: [NotesDataService, NotesServiceServerFirstOnAdd, NotesServiceStoreFirstOnAdd, NotesServiceHttpOnly, NotesServiceStoreOnly, ItemsService]
})
export class AppComponent {
  title = 'Angular2 State Management Demo';
}
