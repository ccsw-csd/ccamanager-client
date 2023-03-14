import {Component,OnInit,ViewChild,ViewChildren,QueryList } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import {DialogService,DynamicDialogConfig,DynamicDialogRef } from 'primeng/dynamicdialog';
import { Province } from 'src/app/core/models/Province';
import { ProvinceService } from 'src/app/core/services/province.service';
import { CenterService } from 'src/app/core/services/center.service';
import { RoleService } from 'src/app/core/services/role.service';
import { Person } from '../models/Person';
import { PersonService } from '../services/person.service';
import { Center } from 'src/app/core/models/Center';
import { Role } from 'src/app/core/models/Role';
import { Dropdown } from 'primeng/dropdown';
import * as FileSaver from 'file-saver';

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
 
  constructor(
    private ref: DynamicDialogRef,
    private provinceService: ProvinceService,
    private personService: PersonService,
    private centerService: CenterService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAllProvinces();
    this.getAllPersons();
    this.getAllCenters();
    this.getAllRoles();

    this.defaultFilters = {
      active: {
        value: '1'
      },
      department: {
        value: 'CCSw'
      }
    };

    this.states = [
      { label: 'Inactivo', value: '0' },
      { label: 'Activo', value: '1' },
      { label: 'Pendiente', value: '2' }
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

  exportExcel() {

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.persons.map(person => {
        return {
          saga:person.saga,
          username:person.username,
          nombre:person.name,
          apellidos:person.lastname,
          cliente:person.customer,
          grado:person.grade,
          rol:person.role,
          horas:person.hours,
          practica:person.businesscode,
          department: person.department,
          evaluador: person.manager,
          oficina:person.center?.name,
          provincia:person.province?.province,
          estado:person.active          
        };
      }));
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'persons');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  getAllCenters() {
    this.centerService.getAllCenters().subscribe({
      next: (res: Center[]) => {
        this.centers = res;
      }
    });
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe({
      next: (res: Person[]) => {
        this.persons = res;
        this.totalPersons = this.persons.length;
      }
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
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    this.table.clear();
  }

  closeWindow() {
    this.ref.close();
  }
}
