import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { InternService } from '../services/intern.service';
@Component({
  selector: 'app-intern-buttons',
  templateUrl: './intern-buttons.component.html',
  styleUrls: ['./intern-buttons.component.scss']
})
export class InternButtonsComponent implements OnInit {
  text:string;  
  linkOrComment:string;
  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private snackbarService:SnackbarService,
    private internService:InternService) { }

  ngOnInit(): void {
    this.linkOrComment = this.config.data.action;
    this.text = this.config.data.value;
  }

  save(text:string){
    this.ref.close(text);
  }
  cancel(){
    this.ref.close();
  }
  
}
