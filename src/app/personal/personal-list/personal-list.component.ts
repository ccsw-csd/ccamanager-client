import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, FilterService } from 'primeng/api';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
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
import { ExportService } from 'src/app/core/services/export.service';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { ColumnConfigComponent } from 'src/app/core/views/column-config/column-config.component';
import { PersonalEditComponent } from '../personal-edit/personal-edit/personal-edit.component';
import { PersonalSynchronizeLdapComponent } from '../personal-synchronize-ldap/personal-synchronize-ldap.component';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss'],
  providers: [DialogService, DynamicDialogConfig, DynamicDialogRef, ConfirmationService]
})
export class PersonalListComponent implements OnInit {

  @ViewChild(Table) table: Table;
  @ViewChildren('filterDropdown') filterDropdowns!: QueryList<Dropdown>;

  isSynchronized: Boolean = false;
  columnNames: any[];
  selectedColumnNames : any[];
  changeCols : boolean = false;
  persons: Person[];
  databaseCenters: Center[];
  databaseProvinces: Province[];
  databaseRoles: Role[];
  totalPersons: number;
  states: any[];
  tableWidth: string;
  personsToExport: Person[];
  defaultFilters: any = {};


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
  ) {}

  ngOnInit(): void {
    this.resizeTable();
    this.navigatorService.getNavivagorChangeEmitter().subscribe((menuVisible) => {
      if (menuVisible) this.tableWidth = 'calc(100vw - 255px)';
      else this.tableWidth = 'calc(100vw - 55px)';
    });

    this.trySynchronize();
    this.getAllProvinces();
    this.getAllPersons();
    this.getAllCenters();
    this.getAllRoles();

    this.states = [
      { label: 'Inactivo', value: '0' },
      { label: 'Activo', value: '1' },
      { label: 'Pendiente', value: '2' }
    ];

    this.columnNames = [
      { header: 'Saga', composeField: 'saga', field: 'saga', filterType: 'input' },
      { header: 'Username', composeField: 'username', field: 'username', filterType: 'input' },
      { header: 'Nombre', composeField: 'name', field: 'name', filterType: 'input' },
      { header: 'Apellidos', composeField: 'lastname', field: 'lastname', filterType: 'input' },
      { header: 'Cliente', composeField: 'customer', field: 'customer', filterType: 'input' },
      { header: 'Grado', composeField: 'grade', field: 'grade', filterType: 'input' },
      { header: 'Rol', composeField: 'role', field: 'role', filterType: 'dropdown', options:[], optionLabel: 'role' },
      { header: 'Horas', composeField: 'hours', field: 'hours', filterType: 'input' },
      { header: 'Práctica', composeField: 'businesscode', field: 'businesscode', filterType: 'input' },
      { header: 'Dpto', composeField: 'department', field: 'department', filterType: 'input' },
      { header: 'Evaluador', composeField: 'manager', field: 'manager', filterType: 'input' },
      { header: 'Oficina', composeField: 'center.name', field: 'center', fieldExtra: 'name', filterType: 'dropdown', options:[], optionLabel: 'name' },
      { header: 'Localización', composeField: 'province.province', field: 'province', fieldExtra: 'province', filterType: 'dropdown', options:[], optionLabel: 'province' },
      { header: 'Estado', composeField: 'active', field: 'active', filterType: 'multiple', options: this.states, optionLabel: 'active', initialValue: ['1'], parse:(value: number): string => {return this.states.find((state) => state.value === value.toString())?.label} }
    ];
    this.selectedColumnNames = this.loadSelected();

  }

  onColReorder(event): void {
    this.saveSelected(this.selectedColumnNames);
  }

  loadSelected(): any[] {
    let selectedColumnNames: any = localStorage.getItem('personListColumns');
    if (selectedColumnNames == null) return this.columnNames;

    selectedColumnNames = JSON.parse(selectedColumnNames);

    let columns : any[] = [];
    selectedColumnNames.forEach(item => {
      let filterColumn = this.columnNames.filter(column => column.header == item);
      columns = columns.concat(filterColumn);
    });

    return columns;
  }

  saveSelected(selectedColumnNames: any[]) {    
    localStorage.setItem('personListColumns', JSON.stringify(selectedColumnNames.map(e => e.header)));
  }

  isColumnVisible(field: string): boolean {
    return this.selectedColumnNames.some(column => column.field === field);
  }

  showConfig(){
    const ref = this.dialogService.open(ColumnConfigComponent, {
      width: '50vw',
      data: {
        columns: this.columnNames,
        selected: this.selectedColumnNames
      },
      closable: false,
      showHeader: true,
      autoZIndex: true,
      header: "Configuracion de la tabla"
    });

    ref.onClose.subscribe((result: any) => {
      if(result) {
        this.selectedColumnNames = result;
        this.saveSelected(result);
      }
    });
  }

  resizeTable() {
    if (document.getElementById('p-slideMenu')) {
      this.tableWidth = 'calc(100vw - 255px)';
    } else {
      this.tableWidth = 'calc(100vw - 55px)';
    }
  }

  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe({
      next: (res: Province[]) => {

        this.databaseProvinces = res;
        this.columnNames.filter(item => item.field == 'province')[0].options = res.concat({id:0, province:'-- Vacía --'});
      }
    });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (res: Role[]) => {
        this.databaseRoles = res;
        this.columnNames.filter(item => item.field == 'role')[0].options = res.concat({id:0, role:'-- Vacío --'});
      }
    });
  }

  getAllCenters() {
    this.centerService.getAllCenters().subscribe({
      next: (res: Center[]) => {
        this.databaseCenters = res;
        this.columnNames.filter(item => item.field == 'center')[0].options = res.concat({id:0, name:'-- Vacío --'});
      }
    });
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe({
      next: (res: Person[]) => {
        this.persons = res;
        this.totalPersons = this.persons.length;
        this.personsToExport = this.persons;
        this.setFilters();
      }
    });
  }

  exportExcel() {
    this.exportService.exportPersons(this.personsToExport);
  }

  onFilter(event) {
    this.personsToExport = event.filteredValue;
    setTimeout(() => {
      this.totalPersons = event.filteredValue.length;
    }, 0);
  }

  setFilters(): void {
    this.defaultFilters.department.value='CCSw'
    this.defaultFilters.active.value=['1'];

  }

  cleanFilters(): void {
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    this.table.reset();
    this.setFilters();
    this.table.sortOrder = 1;
    this.table.sort({ field: 'lastname', order: this.table.sortOrder });
  }

  editPerson(person?: Person) {
    let header = person ? 'Modificar Persona' : 'Nueva Persona';
    const ref = this.dialogService.open(PersonalEditComponent, {
      width: '50vw',
      data: {
        person: person,
        provinces: this.databaseProvinces,
        roles: this.databaseRoles,
        centers: this.databaseCenters,
      },
      closable: false,
      showHeader: true,
      header: header,
    });

    ref.onClose.subscribe((result: boolean) => {
      if (result) this.getAllPersons();
    });
  }

  deletePerson(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro/a que quieres borrar la persona?',
      rejectButtonStyleClass: 'p-button p-button-secondary p-button-outlined',
      acceptIcon: 'false',
      rejectIcon: 'false',      
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
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  trySynchronize(){
    this.personService.checkPersons().subscribe({
      next: (res: Boolean) => {
        this.isSynchronized = res;
      }
    });
  }

  synchronizeLdap(){
    const ref = this.dialogService.open(PersonalSynchronizeLdapComponent, {
        width:"70vw",
        height:"90vh",
        showHeader:true,
        closable: false,
        header:'Sincronizar LDAP'
    });
  }
}
