import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogComponent } from './dialog/dialog.component';
import { InternListComponent } from './intern-list/intern-list.component';

@NgModule({
  declarations: [InternListComponent, DialogComponent],
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
    FormsModule,
  ],
})
export class InternModule {}
