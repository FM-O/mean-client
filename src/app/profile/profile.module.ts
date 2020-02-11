// Native modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { ProfileComponent } from './profile.component';

// Routing
import { PROFILE_ROUTES } from './profile.routes';
import { LayoutModule } from '../shared/modules/layout.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(PROFILE_ROUTES)
  ]
})
export class ProfileModule { }
