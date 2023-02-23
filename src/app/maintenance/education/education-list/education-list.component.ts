import { Component, OnInit } from '@angular/core';
import { Education } from '../models/Education';
// import {ApplicationService} from "../../services/application.service";
// import { ApplicationNewComponent } from "../application-new/application-new.component";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { EducationEditComponent } from '../education-edit/education-edit.component';
// import { ApplicationEditComponent } from "../application-edit/application-edit.component";
// import { RoleClass } from '../../models/RoleClass';
// import {ApplicationDeployComponent} from "../application-deploy/application-deploy.component";
import { EducationService } from '../services/education.service';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig,ConfirmationService]
})
export class EducationListComponent implements OnInit {

  listOfData: Education[];
  isLoading: boolean = false;
  item: Education;

  constructor(
    private educationService: EducationService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.isLoading = true;
    this.educationService.findAll().subscribe({
       next: (results) => {
         this.listOfData = results;
       },
       error: ()=>{},
       complete: () => { this.isLoading = false; }
     });
  }

  newItem(){
    // this.ref = this.dialogService.open(ApplicationNewComponent, {
    //   header: 'Nuevo elemento',
    //   width: '40%',
    //   data:{},
    //   closable: false
    // });

    this.onClose();
  }

  deleteItem(id: number) {
    console.log("hello");
    this.confirmationService.confirm({
        message: '¿Seguro/a que quieres borrar la titulacion?',
        accept: () => {
            this.educationService.deleteEducation(id).subscribe(() => {
                this.educationService.findAll().subscribe((result: any) => {
                    this.listOfData = result;
                    // this.ngOnInit()

                });
            });
        },
        reject:()=>{
          // this.ngOnInit()
        }
        
    });
  }


  onClose(): void{
    this.ref.onClose.subscribe(
       (results:any) => {
         this.findAll();
       }
     )
  }

  editItem(item: Education){
    this.ref = this.dialogService.open(EducationEditComponent, {
      header:'Editar ' + item.name,
      width: '40%',
      data: {
        educationData:item
      },
      closable: false
    });
  
    this.onClose();
  }
  
}



