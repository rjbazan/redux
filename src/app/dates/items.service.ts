import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import { Item } from './item';

@Injectable()
export class ItemsService {
    private API_ROOT: String = "http://localhost:3000";
    private JSON_HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };
    
    constructor(public http: Http) { }
    
    getItems(): Observable<Array<Item>> {
      return this.http.get(`${this.API_ROOT}/items`)
        .map((response: Response) => response.json());
    }

}
