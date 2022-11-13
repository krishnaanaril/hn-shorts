import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSincePipe } from './pipes/time-since.pipe';
import { GetDomainPipe } from './pipes/get-domain.pipe';



@NgModule({
  declarations: [
    TimeSincePipe,
    GetDomainPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeSincePipe,
    GetDomainPipe
  ]
})
export class SharedModule { }
