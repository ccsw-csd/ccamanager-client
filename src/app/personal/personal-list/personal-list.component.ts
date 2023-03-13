import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Province } from 'src/app/core/models/Province';
import { ProvinceService } from 'src/app/core/services/province.service';
import { CenterService } from 'src/app/core/services/center.service';
import { RoleService } from 'src/app/core/services/role.service';
import { Person } from '../models/Person';
import { PersonService } from '../services/person.service';
import { Center } from 'src/app/core/models/Center';
import { Role } from 'src/app/core/models/Role';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss'],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    ConfirmationService,
  ],
})
export class PersonalListComponent implements OnInit {
  @ViewChild(Table) table: Table;
  provinces: Province[];
  @ViewChildren('filterDropdown') filterDropdowns!: QueryList<Dropdown>;

  persons: Person[];
  centers: Center[];
  roles: Role[];
  showDropdownFilters: boolean;
  defaultFilters: any;
  totalPersons: number;
  states: any[];
  cols: any[] = [
    {field: 'saga'},
    {field: 'username'},
    {field: 'name'},
    {field: 'lastname'},
    {field: 'customer'},
    {field: 'grade'},
    {field: 'role'},
    {field: 'hours'},
    {field: 'businesscode'},
    {field: 'department'},
    {field: 'manager'},
    {field: 'center.name'},
    {field: 'province.province'},
];

  constructor(
    private ref: DynamicDialogRef,
    private provinceService: ProvinceService,
    private personService: PersonService,
    private centerService: CenterService,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.getAllProvinces();
    this.getAllPersons();
    this.getAllCenters();
    this.getAllRoles();

    this.defaultFilters = {
      active: {
        value: '1',
      },
      department: {
        value: 'CCSw',
      },
    };

    this.states = [
      {label:"Inactivo" ,value:'0'},
      {label:"Activo",value:'1'},
      {label:"Pendiente",value:'2'}
    ];
  }

  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe({
      next: (res: Province[]) => {
        this.provinces = res;
      },
    });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (res: Role[]) => {
        this.roles = res;
      },
    });
  }

  getAllCenters() {
    this.centerService.getAllCenters().subscribe({
      next: (res: Center[]) => {
        this.centers = res;
      },
    });
  }
  
  getAllPersons() {
    this.personService.getAllPersons().subscribe({
      next: (res: Person[]) => {
        this.persons = res;
        this.totalPersons = this.persons.length;
      },
    });
  }

  onClose(): void {
    this.ref.onClose.subscribe((results: any) => {
      this.ngOnInit();
    });
  }

  onFilter(event) {
    this.totalPersons = event.filteredValue.length;
  }

  cleanFilters(): void {
    console.log(this.table)
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    console.log(this.cols)
    this.table.clear();
  }

  closeWindow() {
    this.ref.close();
  }
}
