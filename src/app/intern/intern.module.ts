import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogComponent } from './dialog/dialog.component';
import { InternListComponent } from './intern-list/intern-list.component';
import { InternEditComponent } from './intern-edit/intern-edit.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { InternTimelineComponent } from './intern-timeline/intern-timeline.component';
import { InternSynchronizeLdapComponent } from './intern-synchronize-ldap/intern-synchronize-ldap/intern-synchronize-ldap.component';
@NgModule({
  declarations: [InternListComponent, DialogComponent, InternEditComponent, InternTimelineComponent, InternSynchronizeLdapComponent],
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
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    AutoCompleteModule,
    CheckboxModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    ChartModule,
    ProgressSpinnerModule
  ],
})
export class InternModule {}
