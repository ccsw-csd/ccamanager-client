import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CostCenter } from '../models/CostCenter';
import { CostCenterService } from '../services/cost-center.service';
import { Center } from 'src/app/core/models/Center';
import { CenterService } from 'src/app/core/services/center.service';
import { Cost } from '../models/Cost';

@Component({
  selector: 'app-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
  styleUrls: ['./cost-center-edit.component.scss']
})
export class CostCenterEditComponent implements OnInit {

  costCenter: CostCenter;
  costCenterForm : FormGroup;
  isNew: boolean;
  loading : boolean = false;

  centers: Center[];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private snackbarService: SnackbarService,
    private costCenterService: CostCenterService,
    private centerService: CenterService
  ) {}
  
  ngOnInit(): void {

    this.getAllCenters();

    if (this.config.data.costCenter === undefined) {
      this.costCenter = new CostCenter();
      this.costCenter.centers = [];
      this.initCosts();
      this.isNew = true;
    } else {
      this.costCenter = Object.assign({costCenter: CostCenter}, this.config.data.costCenter);
      this.isNew = false;
    }
  }

  initCosts(){
    this.costCenter.costs = [];
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'A1', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'A2', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'B1', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'B2', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'B3', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'C1', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'C2', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'C3', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'D1', cost:0.0}));
    this.costCenter.costs.push(Object.assign({cost: Cost}, {id: null, grade:'D2', cost:0.0}));
  }

  getAllCenters() {
    this.centerService.getAllCenters().subscribe({
      next: (res: Center[]) => {
        this.centers = res;
      }
    });
  }

  save() {
    this.loading = true;
    if(this.validate() && this.checkCosts(this.costCenter)){
      this.costCenterService.save(this.costCenter).subscribe({
        next:(res)=>{
          if(this.isNew){
            this.snackbarService.showMessage("Se ha añadido correctamente el Centro de Coste");
          }else{
            this.snackbarService.showMessage("Se ha actualizado el Centro de Coste");
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
      });
    } else {
      this.loading = false;
    }
  }

  validate(): boolean {

    if(this.costCenter.name){
      return true;
    }
    return false;
  }

  checkCosts(costCenter: CostCenter): boolean {

    if(this.costCenter.costs.filter(e => e.cost == 0 || e.cost == null).length > 0){
      this.snackbarService.error("El coste no puede estar vacio o ser cero");
      return false;
    }
    return true;
  }

  closeWindow(){
    
    this.ref.close();
  }
}
