import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationListComponent } from './education/education-list/education-list.component';
import { EducationEditComponent } from './education/education-edit/education-edit.component';
import { EducationCenterEditComponent } from './education-center/education-center-edit/education-center-edit.component';
import { EducationCenterListComponent } from './education-center/education-center-list/education-center-list.component';
import { TechnologyListComponent } from './technology/technology-list/technology-list.component';
import { TechnologyEditComponent } from './technology/technology-edit/technology-edit.component';
import { EnglishLevelEditComponent } from './english-level/english-level-edit/english-level-edit.component';
import { EnglishLevelListComponent } from './english-level/english-level-list/english-level-list.component';
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
import { ConfirmationService } from "primeng/api";
import { PickListModule } from 'primeng/picklist';
import { EducationNewComponent } from './education/education-new/education-new.component';

@NgModule({
  declarations: [
    EducationListComponent,
    EducationEditComponent,
    EducationCenterEditComponent,
    EducationCenterListComponent,
    TechnologyListComponent,
    TechnologyEditComponent,
    EnglishLevelEditComponent,
    EnglishLevelListComponent,
    EducationNewComponent,
    
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
  ]
})
export class MaintenanceModule { }
