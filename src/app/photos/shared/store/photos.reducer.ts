import { PhotosActions, PhotosActionTypes } from './photos.actions';
import { Photo } from '../models/photo.model';

export interface PhotosState {
    photos: Photo[],
    filter: string
}

export const initialPhotoState: PhotosState = {
    photos: null,
    filter: null
};

export function photoReducer(state: PhotosState = initialPhotoState, action: PhotosActions): PhotosState {
    switch (action.type) {
        case PhotosActionTypes.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case PhotosActionTypes.FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload
            };
        default:
            return state;
    }
}