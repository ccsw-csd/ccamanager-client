import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Province } from 'src/app/core/models/Province';
import { ProvinceService } from '../../../core/services/province.service';
import { SnackbarService } from "../../../core/services/snackbar.service";
import { EducationCenterEditComponent } from '../education-center-edit/education-center-edit.component';
import { EducationCenter } from '../models/EducationCenter';
import { EducationCenterService } from '../services/education-center.service';
@Component({
  selector: 'app-education-center-list',
  templateUrl: './education-center-list.component.html',
  styleUrls: ['./education-center-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig,ConfirmationService]
})
export class EducationCenterListComponent implements OnInit {
  provinces: Province[];
  educationCenters: EducationCenter[];

  cols: any[];

  constructor(
    private ref: DynamicDialogRef,
    private snackbarService: SnackbarService,
    private confirmationService:ConfirmationService,
    private educationCenterService:EducationCenterService,
    private dialogService: DialogService,
    private educationService: EducationCenterService,
    private provinceService: ProvinceService
  ) {}

  ngOnInit(): void {
    
    this.getAllProvinces();
    this.getAllEducationCenters();
    
  }
  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe({
      next: (res: Province[]) => {
        this.provinces = res;
      },
    });
  }
  getAllEducationCenters() {
    this.educationService.getAllEducationCenters().subscribe({
      next: (res: EducationCenter[]) => {
        this.educationCenters = res;
      },
    });
  }
  editEducationCenter(educationCenter?:EducationCenter){
    this.ref = this.dialogService.open(EducationCenterEditComponent,{
      height:"450px",
      width:"680px",
      data:{
        educationCenter: educationCenter,
        provinces: this.provinces
      },
      closable:true
    });
    this.onClose();
  }

  onClose():void{

    this.ref.onClose.subscribe(
      (results:any) => {
        this.ngOnInit();
      }
    )
  }
  delete(id:number){

    this.confirmationService.confirm({
      message:'¿Deseas borrar el Centro de Educacion?',
      accept:()=>{
        this.confirmationService.close()
        this.educationCenterService.delete(id).subscribe({

          next:()=>{
            this.snackbarService.showMessage("Se ha eliminado correctamente el Centro de Educacion");
            this.getAllEducationCenters();
          },
          error:(errorResponse)=>{
            this.snackbarService.error(errorResponse.message);
          } 

        });
      },
      reject:()=>{
        this.confirmationService.close();
      }
    });
    
  }
  
  closeWindow(){
    this.ref.close();
  }


}
