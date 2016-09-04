import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from './search-box.component';
import { SearchItemRenderer } from './search-item-renderer';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html',
  directives: [SearchBoxComponent, SearchItemRenderer]
})
export class SearchComponent implements OnInit {
  private artists: any;
  constructor(private spotify: SpotifyService) {

  }

  ngOnInit() {}

  update(event) {
    this.artists = this.spotify.getAll(event.value)
      .map(artists => artists.artists.items)
  }
}