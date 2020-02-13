import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private unsplash = new Unsplash({ accessKey: "670d9105b00aab89c9ac03fc2703ef1818c1dedb089011145eb80bdf108242bd" });

  constructor() { }

  public getPicture(filter:string) {
    return from(this.unsplash.search.photos(filter, 0).then((res:any) => res.json())).pipe(
      map( (res:any) => res.results.map(r => ({ url: r.urls.small })))
    );
  }
}
