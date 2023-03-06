import { Component, OnInit } from '@angular/core';
import { relativeTimeThreshold } from 'moment';
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
import { Intern } from '../models/Intern';
import { InternService } from '../services/intern.service';
@Component({
  selector: 'app-intern-list',
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.scss'],
})
export class InternListComponent implements OnInit {
  interns: Intern[];
  educations:Education[];
  educationsCenter:EducationCenter[];
  centers:Center[];
  provinces:Province[];
  levels:Level[];
  actions:Action[];
  genres : any[];

  cols  = {
    Periodo: "flex flex-none justify-content-center" ,
    Username: "flex flex-none"  ,
    Nombre: "flex flex-none" ,
    Apellidos:"flex flex-none"  ,
    Genero:"flex flex-none"  ,
    Titulacion:"flex flex-none"  ,
    Centro:"flex flex-none"  ,
    Oficina:"flex flex-none"  ,
    Localización:"flex flex-none" ,
    Inicio: "flex flex-none",
    Fin: "flex flex-none",
    Horas:"flex flex-none",
    Inglés:"flex flex-none" ,
    Mentor:"flex flex-none" ,
    Coordinador:"flex flex-none",
    RRHH: "flex flex-none",
    Accion: "flex flex-none",
    Contrato: "flex flex-none",
    Estado:"flex flex-none" ,
    Botones: "flex flex-none"
  };
  constructor(
    private internService: InternService,
    private educationService: EducationService,
    private educationCenterService: EducationCenterService,
    private centerService: CenterService,
    private provinceService: ProvinceService,
    private levelService: LevelService,
    private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.getAllInterns();
    this.getAllEducations();
    this.getAllEducationCenters();
    this.getAllCenters();
    this.getAllProvinces();
    this.getAllLevels();
    this.getAllActions();
  
    this.genres = [
      {label:"Otros" ,value:0},
      {label:"Mujer",value:1},
      {label:"Hombre",value:2}
    ];
  }

  getAllInterns() {
    this.internService.getAllInterns().subscribe({
      next:(res:Intern[])=>{
        this.interns=res;
      }
    });
  }
  getAllEducations(){
    this.educationService.findAll().subscribe({
      next:(res:Education[])=>{
        this.educations=res;
      }
    });
  }
  getAllEducationCenters(){
    this.educationCenterService.getAllEducationCenters().subscribe({
      next:(res:EducationCenter[])=>{
        this.educationsCenter = res;
      }
    });
  }
  getAllCenters(){
    this.centerService.getAllCenters().subscribe({
      next:(res:Center[])=>{
        this.centers= res;
      }
      
    });
  }
  getAllProvinces(){
    this.provinceService.getAllProvinces().subscribe({
      next:(res:Province[])=>{
        this.provinces = res;
      }
      
    });
  }

  getAllLevels(){
    this.levelService.getAllLevels().subscribe({
      next:(res:Level[])=>{
        this.levels = res;
      }
      
    });
  }
  getAllActions(){
    this.actionService.getAllActions().subscribe({
      next:(res:Action[])=>{
        this.actions = res;
      }
      
    });
  }
}
