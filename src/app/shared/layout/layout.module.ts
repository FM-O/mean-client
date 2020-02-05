import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { 
  MatToolbarModule,
  MatButtonModule, 
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule} from '@angular/material';

const MODULES = [
  FlexLayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: MODULES
})
export class LayoutModule { }
