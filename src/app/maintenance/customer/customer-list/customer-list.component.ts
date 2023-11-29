import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SortEvent} from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/Customer';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService]
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];

  cols: any[];

  constructor(
    private ref: DynamicDialogRef,
    private snackbarService: SnackbarService,
    private confirmationService:ConfirmationService,
    private dialogService: DialogService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (res: Customer[]) => {
        this.customers = res;
        this.customers.forEach((e) =>  e.managersParsed = e.managers.map((p) => p.name + " " + p.lastname).join(', '));
      }
    });
  }

  editCustomer(customer?: Customer) {
    let header = customer ? 'Modicar Cliente' : 'Nuevo Cliente';
    this.ref = this.dialogService.open(CustomerEditComponent, {      
      //height:"450px",
      width:"680px",
      data:{
        customer: customer,
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
      message: '¿Deseas borrar el Cliente?',
      rejectButtonStyleClass: 'p-button p-button-secondary p-button-outlined',
      acceptIcon: 'false',
      rejectIcon: 'false',      
      accept:()=>{
        this.confirmationService.close()
        this.customerService.delete(id).subscribe({

          next:()=>{
            this.snackbarService.showMessage("Se ha eliminado correctamente el Cliente");
            this.getAllCustomers();
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
