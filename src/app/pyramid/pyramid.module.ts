import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PyramidListComponent } from './pyramid-list/pyramid-list.component';
import { PyramidTeamListComponent } from './pyramid-team-list/pyramid-team-list.component';
import { TableModule } from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [
    PyramidListComponent,
    PyramidTeamListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputNumberModule
  ]
})
export class PyramidModule { }
