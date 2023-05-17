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
  loading : boolean = false;
  item: any;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private educationService: EducationService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.educationElement = Object.assign({ educationData: Education }, this.config.data.educationData)
  }


  saveItem(item: Education) {
    this.loading = true;
    this.educationService.save(item).subscribe({
      next: () => {
        this.snackbarService.showMessage("El registro se ha guardado con éxito");
        this.ref.close(true);
      },
      error: (errorResponse) => {
        this.loading = false;
        this.snackbarService.error(errorResponse['message']);
      },
      complete:()=>{
        this.loading = false;
      }
    })
  }


  closeWindow() {
      this.ref.close(false);
    
  }

  
  showDialog(element?: any) {
    this.item = element

  }

}
