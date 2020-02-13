import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PhotosState } from './photos.reducer';

const photosSelector = createFeatureSelector('photos');

export const filterSelector = createSelector(photosSelector, (photosState: PhotosState) => photosState ? photosState.filter : null);

export const photosResultSelector = createSelector(photosSelector, (photosState: PhotosState) => photosState ? photosState.photos : null);