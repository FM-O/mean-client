import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PhotosActionTypes, FetchPhotos, FetchPhotosSuccess } from './photos.actions';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { switchMap, take, debounceTime, map } from 'rxjs/operators';
import { filterSelector } from './photos.selectors';
import { PhotosService } from '../services/photos.service';
import { Photo } from '../models/photo.model';

@Injectable()
export class PhotosEffect {

    @Effect()
    fetchPhotos$ = this.actions$.pipe(
        ofType<FetchPhotos>(PhotosActionTypes.FETCH_PHOTOS),
        debounceTime(1000),
        switchMap( () => this.store.pipe(select(filterSelector), take(1))),
        switchMap( (filter:string) => this.photosService.getPicture(filter)),
        map( (photos:Photo[]) => new FetchPhotosSuccess(photos))
    );

    constructor(private actions$:Actions, private store: Store<State>, private photosService:PhotosService) { }
}