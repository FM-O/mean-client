import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from '../shared/modules/layout.module';

// Routing
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routes';

// NgRx
import { StoreModule } from '@ngrx/store';
import { photoReducer } from './shared/store/photos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PhotosEffect } from './shared/store/photos.effects';


@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
    StoreModule.forFeature('photos', photoReducer),
    EffectsModule.forFeature([PhotosEffect])
  ]
})
export class PhotosModule { }
