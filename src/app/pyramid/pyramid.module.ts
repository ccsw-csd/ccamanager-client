import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PyramidListComponent } from './pyramid-list/pyramid-list.component';
import { PyramidTeamListComponent } from './pyramid-team-list/pyramid-team-list.component';
import { TableModule } from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import { ChartModule } from 'primeng/chart';
@NgModule({
  declarations: [
    PyramidListComponent,
    PyramidTeamListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    ChartModule,
    ButtonModule,
  ]
})
export class PyramidModule { }
