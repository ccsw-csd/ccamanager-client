import { Component, OnInit } from '@angular/core';
import { Education } from '../models/Education';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { EducationEditComponent } from '../education-edit/education-edit.component';
import { EducationService } from '../services/education.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService]
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

  findAll() {
    this.isLoading = true;
    this.educationService.findAll().subscribe({
      next: (results) => {
        this.listOfData = results;
      },
      error: () => { },
      complete: () => { this.isLoading = false; }
    });
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro/a que quieres borrar la titulacion?',
      accept: () => {
        this.confirmationService.close()
        this.educationService.deleteEducation(id).subscribe({
          next: () => {
            this.educationService.findAll().subscribe((result: any) => {
              this.listOfData = result;
              this.snackbarService.showMessage("El registro se ha borrado con éxito");
              this.ngOnInit()
            });
          },
          error: (errorResponse) => {
            this.snackbarService.error(errorResponse['message']);
          }
        })
      },
      reject: () => {
        this.confirmationService.close();
      }

    });
  }


  onClose(): void {
    this.ref.onClose.subscribe(
      (results: any) => {
        this.findAll();
      }
    )
  }

  addOrEditItem(item: Education) {

    if (item != null) {
      this.ref = this.dialogService.open(EducationEditComponent, {
        header: 'Editar ' + item.name,
        width: '600px',
        data: {
          educationData: item
        },
      });
    }

    else {
      this.ref = this.dialogService.open(EducationEditComponent, {
        header: 'Nuevo elemento',
        width: '600px',
        data: {
          educationData: null
        },
      });
      
    }


    this.onClose();
  }

 
}



