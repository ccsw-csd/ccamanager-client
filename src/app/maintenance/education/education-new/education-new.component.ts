import { Component, OnInit } from '@angular/core';
import { Education } from '../models/Education';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SnackbarService} from "../../../core/services/snackbar.service";
import { EducationService } from '../services/education.service';
@Component({
  selector: 'app-education-new',
  templateUrl: './education-new.component.html',
  styleUrls: ['./education-new.component.scss']
})
export class EducationNewComponent implements OnInit {

  educationElement: Education;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private educationService: EducationService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.educationElement = Object.assign({educationData: Education}, this.config.data.educationData)
  }

  saveItem(item: Education) {
    this.educationService.save(item).subscribe({
      next: () => {
        this.snackbarService.showMessage("El registro se ha guardado con éxito");
        this.closeWindow();
      },
      error: () => {
        this.snackbarService.error("El registro tiene el mismo código o nombre que otro registro y no se puede guardar");
      }
    })
  }

  closeWindow() {
    if(this.ref) {
      this.ref.close();
    }
  }

}
