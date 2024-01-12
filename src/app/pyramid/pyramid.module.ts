import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PyramidGraphComponent } from './pyramid-graph/pyramid-graph.component';
import { PyramidGraphCustomerComponent } from './pyramid-graph-customer/pyramid-graph-customer.component';

@NgModule({
  declarations: [
    PyramidGraphComponent,
    PyramidGraphCustomerComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    ChartModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class PyramidModule { }
