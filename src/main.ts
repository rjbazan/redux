import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import {HTTP_PROVIDERS} from '@angular/http';

import { AppComponent, environment } from './app/';
import { notes } from './app/notes/';
import { NotesEffectsService } from './app/notes';
import { NotesDataService } from './app/notes';
import { items, dateFilter } from './app/notes/reducers/filter.reducer';
import { appRouterProviders } from './app/app.routes';
if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  appRouterProviders,
  NotesDataService,
  provideStore({items, dateFilter}),
  runEffects(NotesEffectsService) //comment this out if you want to explore the non @ngrx/effects approaches
]);
