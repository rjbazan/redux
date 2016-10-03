import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { SearchModule } from './search/search.module';


import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';

import { RadioSelectorComponent } from './forms/select.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { FormComponent } from './forms/form.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar';
import { CountriesComponent } from './calendar/countries';
import { CountryDetailsComponent } from './calendar/countryDetails';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
import { SpotifyService } from './services/spotify.service';
import { formReducer } from './forms/formReducer';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    StoreModule.provideStore(formReducer),
    SearchModule
  ],
  declarations: [AppComponent, NavbarComponent, ArtistComponent, AlbumComponent, FormComponent,
    AboutComponent, RadioSelectorComponent, CalendarComponent, CountriesComponent, CountryDetailsComponent],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
