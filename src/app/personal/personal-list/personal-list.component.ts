import { Component, OnInit,ViewChild,ViewChildren,QueryList } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Province } from 'src/app/core/models/Province';
import { ProvinceService } from 'src/app/core/services/province.service';
import { CenterService } from 'src/app/core/services/center.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { RoleService } from 'src/app/core/services/role.service';
import { Person } from '../models/Person';
import { PersonService } from '../services/person.service';
import { Center } from 'src/app/core/models/Center';
import { Person_role } from 'src/app/core/models/Person_role';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
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
  roles: Person_role[];
  showDropdownFilters: boolean;
  defaultFilters: any;

  cols: any[];

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
      'active': {
        'value': '1'
      },
      'department': {
        'value': 'CCSw'
      }
    };
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
      next: (res: Person_role[]) => {
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
      },
    });
  }
  
  

  onClose(): void {
    this.ref.onClose.subscribe((results: any) => {
      this.ngOnInit();
    });
  }

  cleanFilters(): void {
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    this.table.clear();
  }

  downloadPersons() {
    const worksheet = XLSX.utils.json_to_sheet(this.persons);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    FileSaver.saveAs(data, 'persons.xlsx');
  }

  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    var a: any = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'Report.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  closeWindow() {
    this.ref.close();
  }
}
