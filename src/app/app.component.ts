import { Component } from '@angular/core';

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
  providers: [ItemsService, SpotifyService]
})
export class AppComponent {
  title = 'Angular2 State Management Demo';
}
