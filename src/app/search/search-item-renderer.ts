import { Component, OnInit, Input, Output } from '@angular/core';
import { Artist } from '../models/artist.model';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'search-item-render',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div class="row">
      <div class="col-md-12">
        <div class="search-result well">
          <h4>
            <a routerLink="/artist/{{artist.id}}">{{artist.name}}</a>
          </h4>
          <div *ngIf="artist.genres.length">
            <strong>Genres:</strong>
            <span *ngFor="let genre of artist.genres">{{genre}}</span>
          </div>
        </div>
      </div>
    </div>
`
})
export class SearchItemRenderer implements OnInit {
  constructor() {

  }
  @Input() artist: Artist;
  @Input() query: string;

  ngOnInit() { }


}