import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from './fecha.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FechaPipe
  ],
  declarations: [
    FechaPipe
  ]
})
export class PipesModule { }
