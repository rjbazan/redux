import { provideRouter, RouterConfig} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { FormComponent } from './forms/form.component';

const routes: RouterConfig = [
  {path: '', component: SearchComponent},
  {path: 'artist/:id', component: ArtistComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'forms', component: FormComponent}
]

export const appRouterProviders = [
  provideRouter(routes)
];