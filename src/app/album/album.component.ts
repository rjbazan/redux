import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist.model'
import { Album } from '../models/album.model'
import { Track } from '../models/track.model'

@Component({
  moduleId: module.id,
  selector: 'album',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'album.component.html',
  styles: [`
   .reset-list {
     padding-left: 0px;
     list-style: none
   }
  `]
})
export class AlbumComponent implements OnInit {
  private album: Album;
  private tracks: any;
  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.spotify.GetAlbum(id)
          .subscribe(album => {
            this.album = album;
          });

        this.spotify.GetAlbumTracks(id)
          .map(tracks => tracks.items)
          .subscribe(tracks => {
            this.tracks = tracks
          });
      });

  }
}