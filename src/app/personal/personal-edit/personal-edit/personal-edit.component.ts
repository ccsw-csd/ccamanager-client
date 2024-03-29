import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Center } from 'src/app/core/models/Center';
import { Province } from 'src/app/core/models/Province';
import { Person } from '../../models/Person';
import { PersonService } from '../../services/person.service';
import { Role } from 'src/app/core/models/Role';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CustomerSimple } from 'src/app/maintenance/customer/models/CustomerSimple';
import { PersonCustomer } from 'src/app/organization/models/PersonCustomer';
import { Customer } from 'src/app/maintenance/customer/models/Customer';


@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.scss'],
  providers:[MessageService]
})
export class PersonalEditComponent implements OnInit {

  personElement: Person;
  roles: Role[]
  provinces: Province[]
  centers: Center[]
  customers: CustomerSimple[];
  customersHidden: CustomerSimple[];
  personCustomersHidden: PersonCustomer[];
  item: any;
  groupPerson: any[] = [];
  personSelected;
  parents: any[] = [];
  personForm: FormGroup;
  requiredField: any = Validators.required;
  loading: boolean;

  actives: any[] = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
    { label: 'Pendiente', value: 2},
  ];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private snackbarService : SnackbarService

  ) {
    this.personForm = this.formBuilder.group({
      id: [''],
      saga: [''],
      username: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email]],
      customers: ['', Validators.required],
      personCustomers: [''],
      grade: ['',[Validators.pattern('^[A-Z][0-9]$')]],
      role: [''],
      hours: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      department: ['', Validators.required],
      manager: [''],
      parents: [''],
      center: ['', Validators.required],
      province: ['', Validators.required],
      active: ['', Validators.required],
      businesscode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = false;
    
    this.personElement = Object.assign({ person: Person }, this.config.data.person);

    this.provinces = this.config.data.provinces;
    this.roles = this.config.data.roles;
    this.centers = this.config.data.centers;
    this.customers = this.config.data.customers.map(item => {return {'id': item.id, 'name': item.name}});

    this.setValuesFormGroup();
    if (this.config.data.person != null){ 
      this.personForm.get('grade').markAsDirty();
      this.whenInformedUsername(this.config.data.person.username);
      this.loadCustomersHidden();
    }
    
    if (this.config.data.person == null || this.config.data.person.id == null) {
      const control = this.personForm.get('customers');
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    }

  }

  setValuesFormGroup(){
    this.personForm.patchValue({
      id: this.personElement.id,
      saga: this.personElement.saga,
      username: this.personElement.username,
      name: this.personElement.name,
      lastname: this.personElement.lastname,
      email: this.personElement.email,
      customers: this.personElement.customers,
      grade: this.personElement.grade,
      role: this.roles.find(role => role.role == this.personElement.role),
      hours: this.personElement.hours ? this.personElement.hours : 8,
      department: this.personElement.department ? this.personElement.department :'CCSw',
      manager: this.personElement.manager,
      parents: this.personElement.parents,
      center: this.personElement.center ? this.personElement.center : this.centers.find(center => center.id == 6),
      province: this.personElement.province,
      active: this.personElement.active != null ? this.personElement.active : 1,
      businesscode: this.personElement.businesscode ? this.personElement.businesscode :'CCA',
      personCustomers: this.personElement.personCustomers
    });
  }

  loadCustomersHidden() {
    this.personService.getPerson(this.config.data.person.id).subscribe({
      next: (res: Person) => {
        this.customersHidden = res.customers.filter( c => !this.config.data.person.customers.some(e => e.id === c.id));
        this.personCustomersHidden = res.personCustomers.filter ( c => !this.config.data.person.customers.some(e => e.id === c.customer.id));
      },
      error: (errorResponse) => {},
      complete:() => {}
    });
  }

  saveItem(person: Person) {
    this.loading = true;

    if (person.customers == null){
      person.personCustomers = [];
    } 
    else {
      person.personCustomers = person.personCustomers.filter(item => person.customers.some(e => e.id === item.customer.id));
      person.customers.filter(item => !person.personCustomers.some(e => e.customer.id === item.id)).forEach( customer => {

        let newPersonCustomer = new PersonCustomer();

        newPersonCustomer.customer = new Customer();                
        newPersonCustomer.customer.id = customer.id;

        person.personCustomers.push(newPersonCustomer);
      });
    }

    person.role = person.role ? person.role['role'] : null;
    person.username = person.username == '' ? null : person.username;
    person.customers = person.customers != null ? person.customers.concat(this.customersHidden) : null;

    if (this.personCustomersHidden != null){
      person.personCustomers = person.personCustomers.concat(this.personCustomersHidden);
    }

    this.personService.save(person).subscribe({
      next: () => {
        this.snackbarService.showMessage('El registro se ha guardado con éxito');
        this.ref.close(true);
      },
      error: (errorResponse) => {
        this.loading = false;
        this.snackbarService.error(errorResponse['message']);
      },
      complete:() => {
        this.loading = false;
      }
    });
  }

  closeWindow() {
    this.ref.close(false);
  }

  showDialog(element?: any) {
    this.item = element;
  }

  searchPerson($event) {
    if ($event.query != null) {
      this.personService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = res.map((person) => this.mappingPerson(person));
        },
        error: () => {},
        complete: () => {}
      });
    }
  }

  mappingPerson(person: Person): any {
    return {
      field: person.name + ' ' + person.lastname + ' - ' + person.username,
      value: person,
    };
  }

  searchParent($event) {
    if ($event.query != null) {
      this.personService.searchPersonPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.parents = res;
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  displayPerson(p : Person): string {
    return `${p.name} ${p.lastname} - ${p.username}`;
  }

  onPersonSelect(event) {
    this.personElement = event.value
    this.setValuesFormGroup();
    this.personForm.get('grade').markAsDirty();
    this.matchByProvince();
  }

  updateFormValidators(){
    const requiredFields = ['saga', 'role'];

    requiredFields.forEach(fieldName => {
      const control = this.personForm.get(fieldName);
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    });

    const gradeValidator = this.personForm.get('grade');
    const emailValidator = this.personForm.get('email');

    gradeValidator.setValidators([Validators.required, Validators.pattern('^[A-Z][0-9]$')])
    gradeValidator.updateValueAndValidity();
    emailValidator.setValidators([Validators.required, Validators.email])
    emailValidator.updateValueAndValidity();
  }

  whenInformedUsername(event){
    if(event != "" && event != null) {
     this.updateFormValidators();
    } else {
      this.resetFormDefaultValidators();
    }
  }

  resetFormDefaultValidators(){
    Object.keys(this.personForm.controls).forEach(key => {
      let control = this.personForm.get(key);
      control.clearValidators();
      control.updateValueAndValidity(); 
    });
    
    const requiredFields = ['name', 'lastname', 'businesscode', 'department', 'center', 'province', 'active', 'hours'];

    requiredFields.forEach(fieldName => {
      const control = this.personForm.get(fieldName);
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    });

    const gradeValidator = this.personForm.get('grade');
    const emailValidator = this.personForm.get('email');

    gradeValidator.setValidators(Validators.pattern('^[A-Z][0-9]$'))
    gradeValidator.updateValueAndValidity();
    emailValidator.setValidators(Validators.email)
    emailValidator.updateValueAndValidity();
  }
  
  matchByProvince(){
    this.personForm.patchValue({province: this.provinces.find(province => province?.province == this.personForm.value.center?.name)});
  }

  getErrorClass(field: string): string {

    if (this.personForm.controls[field].status == 'INVALID') return 'field-error';
    return '';
  }

}