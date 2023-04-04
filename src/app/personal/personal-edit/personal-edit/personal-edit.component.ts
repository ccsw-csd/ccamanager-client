import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Center } from 'src/app/core/models/Center';
import { Province } from 'src/app/core/models/Province';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Person } from '../../models/Person';
import { PersonService } from '../../services/person.service';
import { Role } from 'src/app/core/models/Role';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



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
  item: any;
  groupPerson: any[] = [];
  personSelected;
  personForm: FormGroup;


  actives: any[] = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
    { label: 'Pendiente', value: 2},
  ];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private personService: PersonService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder

  ) {
    this.personForm = this.formBuilder.group({
      saga: ['', Validators.required],
      username: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      customer: ['', Validators.required],
      grade: ['', Validators.required],
      role: ['', Validators.required],
      hours: ['', Validators.required],
      department: ['', Validators.required],
      manager: [''],
      center: ['', Validators.required],
      province: ['', Validators.required],
      active: ['', Validators.required],
      businesscode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.personElement = Object.assign({ person: Person }, this.config.data.person)
    this.provinces = this.config.data.provinces 
    this.roles = this.config.data.roles 
    this.centers=  this.config.data.centers
    this.personElement.active = 1;
  }

  saveItem(person: Person) {
    person.role = person.role['role'];
    this.personService.save(person).subscribe({
      next: () => {
        this.snackbarService.showMessage(
          'El registro se ha guardado con éxito'
        );
        this.ref.close(true);
      },
      error: (errorResponse) => {
        this.snackbarService.error(errorResponse['message']);
      },
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
        complete: () => {},
      });
    }
  }

  mappingPerson(person: Person): any {
    let username  =  person.username ? person.username : "Añadir nueva persona";
    return {
      field: person.name + ' ' + person.lastname + ' - ' + username,
      value: person,
    };
  }

  onPersonSelect(event) {
    this.personElement = event.value
    this.personForm.patchValue({
      saga: this.personElement.saga,
      username: this.personElement.username,
      name: this.personElement.name,
      lastname: this.personElement.lastname,
      email: this.personElement.email,
      customer: this.personElement.customer,
      grade: this.personElement.grade,
      role: this.personElement.role,
      hours: this.personElement.hours,
      department: this.personElement.department,
      manager: this.personElement.manager,
      center: this.personElement.center ? this.personElement.center : this.centers.find(center => center.id == 6),
      province: this.personElement.province,
      active: this.personElement.active,
      businesscode: this.personElement.businesscode
    });

    this.matchByProvince();
  }
  
  matchByProvince(){
    this.personElement.province = this.provinces.find(province => province.province == this.personElement.center.name);
  }

  showForm(){
    console.log(this.personForm.value)
  }

}