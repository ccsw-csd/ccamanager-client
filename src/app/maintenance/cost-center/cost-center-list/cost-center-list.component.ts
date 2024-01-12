import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SortEvent} from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { CostCenterService } from '../services/cost-center.service';
import { CostCenter } from '../models/CostCenter';
import { CostCenterEditComponent } from '../cost-center-edit/cost-center-edit.component';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrls: ['./cost-center-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService]
})
export class CostCenterListComponent implements OnInit {

  costCenters: CostCenter[];

  cols: any[];

  constructor(
    private ref: DynamicDialogRef,
    private snackbarService: SnackbarService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private costCenterService: CostCenterService
  ) {}

  ngOnInit(): void {
    
    this.getAllCostCenters();
  }

  getAllCostCenters() {
    this.costCenterService.getAllCostCenters().subscribe({
      next: (res: CostCenter[]) => {
        this.costCenters = res;
        this.costCenters.forEach((e) =>  e.centersParsed = e.centers.map((p) => p.name).join(', '));
      }
    });
  }

  editCostCenter(costCenter?: CostCenter) {
    let header = costCenter ? 'Modificar Centro de Coste' : 'Nuevo Centro de Coste';
    this.ref = this.dialogService.open(CostCenterEditComponent, {      
      //height:"450px",
      width:"680px",
      data:{
        costCenter: costCenter,
      },
      closable: false,
      showHeader: true,
      header: header
    });
    this.onClose();
  }

  onClose(): void {

    this.ref.onClose.subscribe((results: any) => {
      this.ngOnInit();
    });
  }

  delete(id:number){

    this.confirmationService.confirm({
      message: '¿Deseas borrar el Centro de Coste?',
      rejectButtonStyleClass: 'p-button p-button-secondary p-button-outlined',
      acceptIcon: 'false',
      rejectIcon: 'false',      
      accept:()=>{
        this.confirmationService.close()
        this.costCenterService.delete(id).subscribe({

          next:()=>{
            this.snackbarService.showMessage("Se ha eliminado correctamente el Centro de Coste");
            this.getAllCostCenters();
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

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else if (Array.isArray(value1) && Array.isArray(value2)){
          result = value1.sort((a, b) => a.name.localeCompare(b.name)).map((t) => t.name).join(', ').localeCompare(value2.sort((a, b) => a.name.localeCompare(b.name)).map((t) => t.name).join(', '));
        } 
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order * result;
    });
  }

}