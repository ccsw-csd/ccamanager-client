import { Component, OnInit } from '@angular/core';
import { Intern } from '../models/Intern';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-intern-edit',
  templateUrl: './intern-edit.component.html',
  styleUrls: ['./intern-edit.component.scss']
})
export class InternEditComponent implements OnInit {

  intern:Intern;
  isNew:boolean;
  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,) { }

  ngOnInit(): void {
    if(this.config.data.intern === undefined){
      this.intern = new Intern();
      this.isNew = true;
    }else{
      this.intern = Object.assign({intern:Intern},this.config.data.intern);
      this.isNew=false;
    }
  }

}
