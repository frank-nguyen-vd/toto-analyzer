import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Toto } from "app/models/toto.model";
import { TOTOS } from "app/toto.mock";

import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class TotoService {
  // totos: Toto[];

  private totoSource = new BehaviorSubject<Toto[]>([]);
  constructor(private http: Http) { }

  // getTotos(): Observable<Toto[]> {
  //   this.http.get('api/v1/totos')
  //     .toPromise()
  //     .then ((res: Response) => {
  //       this.totoSource.next(res.json())
  //     })
  //     .catch((err: Response) => {
  //     });
  //   console.log("test123")
  //   console.log(this.totoSource.asObservable())
  //   return this.totoSource.asObservable();
  // }

  getTotos(): Promise<Toto> {
    return this.http.get('api/v1/totos')
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error happened', error);
    return Promise.reject(error.body || error);
  }
}
