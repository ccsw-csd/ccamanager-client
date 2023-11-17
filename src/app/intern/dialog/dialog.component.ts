import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { InternService } from '../services/InternService';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  text:string;  
  label:string;
  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.label = this.config.data.action;
    this.text = this.config.data.value;
  }

  save(text:string){
    this.ref.close(text);
  }
  cancel(){
    this.ref.close();
  }
  
}
