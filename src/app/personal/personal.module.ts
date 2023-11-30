import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PersonalEditComponent } from './personal-edit/personal-edit/personal-edit.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PersonalSynchronizeLdapComponent } from './personal-synchronize-ldap/personal-synchronize-ldap.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { PersonalOrgComponent } from './personal-org/personal-org.component';

@NgModule({
  declarations: [
    PersonalListComponent, 
    PersonalEditComponent, 
    PersonalSynchronizeLdapComponent, 
    PersonalOrgComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    DynamicDialogModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    TabViewModule,
    TreeModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    FormsModule,
    MultiSelectModule,
    OrganizationChartModule
  ],
})
export class PersonalModule {}
