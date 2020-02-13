import { Action } from '@ngrx/store';
import { Photo } from '../models/photo.model';

export enum PhotosActionTypes {
    SET_FILTER = '[ Photos ] - set filter',
    FETCH_PHOTOS = '[ Photos ] - fetch photos',
    FETCH_PHOTOS_SUCCESS = '[ Photos ] - fetch photos success'
}

export class SetFilter implements Action {
    readonly type = PhotosActionTypes.SET_FILTER;
    constructor(public payload:string) {}
}

export class FetchPhotos implements Action {
    readonly type = PhotosActionTypes.FETCH_PHOTOS;
}

export class FetchPhotosSuccess implements Action {
    readonly type = PhotosActionTypes.FETCH_PHOTOS_SUCCESS;
    constructor(public payload:Photo[]) {}
}

export type PhotosActions = SetFilter | FetchPhotos | FetchPhotosSuccess;