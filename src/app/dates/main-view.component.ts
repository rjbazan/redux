import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {Observable} from 'rxjs/Rx';
import { ItemsService } from './items.service';
import { DateRangeComponent } from './date-range.component';
import { Item, AppState } from './item';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  moduleId: module.id,
  selector: 'main-view',
  directives: [DateRangeComponent],
  template: `
    <date-range (dateRange)="getRange($event)"></date-range>
    <ul>
      <li *ngFor="let item of items">{{item.name}}</li>
    </ul>
    <div>{{items | json}}</div>
  `
})
export class MainViewComponent implements OnInit {
  items: any;
  someAction$: any;

  constructor(public store: Store<AppState>, private _items: ItemsService) {
    _items.getItems()
      .map(payload => ({ type: 'INIT', payload: payload }))
      .subscribe(action => store.dispatch(action));

    /*//_items.getItems();
    this.items = this.store.select<Item[]>('items')
      .subscribe(items => {
        this.items = items;
      })*/

    Observable.combineLatest(
      store.select('items'),
      store.select('dateFilter'),
      (items:any, filter) => {
        return items.items.filter(filter)
      }
    ).subscribe(res => {
      this.items = res;
    })

  }

  getRange(range) {
    this.store.dispatch({
      type: range[0] && range[1] ? "SHOW_ITEMS_IN_RANGE" : "SHOW_ALL"
    });
  }

  ngOnInit() {

  }
}