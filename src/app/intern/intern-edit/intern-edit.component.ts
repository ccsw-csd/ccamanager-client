import { Component, OnInit } from '@angular/core';
import { Intern } from '../models/Intern';
import { Center } from 'src/app/core/models/Center';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EducationCenter } from 'src/app/maintenance/education-center/models/EducationCenter';
import { Province } from 'src/app/core/models/Province';
import { Education } from 'src/app/maintenance/education/models/Education';
import { Technology } from 'src/app/maintenance/technology/models/Technology';
import { Level } from 'src/app/maintenance/english-level/models/Level';
import { Action } from 'src/app/core/models/Action';

@Component({
  selector: 'app-intern-edit',
  templateUrl: './intern-edit.component.html',
  styleUrls: ['./intern-edit.component.scss']
})
export class InternEditComponent implements OnInit {

  intern:Intern;
  isNew:boolean;
  educationsCenter:EducationCenter[];
  centers:Center[];
  provinces:Province[];
  educations:Education[];
  technologies:Technology[];
  englishLevels:Level[];
  actions:Action[];

  genders: any[] = [
    { label: 'Otros', value:0 },
    { label: 'Mujer', value: 1 },
    { label: 'Hombre', value: 2 },
  ];
  actives: any[] = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
    { label: 'Pendiente', value: 2},
  ];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
    ) { }

  ngOnInit(): void {
    if(this.config.data.intern === undefined){
      this.intern = new Intern();
      this.intern.hours=5;
      this.isNew = true;
      this.intern.period = this.getActualQuarter();
    }else{
       this.intern = Object.assign({intern:Intern},this.config.data.intern);
       this.isNew = false;
    }
    this.educations = this.config.data.educations;
    this.technologies = this.config.data.technologies;
    this.educationsCenter = this.config.data.educationsCenter;
    this.centers = this.config.data.centers;
    this.englishLevels = this.config.data.englishLevels;
    this.provinces = this.config.data.provinces;
    this.actions = this.config.data.actions;
  }

  getActualQuarter():string{
    const actualDate = new Date();
    const year = actualDate.getFullYear();
    const month = actualDate.getMonth() + 1;    
    let quarter = 0;
    if (month >= 1 && month <= 4) {
      quarter = 1;
    } else if (month >= 5 && month <= 8) {
      quarter = 2;
    } else if (month >= 9 && month <= 12) {
      quarter = 3;
    }    
    return `Q${quarter}'${String(year).slice(-2)}`;
  }

  closeWindow(){
    
    this.ref.close();
  }
  show(value:any){
    console.log(value);
  }

}
