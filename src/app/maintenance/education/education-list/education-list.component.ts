import { Component, OnInit } from '@angular/core';
import { Education } from '../models/Education';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { EducationEditComponent } from '../education-edit/education-edit.component';
import { EducationNewComponent } from '../education-new/education-new.component';
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

   sortTable() {
    console.log("antes:",this.listOfData)
    this.listOfData.sort((a, b) => a.name.localeCompare(b.name));
    console.log("despues:",this.listOfData)

  }

  findAll(){
    this.isLoading = true;
    this.educationService.findAll().subscribe({
       next: (results) => {
         this.listOfData = results;
        //  this.sortTable()
       },
       error: ()=>{},
       complete: () => { this.isLoading = false; }
     });
  }

  newItem(){
    this.ref = this.dialogService.open(EducationNewComponent, {
       header: 'Nuevo elemento',
       width: '40%',
       data:{},
       closable: false
     });

    this.onClose();
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
        message: '¿Seguro/a que quieres borrar la titulacion?',
        accept: () => {
            this.confirmationService.close();
            this.educationService.deleteEducation(id).subscribe(() => {
                this.educationService.findAll().subscribe((result: any) => {
                    this.listOfData = result;
                    this.ngOnInit()

                });
            });
        },
        reject:()=>{
          this.confirmationService.close();
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



