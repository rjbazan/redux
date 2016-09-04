import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NotesComponent } from './notes';
import { NotesControllerComponent } from './notes';
import { NotesDataService } from './notes';
import { NotesServiceServerFirstOnAdd } from './notes';
import { NotesServiceStoreFirstOnAdd } from './notes';
import { NotesServiceHttpOnly } from './notes';
import { NotesServiceStoreOnly } from './notes';
import { DateRangeComponent } from './dates/date-range.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './forms/form.component';
import { SpotifyService } from './services/spotify.service';
import { MainViewComponent } from './dates/main-view.component';
import { ItemsService } from './dates/items.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [NotesComponent, NotesControllerComponent, DateRangeComponent, MainViewComponent, NavbarComponent, FormComponent, ROUTER_DIRECTIVES],
  providers: [NotesDataService, NotesServiceServerFirstOnAdd, NotesServiceStoreFirstOnAdd, NotesServiceHttpOnly, NotesServiceStoreOnly, ItemsService, SpotifyService]
})
export class AppComponent {
  title = 'Angular2 State Management Demo';
}
