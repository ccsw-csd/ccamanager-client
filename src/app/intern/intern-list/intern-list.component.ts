import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as FileSaver from 'file-saver';
//import moment from 'moment-timezone';
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
import { EducationCenter } from 'src/app/maintenance/education-center/models/EducationCenter';
import { EducationCenterService } from 'src/app/maintenance/education-center/services/education-center.service';
import { Education } from 'src/app/maintenance/education/models/Education';
import { EducationService } from 'src/app/maintenance/education/services/education.service';
import { Level } from 'src/app/maintenance/english-level/models/Level';
import { LevelService } from 'src/app/maintenance/english-level/services/level.service';
import { Technology } from 'src/app/maintenance/technology/models/Technology';
import { TechnologyService } from 'src/app/maintenance/technology/services/technology.service';
import { InternButtonsComponent } from '../intern-buttons/intern-buttons.component';
import { Intern } from '../models/Intern';
import { InternService } from '../services/intern.service';

@Component({
  selector: 'app-intern-list',
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.scss'],
  providers: [DialogService, DynamicDialogRef],
})
export class InternListComponent implements OnInit {
  @ViewChild(Table) table: Table;
  @ViewChildren('filterDropdown') filterDropdowns!: QueryList<Dropdown>;
  @ViewChildren('filterCalendar') filterCalendars!: QueryList<Calendar>;

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
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
    { label: 'Pendiente', value: 2 },
  ];
  defaultFilters:any ={active:{value:'1'}};
  internsLength: number;
  es: any;
  tableWidth: string = 'calc(100vw - 50px)';
  cols = {
    period: 'flex flex-none w-7rem ',
    username: 'flex flex-none w-10rem ',
    name: 'flex flex-none w-15rem',
    lastname: 'flex flex-none w-15rem',
    gender: 'flex flex-none w-15rem',
    education: 'flex flex-none w-17rem',
    educationCenter: 'flex flex-none w-18rem',
    center: 'flex flex-none w-15rem',
    province: 'flex flex-none w-15rem',
    startDate: 'flex flex-none w-12rem',
    endDate: 'flex flex-none w-12rem',
    hours: 'flex flex-none w-6rem',
    customer: 'flex flex-none w-10rem',
    code: 'flex flex-none w-6rem',
    technologies: 'flex flex-none w-12rem',
    englishLevel: 'flex flex-none w-12rem',
    mentor: 'flex flex-none w-18rem',
    coordinator: 'flex flex-none w-18rem',
    rrhh: 'flex flex-none w-10rem',
    action: 'flex flex-none w-16rem',
    contractDate: 'flex flex-none w-12rem',
    active: 'flex flex-none w-12rem',
    buttons: 'flex flex-none w-10rem align-items-center justify-content-center',
  };
  constructor(
    private primengConfig: PrimeNGConfig,
    private navigatorService: NavigatorService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
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

    this.es = {
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    };
    this.primengConfig.setTranslation(this.es);
    this.filterService.register('valueInArray', (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }
      return value.some((t) => t.name === filter);
    });
    this.filterService.register('compareDate', (value, filter): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      this.show(value);
      this.show(filter);
      // if (typeof filter === 'string') {
      //   filter = this.parseDateFromString(filter);
      // }
      return (
        value.getFullYear() === filter.getFullYear() &&
        value.getMonth() === filter.getMonth() &&
        value.getDate() === filter.getDate()
      );
    });
  }
  // parseDateFromString(dateString: string): Date {
  //   const momentDate = moment(dateString, 'DD/MM/YYYY');
  //   return momentDate.toDate();
  // }

  getAllInterns() {
    this.internService.getAllInterns().subscribe({
      next: (res: Intern[]) => {
        this.interns = res;
        this.internsForExcel = res;
        this.internsLength = res.length;
        this.show(res);
        this.interns.forEach((element) => {
          if (element.startDate) {
            //this.show("Before:"+element.startDate);
            element.startDate = this.parseStringIsoToDate(element.startDate);
            //this.show("After:"+element.startDate);
          }

          if (element.endDate) {
            element.endDate = this.parseStringIsoToDate(element.endDate);
          }
          if (element.contractDate) {
            element.contractDate = this.parseStringIsoToDate(element.contractDate);
          }
        });
      },
    });
  }
  // convertToBrowserTimezone(dateStr: any): Date {

  //   const utcMoment = moment(dateStr);
  //   //this.show(utcMoment.toDate());
  //   //const timeZone = moment.tz.guess();
  //   const localMoment = utcMoment.tz("Europe/Madrid");
  //   const localDate = localMoment.toDate();
  //   //this.show(localMoment.toDate());
  //   return localDate;
  // }
  parseStringIsoToDate(dateString: any): Date {
    const isoString = dateString.replace(' ', 'T');
    return new Date(isoString);
  }

  getAllTechnologies() {
    this.technologyService.getAllTechnologyService().subscribe({
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
    this.ref = this.dialogService.open(InternButtonsComponent, {
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

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.internsForExcel.map((intern) => {
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
        })
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'interns');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  showGender(value: number): string {
    return this.genders.find((gender) => gender.value === value)?.label;
  }

  showActive(value: number): string {
    return this.actives.find((active) => active.value === value)?.label;
  }

  cleanFilters(): void {
    this.filterDropdowns.forEach((dropdown) => dropdown.clear(null));
    this.filterCalendars.forEach((calendar) => {
      calendar.value = null;
      calendar.updateInputfield();
    });

    this.table.clear();
  }
  /**
   * ELIMINAR
   */
  show(value: any) {
    console.log(value);
  }
}
