import {AfterViewInit, Component,OnInit,QueryList,ViewChild,ViewChildren} from '@angular/core';
import { ExportService } from 'src/app/core/services/export.service';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { InternService } from '../services/intern.service';

@Component({
  selector: 'app-intern-list',
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.scss'],
  providers: [DialogService, DynamicDialogRef],
})
export class InternListComponent implements OnInit,AfterViewInit {
  @ViewChild(Table) table: Table;
  @ViewChildren('filterDropdown') filterDropdowns!: QueryList<Dropdown>;
  @ViewChildren('filterCalendar') filterCalendars!: QueryList<Calendar>;
  selectedActive:string;
  selectedDate:Date;
  interns: Intern[];
  internsForExcel: Intern[];
  educations: Education[];
  educationsCenter: EducationCenter[];
  centers: Center[];
  provinces: Province[];
  englishLevels: Level[];
  actions: Action[];
  technologies: Technology[];
  genders: any[] = [
    { label: 'Otros', value: 0 },
    { label: 'Mujer', value: 1 },
    { label: 'Hombre', value: 2 },
  ];
  actives: any[] = [
    { label: 'Inactivo', value: '0' },
    { label: 'Activo', value: '1' },
    { label: 'Pendiente', value: '2'},
  ];
  defaultFilters: any = { active: { value: '1' } };
  internsLength: number;
  es: any;
  tableWidth: string = 'calc(100vw - 50px)';
  constructor(
    private primengConfig: PrimeNGConfig,
    private navigatorService: NavigatorService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
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
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.selectedActive="1";
    this.navigatorService
      .getNavivagorChangeEmitter()
      .subscribe((menuVisible) => {
        if (menuVisible) this.tableWidth = 'calc(100vw - 250px)';
        else this.tableWidth = 'calc(100vw - 50px)';
      });
    this.getAllInterns();
    this.getAllEducations();
    this.getAllEducationCenters();
    this.getAllCenters();
    this.getAllProvinces();
    this.getAllLevels();
    this.getAllActions();
    this.getAllTechnologies();
    this.primengConfig.setTranslation(this.translateService.getSpanish());
    this.filterService.register('valueInArray', (value, filter): boolean => {
      //TODO esto revisalo que seguro que hay uno para hacerlo
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.some((t) => t.name === filter);
    });
  }

  ngAfterViewInit(){
    this.setDefaultOrders();
  }

  setDefaultOrders(){
    this.table.sortField='endDate';
    this.table.sort({field: 'endDate',order:-1});
  }
  setDefaultFilters(){
    this.selectedActive='1';
    this.table.filter(this.selectedActive,'active','contains');
  }

  getAllInterns() {
    this.internService.getAllInterns().subscribe({
      next: (res: Intern[]) => {
        this.interns = res;
        console.log(res);
        this.internsForExcel = res;
        this.internsLength = res.length;
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
      },
    });
  }

  getAllTechnologies() {
    this.technologyService.findAll().subscribe({
      next: (res: Technology[]) => {
        this.technologies = res;
      },
    });
  }

  getAllEducations() {
    this.educationService.findAll().subscribe({
      next: (res: Education[]) => {
        this.educations = res;
      },
    });
  }

  getAllEducationCenters() {
    this.educationCenterService.getAllEducationCenters().subscribe({
      next: (res: EducationCenter[]) => {
        this.educationsCenter = res;
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

  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe({
      next: (res: Province[]) => {
        this.provinces = res;
      },
    });
  }

  getAllLevels() {
    this.levelService.getAllLevels().subscribe({
      next: (res: Level[]) => {
        this.englishLevels = res;
      },
    });
  }
  
  getAllActions() {
    this.actionService.getAllActions().subscribe({
      next: (res: Action[]) => {
        this.actions = res;
      },
    });
  }

  addCommentOrLink(type: string, value?: string) {
    this.ref = this.dialogService.open(DialogComponent, {
      height: '420px',
      width: '600px',
      data: {
        action: type,
        value: value,
      },
      closable: false,
      showHeader: false,
    });
    this.onClose();
  }

  onClose(): void {
    this.ref.onClose.subscribe((results: any) => {
      this.getAllInterns();
    });
  }

  showAllTech(techs: Technology[]): string {
    return techs.map((t) => t.name).join(', ');
  }

  onFilter(event) {

    this.internsForExcel = event.filteredValue;
    this.internsLength = event.filteredValue.length;
  }

  exportExcel(){

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
    return this.genders.find((gender) => gender.value === value)?.label;
  }

  showActive(value: number): string {
    return this.actives.find((active) => active.value === value.toString())?.label;
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

}
