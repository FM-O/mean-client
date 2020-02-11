import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';


const MODULES = [
  FlexLayoutModule,
  MaterialModule,
  CommonModule
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: MODULES
})
export class LayoutModule { }
