import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationChartComponent } from './organization-chart/organization-chart.component';

import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from "primeng/tooltip";
import { InputTextModule } from "primeng/inputtext";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PaginatorModule } from "primeng/paginator";
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { PickListModule } from 'primeng/picklist';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SliderModule } from 'primeng/slider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationEditComponent,
    OrganizationChartComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    DynamicDialogModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    TabViewModule,
    TreeModule,
    PickListModule,
    ListboxModule,
    AutoCompleteModule,
    OrganizationChartModule,
    SliderModule,
    ProgressSpinnerModule
  ]
})
export class OrganizationModule { }
