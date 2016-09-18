import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist.model'
import { Album } from '../models/album.model'
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'artist',
  templateUrl: 'artist.component.html',
  styles: [`
  .artist-header {
    border-bottom: 1px solid #df691a;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .artist-thumb {
    width: 100px;
    height: auto;
    float: left;
    margin-right: 10px;
  }
  .artist-albums.well {
    margin-bottom: 20px;
    overflow: auto;
    min-height: 400px;
  }
  album {
    text-align: center;
    background: #df691a;
    border: 1px solid #df691a;
  }
  album-thumb {
    width: 100%;
  }
  `]
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums: Album[];
  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.spotifyService.GetArtist(id)
          .subscribe(artist => {
            this.artist = artist;
          });

        this.spotifyService.GetArtistsAlbums(id)
          .map(albums => albums.items)
          .subscribe(albums => {
            this.albums = albums;
          });
      });

  }

}