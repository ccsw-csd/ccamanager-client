import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { OrganizationService } from '../services/organization.service';
import { PersonCustomer } from '../models/PersonCustomer';
import { Person } from 'src/app/personal/models/Person';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
  //providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, CustomerService]
})
export class OrganizationEditComponent implements OnInit {

  personCustomerList : PersonCustomer[] = [];
  personList : any[] = [];

  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private organizationService: OrganizationService,
    private snackbarService : SnackbarService) { 

    }

  ngOnInit(): void {

    this.organizationService.getPersonCustomer(this.config.data.customer.id).subscribe((res) => {

      res.forEach(item => { 
        if (!item.parent) {
          item.parent = new Person();          
        }
      });

      this.personCustomerList = res;
      this.personList = res.map(item => ({'fullName': item.person.name + ' ' + item.person.lastname, 'id': item.person.id}));

      this.personList.sort();
      
      
    })
  }

  closeWindow(): void {
    this.ref.close(false);
  }

  save() : void {
    this.organizationService.savePersonCustomer(this.personCustomerList).subscribe(() => {
      this.ref.close(true);
    });
  }

  personWithout(id : number) {
    return this.personList.filter(item => item.id != id);
  }

}
