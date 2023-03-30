import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Person } from 'src/app/personal/models/Person';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportPersons(persons: Person[]) {

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(persons.map(person => {
        return {
          saga:person.saga,
          username:person.username,
          nombre:person.name,
          apellidos:person.lastname,
          cliente:person.customer,
          grado:person.grade,
          rol:person.role,
          horas:person.hours,
          practica:person.businesscode,
          department: person.department,
          evaluador: person.manager,
          oficina:person.center?.name,
          provincia:person.province?.province,
          estado:person.active          
        };
      }));
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'persons');
    });
  }

  exportInterns(interns:any) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(interns);
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
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  
}
