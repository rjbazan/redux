import { Action } from '@ngrx/store';

import { Item, AppState } from '../../dates/item';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


export const items = (initialState: AppState = { items: [], loading: true, date_range: '' }, action: Action) => {
  switch (action.type) {
    //Actions initiated by the user/front end
    case "INIT":
      return Object.assign({}, initialState, {
        items: action.payload,
        loading: false
      });
    case "FILTER":
      return Object.assign({}, initialState, {
        date_range: action.payload.date_range,
        items: action.payload.items.filter(item => item.date)
      });


    default:
      return initialState;
  }
}

export const dateFilter = (initialState = item => item, action: Action) => {
  console.log(action)
  switch (action.type) {
    case "SHOW_ALL":
      return item => item
    case "SHOW_ITEMS_IN_RANGE":
      return item => item.date

    default:
      return initialState
  }
}
