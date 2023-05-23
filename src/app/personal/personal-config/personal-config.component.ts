import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef ,DynamicDialogConfig} from 'primeng/dynamicdialog';
@Component({
  selector: 'app-personal-config',
  templateUrl: './personal-config.component.html',
  styleUrls: ['./personal-config.component.scss']
})
export class PersonalConfigComponent implements OnInit {

  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig) {
   }
  allColumns :any [] = [
    { name: 'Saga', key:'saga' },
    { name: 'Username' , key:'username' },
    { name: 'Nombre' , key:'name' },
    { name: 'Apellidos' , key:'lastname' },
    { name: 'Cliente' , key:'customer' },
    { name: 'Grado' , key:'grade' },
    { name: 'Rol' , key:'role' },
    { name: 'Horas' , key:'hours' },
    { name: 'Práctica' , key:'businesscode' },
    { name: 'Dpto' , key:'department' },
    { name: 'Evaluador' , key:'manager' },
    { name: 'Oficina' , key:'center' },
    { name: 'Localización' , key:'province' },
    { name: 'Estado' , key:'active' },
  ];
  selectedColumns: any[];

  columns: any[] = [];

  ngOnInit(): void {
    this.selectedColumns= this.config.data.columns.slice();
    console.log(typeof this.selectedColumns);
    this.columns = this.allColumns.filter(column => !this.selectedColumns.some(otherColumn => otherColumn.name === column.label));
  }
  closeWindow() {
    this.ref.close();
  }

  save(){
  console.log(this.selectedColumns);
    this.ref.close(this.selectedColumns);
  }
}
