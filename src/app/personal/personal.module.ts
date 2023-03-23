import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalListComponent } from './personal-list/personal-list.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { ConfirmationService } from 'primeng/api';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [PersonalListComponent],

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
  ],
})
export class PersonalModule {}
