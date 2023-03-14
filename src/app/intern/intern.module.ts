import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from "primeng/tooltip";
import { InternButtonsComponent } from './intern-buttons/intern-buttons.component';
import { InternListComponent } from './intern-list/intern-list.component';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InternListComponent, InternButtonsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    DynamicDialogModule,
    TooltipModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FormsModule
  ],
})
export class InternModule {}
