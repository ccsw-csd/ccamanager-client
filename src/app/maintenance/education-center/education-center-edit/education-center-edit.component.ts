import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Province } from 'src/app/core/models/Province';
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
  selectedType :string ;
  inputNameCenter:string;
  educationCenterForm : FormGroup;
  isNew :boolean;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private dialogService: DialogService,
    private educationCenterService:EducationCenterService,
  ) {}
  
  ngOnInit(): void {

    if (this.config.data != null) {

      this.educationCenter = Object.assign({educationCenter:EducationCenter},this.config.data.educationCenter);
      this.selectedProvince = this.educationCenter.province;
      this.selectedType = this.educationCenter.type;
      this.isNew=false;
    }else{
      this.educationCenter = new EducationCenter();
      this.isNew=true;
    }
    this.provinces = this.config.data.provinces;
    this.types = [
      {label:"UN",value:"UN"},
      {label:"FP",value:"FP"}];

    
  }

  save(){
    this.educationCenter.province = this.selectedProvince;
    this.educationCenter.type=this.selectedType;

    if(this.validate()){
      this.educationCenterService.save(this.educationCenter).subscribe(
        (result)=>{
          if(this.isNew){
            this.showSuccess("Se ha añadido correctamente el Centro Educativo");
          }
          this.showSuccess("Se ha actualizado el Centro Educativo");
          this.closeWindow();
        },
        (error)=>{
          this.showError();
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
  showSuccess(message:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail:message});
  }
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
}
  closeWindow(){
    this.ref.close();
  }
}
