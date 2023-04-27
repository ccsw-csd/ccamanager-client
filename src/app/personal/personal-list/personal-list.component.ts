import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Province } from 'src/app/core/models/Province';
import { ProvinceService } from 'src/app/core/services/province.service';
import { CenterService } from 'src/app/core/services/center.service';
import { RoleService } from 'src/app/core/services/role.service';
import { Person } from '../models/Person';
import { PersonService } from '../services/person.service';
import { LdapService } from '../services/ldap.service';
import { Center } from 'src/app/core/models/Center';
import { Role } from 'src/app/core/models/Role';
import { Dropdown } from 'primeng/dropdown';
import { ExportService } from 'src/app/core/services/export.service';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { PersonalEditComponent } from '../personal-edit/personal-edit/personal-edit.component';
import { LdapPerson } from '../models/LdapPerson';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss'],
  providers: [
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
    ConfirmationService,
  ],
})
export class PersonalListComponent implements OnInit {
  @ViewChild(Table) table: Table;
  @ViewChildren('filterDropdown') filterDropdowns!: QueryList<Dropdown>;

  provinces: Province[];
  canSynchronize: Boolean = false;
  persons: Person[];
  centers: Center[];
  roles: Role[];
  totalPersons: number;
  states: any[];
  tableWidth: string;
  personsToExport: Person[];
  defaultActive: string;
  defaultFilters: any = {
    active: { value: '1' },
    department: { value: 'CCSw' },
  };

  constructor(
    private provinceService: ProvinceService,
    private personService: PersonService,
    private centerService: CenterService,
    private dialogService: DialogService,
    private roleService: RoleService,
    private exportService: ExportService,
    private navigatorService: NavigatorService,
    private confirmationService: ConfirmationService,
    private snackbarService: SnackbarService,
    private ldapService: LdapService
  ) {}

  ngOnInit(): void {
    this.tableWidth = 'calc(100vw - 55px)';
    this.navigatorService
      .getNavivagorChangeEmitter()
      .subscribe((menuVisible) => {
        if (menuVisible) this.tableWidth = 'calc(100vw - 255px)';
        else this.tableWidth = 'calc(100vw - 55px)';
      });
    
    this.trySynchronize();
    this.getAllProvinces();
    this.getAllPersons();
    this.getAllCenters();
    this.getAllRoles();
    this.defaultActive = '1';

    this.states = [
      { label: 'Inactivo', value: '0' },
      { label: 'Activo', value: '1' },
      { label: 'Pendiente', value: '2' },
    ];
  }

  trySynchronize(){
    this.ldapService.checkPersons().subscribe({
      next: (res: Boolean) => {
        this.canSynchronize = res;
        console.log(res,"result sync")
      },
    });
    this.ldapService.compareLdapToPersons().subscribe({
      next: (res: LdapPerson[]) => {

        console.log(res)
      },
    });

    this.ldapService.comparePersonsToLdap().subscribe({
      next: (res: LdapPerson[]) => {

        console.log(res)
      },
    });
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
    this.exportService.exportPersons(this.personsToExport);
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
        this.personsToExport = this.persons;
      },
    });
  }

  onFilter(event) {
    this.personsToExport = event.filteredValue;
    setTimeout(()=>{
      this.totalPersons = event.filteredValue.length;
    },0);
  }

  setFilters(): void {
    this.defaultActive = '1';
    this.table.filter('CCSw', 'department', 'equals');
    this.table.filter('1', 'active', 'equals');
  }

  cleanFilters(): void {
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    this.table.reset();
    this.setFilters();
    this.table.sortOrder=1;
    this.table.sort({ field: 'lastname', order: this.table.sortOrder});
  }

  editPerson(person?: Person) {
    const ref = this.dialogService.open(PersonalEditComponent, {
      width: '75vh',
      data: {
        person: person,
        provinces: this.provinces,
        roles: this.roles,
        centers: this.centers,
      },
    });

    ref.onClose.subscribe((result: boolean) => {
      if (result) this.getAllPersons();
    });
  }

  deletePerson(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro/a que quieres borrar la persona?',
      accept: () => {
        this.confirmationService.close();
        this.personService.delete(id).subscribe({
          next: () => {
            this.personService.getAllPersons().subscribe((result: any) => {
              this.persons = result;
              this.snackbarService.showMessage(
                'El registro se ha borrado con éxito'
              );
            });
          },
          error: (errorResponse) => {
            this.snackbarService.error(errorResponse['message']);
          },
        });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
