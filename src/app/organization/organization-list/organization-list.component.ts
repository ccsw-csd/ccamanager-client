import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SortEvent} from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../core/services/snackbar.service";
import { Customer } from 'src/app/maintenance/customer/models/Customer';
import { CustomerService } from 'src/app/maintenance/customer/services/customer.service';
import { OrganizationEditComponent } from '../organization-edit/organization-edit.component';
import { OrganizationChartComponent } from '../organization-chart/organization-chart.component';


@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService]
})
export class OrganizationListComponent implements OnInit {

  customers: Customer[];

  cols: any[];

  constructor(
    private snackbarService: SnackbarService,
    private confirmationService:ConfirmationService,
    private dialogService: DialogService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getCustomersSecured().subscribe({
      next: (res: Customer[]) => {
        this.customers = res;
        this.customers.forEach((e) =>  e.managersParsed = e.managers.map((p) => p.name + " " + p.lastname).join(', '));
      }
    });
  }

  editCustomer(customer: Customer) {
    let header = 'Organización de '+customer.name;
    
    let ref = this.dialogService.open(OrganizationEditComponent, {      
      height:"800px",
      width:"800px",
      data:{
        customer: customer,
      },
      closable: false,
      showHeader: true,
      header: header
    });
    
    ref.onClose.subscribe((results: any) => {
      if (results) {
        this.getAllCustomers();
      }
    });
  }
  

  openOrganization() {
    let ids = this.customers.map(item => item.id).join();

    this.viewChart(ids);
  }

  viewChart(customerId: string) {

    this.dialogService.open(OrganizationChartComponent, {      
      height:"90vh",
      width:"90vw",
      data:{
        customers: customerId,
      },
      closable: false,
      showHeader: true,
      header: 'Organigrama'
    });

    

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
