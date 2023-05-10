import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Province } from 'src/app/core/models/Province';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { EducationCenter } from '../models/EducationCenter';
import { EducationCenterService } from '../services/education-center.service';

@Component({
  selector: 'app-education-center-edit',
  templateUrl: './education-center-edit.component.html',
  styleUrls: ['./education-center-edit.component.scss'],
  providers:[MessageService]
})
export class EducationCenterEditComponent implements OnInit {

  educationCenter:EducationCenter;
  provinces :  Province[];
  selectedProvince:Province;
  types : any[];
  educationCenterForm : FormGroup;
  isNew :boolean;
  loading : boolean = false;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private snackbarService:SnackbarService,
    private educationCenterService:EducationCenterService,
  ) {}
  
  ngOnInit(): void {

    if (this.config.data.educationCenter === undefined) {
      this.educationCenter = new EducationCenter();
      this.isNew=true;
    }else{
      this.educationCenter = Object.assign({educationCenter:EducationCenter},this.config.data.educationCenter);
      this.isNew=false;
    }
    this.provinces = this.config.data.provinces;
    this.types = [{label:"UN",value:"UN"},{label:"FP",value:"FP"}];
  }

  save(){
    this.loading = true;
    if(this.validate()){
      this.educationCenterService.save(this.educationCenter).subscribe({
        next:(res)=>{
          if(this.isNew){
            this.snackbarService.showMessage("Se ha añadido correctamente el Centro Educativo");
          }else{
            this.snackbarService.showMessage("Se ha actualizado el Centro Educativo");
          }
          this.closeWindow();
        },
        error:(error)=>{
            this.snackbarService.error(error.message);
            this.loading = false;
        },
        complete:()=>{
          this.loading = false;
        }
        }
      );
    }
  } 

  validate():boolean{

      if(this.educationCenter.name && this.educationCenter.type && this.educationCenter.province){
        return true;
      }
      return false;
  }

  closeWindow(){
    
    this.ref.close();
  }
}
