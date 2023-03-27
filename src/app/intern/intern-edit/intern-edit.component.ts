import { Component, OnInit } from '@angular/core';
import { Intern } from '../models/Intern';
import { Center } from 'src/app/core/models/Center';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EducationCenter } from 'src/app/maintenance/education-center/models/EducationCenter';
import { Province } from 'src/app/core/models/Province';
import { Education } from 'src/app/maintenance/education/models/Education';
import { Technology } from 'src/app/maintenance/technology/models/Technology';

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

  genders: any[] = [
    { label: 'Otros', value:0 },
    { label: 'Mujer', value: 1 },
    { label: 'Hombre', value: 2 },
  ];

  constructor(
    private config: DynamicDialogConfig,) { }

  ngOnInit(): void {
    if(this.config.data.intern === undefined){
      this.intern = new Intern();
      this.isNew = true;
    }else{
       this.intern = Object.assign({intern:Intern},this.config.data.intern);
       this.isNew = false;
    }
    this.show(this.config.data.educations);
    this.educations = this.config.data.educations;
    this.technologies = this.config.data.technologies;
    this.educationsCenter = this.config.data.educationsCenter;
    this.centers = this.config.data.centers;
    this.provinces = this.config.data.provinces;
  }

  show(value:any){
    console.log(value);
  }

}
