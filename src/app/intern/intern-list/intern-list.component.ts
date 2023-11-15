import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ExportService } from 'src/app/core/services/export.service';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Action } from 'src/app/core/models/Action';
import { Center } from 'src/app/core/models/Center';
import { Province } from 'src/app/core/models/Province';
import { ActionService } from 'src/app/core/services/action.service';
import { CenterService } from 'src/app/core/services/center.service';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { ProvinceService } from 'src/app/core/services/province.service';
import { TranslateService } from 'src/app/core/services/translate.service';
import { EducationCenter } from 'src/app/maintenance/education-center/models/EducationCenter';
import { EducationCenterService } from 'src/app/maintenance/education-center/services/education-center.service';
import { Education } from 'src/app/maintenance/education/models/Education';
import { EducationService } from 'src/app/maintenance/education/services/education.service';
import { Level } from 'src/app/maintenance/english-level/models/Level';
import { LevelService } from 'src/app/maintenance/english-level/services/level.service';
import { Technology } from 'src/app/maintenance/technology/models/Technology';
import { TechnologyService } from 'src/app/maintenance/technology/services/technology.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Intern } from '../models/Intern';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { InternService } from '../services/intern.service';
import { InternEditComponent } from '../intern-edit/intern-edit.component';
import { InternTimelineComponent } from '../intern-timeline/intern-timeline.component';
import { PersonService } from 'src/app/personal/services/person.service';
import { InternSynchronizeLdapComponent } from '../intern-synchronize-ldap/intern-synchronize-ldap/intern-synchronize-ldap.component';
import { ColumnConfigComponent } from 'src/app/core/views/column-config/column-config.component';

@Component({
  selector: 'app-intern-list',
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, ConfirmationService]
})
export class InternListComponent implements OnInit, AfterViewInit {

  @ViewChild(Table) table: Table;
  @ViewChildren('filterDropdown') filterDropdowns!: QueryList<Dropdown>;
  @ViewChildren('filterCalendar') filterCalendars!: QueryList<Calendar>;

  isSynchronized: Boolean = false;
  columnNames: any[];
  selectedColumnNames : any[];
  selectedDate: Date;
  interns: Intern[];
  internsForExcel: Intern[];

  databaseEducations: Education[];
  databaseEducationsCenter: EducationCenter[];
  databaseCenters: Center[];
  databaseProvinces: Province[];
  databaseEnglishLevels: Level[];
  databaseActions: Action[];
  databaseTechnologies: Technology[];

  genders: any[] = [
    { label: 'Otros', value: '0' },
    { label: 'Mujer', value: '1' },
    { label: 'Hombre', value: '2' },
    { label: '-- Vacío --', value: '-1' },
  ];
  states: any[] = [
    { label: 'Inactivo', value: '0' },
    { label: 'Activo', value: '1' },
    { label: 'Pendiente', value: '2'},
  ];

  defaultFilters: any = { };
  internsLength: number;
  es: any;
  tableWidth: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private navigatorService: NavigatorService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private confirmationService:ConfirmationService,
    private snackbarService:SnackbarService,
    private exportService:ExportService,
    private translateService: TranslateService,
    private internService: InternService,
    private educationService: EducationService,
    private educationCenterService: EducationCenterService,
    private centerService: CenterService,
    private provinceService: ProvinceService,
    private levelService: LevelService,
    private actionService: ActionService,
    private technologyService: TechnologyService,
    private personService: PersonService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.resizeTable();
    this.navigatorService.getNavivagorChangeEmitter().subscribe(menuVisible => {
      if (menuVisible) this.tableWidth = 'calc(100vw - 255px)';
      else this.tableWidth = 'calc(100vw - 55px)';
    });
    
    this.getAllInterns(true);
    this.getAllEducations();
    this.getAllEducationCenters();
    this.getAllCenters();
    this.getAllProvinces();
    this.getAllLevels();
    this.getAllActions();
    this.getAllTechnologies();

    this.primengConfig.setTranslation(this.translateService.getSpanish());

    this.filterService.register('valueInArray', (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.some((t) => t.name === filter);
    });

    
    this.columnNames = [
      { header: 'Periodo', composeField: 'period',field: 'period', filterType: 'input' },
      { header: 'Username', composeField: 'username',field: 'username', filterType: 'input' },
      { header: 'Nombre', composeField: 'name',field: 'name', filterType: 'input' },
      { header: 'Apellidos', composeField: 'lastname',field: 'lastname', filterType: 'input' },
      { header: 'Género', composeField: 'gender',field: 'gender', filterType: 'dropdown', matchMode: 'equals-and-null', options:this.genders, optionLabel: 'label', optionValue: 'value', parse:(value: number): string => {return this.genders.find((gender) => gender.value === value?.toString())?.label;} },
      { header: 'Titulación', composeField: 'education.name',field: 'education', fieldExtra: 'name', filterType: 'dropdown', matchMode: 'equals-and-null', options:[], optionLabel: 'name' },
      { header: 'Centro', composeField: 'educationCenter.name',field: 'educationCenter', fieldExtra: 'name', filterType: 'dropdown', matchMode: 'equals-and-null', options:[], optionLabel: 'name', parse:(educationCenter?: EducationCenter): string => { return educationCenter ? ('[' + educationCenter?.type + '] ' + educationCenter?.name) : '' } },
      { header: 'Oficina', composeField: 'center.name',field: 'center', fieldExtra: 'name', filterType: 'dropdown', matchMode: 'equals-and-null', options:[], optionLabel: 'name' },
      { header: 'Localización', composeField: 'province.province',field: 'province', fieldExtra: 'province', filterType: 'dropdown',  matchMode: 'equals-and-null', options:[], optionLabel: 'province' },
      { header: 'Inicio', composeField: 'startDate',field: 'startDate', filterType: 'date', isDate: true, matchMode: 'dateAfter' },
      { header: 'Fin', composeField: 'endDate',field: 'endDate', filterType: 'date', isDate: true, matchMode: 'dateBefore' },
      { header: 'Horas', composeField: 'hours',field: 'hours', filterType: 'input' },
      { header: 'Cliente', composeField: 'customer',field: 'customer', filterType: 'input' },
      { header: 'Código', composeField: 'code',field: 'code', filterType: 'input' },
      { header: 'Tecnologías', composeField: 'technologies',field: 'technologies', filterType: 'dropdown',  matchMode: 'array-and-null', options:[], optionLabel: 'name', parse:(techs: Technology[]): string => {return techs.map((t) => t.name).join(', ')} },
      { header: 'Inglés', composeField: 'englishLevel.name',field: 'englishLevel', fieldExtra: 'name', filterType: 'dropdown',  matchMode: 'equals-and-null', options:[], optionLabel: 'name' },
      { header: 'Mentor', composeField: 'mentor',field: 'mentor', filterType: 'input' },
      { header: 'Coordinador', composeField: 'coordinator',field: 'coordinator', filterType: 'input' },
      { header: 'Resp. RRHH', composeField: 'hrManager',field: 'hrManager', filterType: 'input' },
      { header: 'Acción', composeField: 'action.name',field: 'action', fieldExtra: 'name', filterType: 'dropdown',  matchMode: 'equals-and-null', options:[], optionLabel: 'name' },
      { header: 'F.Contrato', composeField: 'contractDate',field: 'contractDate', filterType: 'date', isDate: true, matchMode: 'dateAfter' },
      { header: 'Saga', composeField: 'saga',field: 'saga', filterType: 'input' },
      { header: 'Estado', composeField: 'active', field: 'active', filterType: 'multiple', options: this.states, optionLabel: 'active', initialValue: ['1'], parse:(value: number): string => {return this.states.find((state) => state.value === value.toString())?.label} }
    ];
    this.selectedColumnNames = this.loadSelected();
  }

  onColReorder(event): void {
    this.saveSelected(this.selectedColumnNames);
  }

  loadSelected(): any[] {
    let selectedColumnNames: any = localStorage.getItem('internListColumns');
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
    localStorage.setItem('internListColumns', JSON.stringify(selectedColumnNames.map(e => e.header)));
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

  resizeTable(){
    if(document.getElementById("p-slideMenu")){
      this.tableWidth = 'calc(100vw - 255px)';
    }else{
      this.tableWidth = 'calc(100vw - 55px)';
    }
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.setDefaultOrders();
    },0);
  }

  setDefaultOrders(){
    this.table.sortField='endDate';
    this.table.sort({field: this.table.sortField,order:-1});
  }

  setDefaultFilters(){
    this.defaultFilters.active.value=['1'];
  }

  getAllInterns(defaultFilters : boolean) {
    this.internService.getAllInterns().subscribe({
      next: (res: Intern[]) => {
        this.interns = res;
        this.internsForExcel = res;
        this.internsLength = this.interns.length;
        this.interns.forEach((element) => {
          if (element.startDate) {
            element.startDate = new Date(element.startDate);
          }
          if (element.endDate) {
            element.endDate = new Date(element.endDate);
          }
          if (element.contractDate) {
            element.contractDate = new Date(element.contractDate);
          }
        });

        if (defaultFilters) this.setDefaultFilters();
      }
    });
  }

  getAllTechnologies() {
    this.technologyService.findAll().subscribe({
      next: (res: Technology[]) => {
        this.databaseTechnologies = res;
        this.columnNames.filter(item => item.field == 'technologies')[0].options = res.concat({id:0, name:'-- Vacío --'});
      }
    });
  }

  getAllEducations() {
    this.educationService.findAll().subscribe({
      next: (res: Education[]) => {
        this.databaseEducations = res;
        this.columnNames.filter(item => item.field == 'education')[0].options = res.concat({id:0, name:'-- Vacío --'});
      }
    });
  }

  getAllEducationCenters() {
    this.educationCenterService.getAllEducationCentersSimple().subscribe({
      next: (res: EducationCenter[]) => {
        this.databaseEducationsCenter = res;
        this.columnNames.filter(item => item.field == 'educationCenter')[0].options = res.concat({id:0, name:'-- Vacío --',type:'',province:null});
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

  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe({
      next: (res: Province[]) => {
        this.databaseProvinces = res;
        this.columnNames.filter(item => item.field == 'province')[0].options = res.concat({id:0, province:'-- Vacía --'});
      }
    });
  }

  getAllLevels() {
    this.levelService.getAllLevels().subscribe({
      next: (res: Level[]) => {
        this.databaseEnglishLevels = res;
        this.columnNames.filter(item => item.field == 'englishLevel')[0].options = res.concat({id:0, name:'-- Vacío --'});
      },
    });
  }
  
  getAllActions() {
    this.actionService.getAllActions().subscribe({
      next: (res: Action[]) => {
        this.databaseActions = res;
        this.columnNames.filter(item => item.field == 'action')[0].options = res.concat({id:0, name:'-- Vacío --'});
      },
    });
  }

  showTimeLine(){
    this.ref = this.dialogService.open(InternTimelineComponent,{
      width:"66vw",
      height:"89vh",
      closable:false,
      showHeader:true,
      contentStyle: {'overflow': 'hidden'},
      header:'TimeLine Becarios'
    });
  }

  addComment(intern:Intern) {
    this.ref = this.dialogService.open(DialogComponent, {
      width: '600px',
      data: {
        action: 'Comment',
        value: intern.comment
      },
      closable: false,
      showHeader: true,
      header:'Comment'
    });

    this.ref.onClose.subscribe((res) => {
      if(res!=null && res!=''){
        intern.comment = res;
        this.internService.save(intern).subscribe({
          next: (result)=>{
            this.snackbarService.showMessage("Se ha añadido actualizado el Comentario");
          },
          error:(error)=>{
            this.snackbarService.error(error.message);
          }
        });
      }
    });
  }

  addLink(intern:Intern) {
    this.ref = this.dialogService.open(DialogComponent, {
      width: '600px',
      data: {
        action: 'Link',
        value: intern.link,
      },
      closable: false,
      showHeader: true,
      header:'Link'
    });

    this.ref.onClose.subscribe((res) => {
      if(res!=null && res!='') {
        intern.link = res;
        this.internService.save(intern).subscribe({
          next:(result)=>{
            this.snackbarService.showMessage("Se ha añadido actualizado el Link");
          },
          error:(error)=>{
            this.snackbarService.error(error.message);
          }
        });
      }
    });
  }

  onFilter(event) {
    this.internsForExcel = event.filteredValue;
    setTimeout(()=>{
      this.internsLength = event.filteredValue.length;
    },0);
  }

  exportExcel() {
    let sendIntern = this.internsForExcel.map((intern) => {
      return {
        Periodo: intern.period,
        Username: intern.username,
        Nombre: intern.name,
        Apellidos: intern.lastname,
        Genero: this.showGender(intern.gender),
        Titulacion: intern.education?.name,
        Centro: intern.educationCenter?.name,
        Oficina: intern.center?.name,
        Inicio: intern.startDate,
        Fin: intern.endDate,
        Horas: intern.hours,
        Cliente: intern.customer,
        Codigo: intern.code,
        Tecnologias: this.showAllTech(intern.technologies),
        Ingles: intern.englishLevel?.name,
        Mentor: intern.mentor,
        Coordinador: intern.coordinator,
        RRHH: intern.hrManager,
        Accion: intern.action?.name,
        Contrato: intern.contractDate,
        Activo: this.showActive(intern.active),
        Link: intern.link,
        Comentario: intern.comment,
      };
    });
    this.exportService.exportInterns(sendIntern);
  }

  showGender(value: number): string {    
    if (value == null || value == undefined) return '';

    return this.genders.find((gender) => gender.value === value?.toString())?.label;
  }

  showAllTech(techs: Technology[]): string {
    return techs.map((t) => t.name).join(', ');
  }

  showActive(value: number): string {
    return this.states.find((active) => active.value === value.toString())?.label;
  }

  cleanFilters(): void {
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    this.filterCalendars.forEach((calendar) => {
      calendar.inputFieldValue = "";
      calendar.value = null;
      calendar.updateInputfield();
    });
    this.table.reset();
    this.setDefaultFilters();
    this.setDefaultOrders();
  }

  addOrEditIntern(intern?:Intern) {
    let header = intern ? 'Modificar Becario' : 'Nuevo Becario';
    this.ref = this.dialogService.open(InternEditComponent,{
      width:'75vw',
      data:{
        intern: intern,
        educations:this.databaseEducations,
        educationsCenter:this.databaseEducationsCenter,
        centers:this.databaseCenters,
        provinces:this.databaseProvinces,
        technologies:this.databaseTechnologies,
        actions:this.databaseActions,
        englishLevels:this.databaseEnglishLevels,
      },
      closable:false,
      showHeader: true,
      header: header
    });
    this.onClose();
  }

  onClose(): void {
    this.ref.onClose.subscribe((results: any) => {
      this.getAllInterns(false);
    });
  }

  delete(id:number) {
    this.confirmationService.confirm({
      message:'¿Deseas borrar el Becario?',
      rejectButtonStyleClass: 'p-button p-button-secondary p-button-outlined',
      acceptIcon: 'false',
      rejectIcon: 'false',      
      accept:()=>{
        this.confirmationService.close()
        this.internService.delete(id).subscribe({
          next:()=>{
            this.snackbarService.showMessage("Se ha eliminado correctamente el Centro de Educacion");
            this.getAllInterns(false);
          },
          error:(errorResponse)=>{
            this.snackbarService.error(errorResponse.message);
          } 

        });
      },
      reject:() => {
        this.confirmationService.close();
      }
    });
  }

  trySynchronize() {
    this.personService.checkInterns().subscribe({
      next: (res: Boolean) => {
        this.isSynchronized = res;
      },
    });
  }

  synchronizeLdap() {
    const ref = this.dialogService.open(InternSynchronizeLdapComponent, {
        width:"70vw",
        height:"90vh",
        showHeader:true,
        closable: false,
        header: 'Sincronizar LDAP'
    });
  }

}