import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { FormComponent } from './forms/form.component';
import { AboutComponent } from './about/about.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'artist/:id', component: ArtistComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'forms', component: FormComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);