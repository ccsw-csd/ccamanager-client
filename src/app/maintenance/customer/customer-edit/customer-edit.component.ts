import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customer.service';
import { Person } from 'src/app/personal/models/Person';
import { PersonService } from 'src/app/personal/services/person.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer;
  customerForm : FormGroup;
  isNew: boolean;
  loading : boolean = false;

  personSelected;
  groupPerson: any[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private snackbarService: SnackbarService,
    private customerService: CustomerService,
    private personService: PersonService
  ) {}
  
  ngOnInit(): void {

    if (this.config.data.customer === undefined) {
      this.customer = new Customer();
      this.customer.managers = [];
      this.isNew = true;
    } else {
      this.customer = Object.assign({customer: Customer}, this.config.data.customer);
      this.isNew = false;
    }
  }

  save() {
    this.loading = true;
    if(this.validate()){
      this.customerService.save(this.customer).subscribe({
        next:(res)=>{
          if(this.isNew){
            this.snackbarService.showMessage("Se ha añadido correctamente el Cliente");
          }else{
            this.snackbarService.showMessage("Se ha actualizado el Cliente");
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
    }
  }

  onPersonSelect(event) {

    if(this.customer.managers.filter(e => e.id == event.value.id).length == 0){
      this.customer.managers = [...this.customer.managers, event.value];
    }
  }

  searchPerson($event) {
    if ($event.query != null) {
      this.personService.searchPersonPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = res.map((person) => this.mappingPerson(person));
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  mappingPerson(person: Person): any {
    return {
      field: person.name + ' ' + person.lastname + ' - ' + person.username,
      value: person,
    };
  }

  deleteAssign(person: Person) {
    
    this.customer.managers = this.customer.managers.filter(e => e.id != person.id);
  }

  validate(): boolean {

    if(this.customer.name){
      return true;
    }
    return false;
  }

  closeWindow(){
    
    this.ref.close();
  }
}
