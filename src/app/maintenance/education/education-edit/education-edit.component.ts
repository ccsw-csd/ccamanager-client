import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EducationService } from '../services/education.service';
import { SnackbarService } from "../../../core/services/snackbar.service";
import { Education } from '../models/Education';



@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss']
})
export class EducationEditComponent implements OnInit {



  educationElement: Education;

  isLoading: boolean;

  isLoading2: boolean;

  isDeleted: boolean = false;

  item: any;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private educationService: EducationService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.educationElement = Object.assign({ educationData: Education }, this.config.data.educationData)
    
  }



  saveItem(item: Education) {
    this.educationService.save(item).subscribe({
      next: () => {
        this.snackbarService.showMessage("El registro se ha guardado con éxito");
        this.closeWindow();
      },
      error: () => {
          this.snackbarService.error("El código o el nombre de la titulación no se puede repetir");
        
      }
    })
  }
  
 
  onClose(ref: any): void {
    ref.onClose.subscribe(
      (results: any) => {
        
      }
    )
  }

  closeWindow() {
    if (this.ref) {
      this.ref.close();
    }
  }



 

  showDialog(element?: any) {
    this.item = element
    //this.snackbarService.showConfirmDialog()
  }

  

  closeDialog() {
    // this.snackbarService.closeConfirmDialog()
    // if (this.isDeleted == false) {
    //   this.getRoles(this.applicationElement.id)
    //   this.getTreeOfRolesAndGroups(this.applicationElement.id)
    //   this.getGroups(this.applicationElement.id)
    // }
  }

}
