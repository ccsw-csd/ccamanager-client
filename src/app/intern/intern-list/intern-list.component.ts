import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Action } from 'src/app/core/models/Action';
import { Center } from 'src/app/core/models/Center';
import { Province } from 'src/app/core/models/Province';
import { ActionService } from 'src/app/core/services/action.service';
import { CenterService } from 'src/app/core/services/center.service';
import { ProvinceService } from 'src/app/core/services/province.service';
import { EducationCenter } from 'src/app/maintenance/education-center/models/EducationCenter';
import { EducationCenterService } from 'src/app/maintenance/education-center/services/education-center.service';
import { Education } from 'src/app/maintenance/education/models/Education';
import { EducationService } from 'src/app/maintenance/education/services/education.service';
import { Level } from 'src/app/maintenance/english-level/models/Level';
import { LevelService } from 'src/app/maintenance/english-level/services/level.service';
import { Technology } from 'src/app/maintenance/technology/models/Technology';
import { TechnologyService } from 'src/app/maintenance/technology/services/technology.service';
import { runInThisContext } from 'vm';
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
  interns: Intern[];
  educations: Education[];
  educationsCenter: EducationCenter[];
  centers: Center[];
  provinces: Province[];
  englishLevels: Level[];
  actions: Action[];
  technologies : Technology[];
  genders: any[];
  actives: any[];
  internsLength: number;
  es: any;

  cols = {
    period: 'flex flex-none w-7rem',
    username: 'flex flex-none w-10rem',
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
    customer:'flex flex-none w-10rem',
    code:'flex flex-none w-6rem',
    technologies:'flex flex-none w-10rem',
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
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private internService: InternService,
    private educationService: EducationService,
    private educationCenterService: EducationCenterService,
    private centerService: CenterService,
    private provinceService: ProvinceService,
    private levelService: LevelService,
    private actionService: ActionService,
    private technologyService:TechnologyService,
  ) {}

  ngOnInit(): void {
    this.getAllInterns();
    this.getAllEducations();
    this.getAllEducationCenters();
    this.getAllCenters();
    this.getAllProvinces();
    this.getAllLevels();
    this.getAllActions();
    this.getAllTechnologies();
    this.genders = [
      { label: 'Otros', value: 0 },
      { label: 'Mujer', value: 1 },
      { label: 'Hombre', value: 2 },
    ];
    this.actives = [
      { label: 'Inactivo', value: 0 },
      { label: 'Activo', value: 1 },
      { label: 'Pendiente', value: 2 },
    ];
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
  }

  getAllInterns() {
    this.internService.getAllInterns().subscribe({
      next: (res: Intern[]) => {
        this.interns = res;
        this.internsLength = res.length;
       console.log(this.interns);
      },
    });
  }
  getAllTechnologies(){
    this.technologyService.getAllTechnologyService().subscribe({
      next:(res :Technology[])=>{
        this.technologies = res;
      }
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

  convertToUTC(date: Date): Date {

    console.log("entra:"+date.toString());
    const utcDate = moment.utc(date.toISOString());
    const utcOffset = moment.duration('+01:00').as('milliseconds');
    const dateout = utcDate.subtract(utcOffset).toDate();
    console.log("sale:"+dateout.toString());
    return dateout;
  }

  onClose(): void {
    this.ref.onClose.subscribe((results: any) => {
      this.getAllInterns();
    });
  }
  formatDate(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
  
    return new Date(year, month, day);
  }
  /**
   * ELIMINAR
   */
  show(value: any) {
    console.log(value);
  }
}
