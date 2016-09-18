import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { SearchComponent }   from './search.component';
import { SearchBoxComponent }   from './search-box.component';
import { SearchItemRenderer }   from './search-item-renderer';

import { SpotifyService } from '../services/spotify.service';

@NgModule({
  imports: [RouterModule, CommonModule],
  exports: [],
  declarations: [SearchBoxComponent, SearchItemRenderer, SearchComponent],
  providers: [SpotifyService],
})
export class SearchModule { }
