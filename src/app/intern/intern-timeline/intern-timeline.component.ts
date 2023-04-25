import { Component, OnInit } from '@angular/core';
import { InternService } from '../services/intern.service';
import { TimeLine } from '../models/TimeLine';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from 'src/app/core/services/translate.service';
@Component({
  selector: 'app-intern-timeline',
  templateUrl: './intern-timeline.component.html',
  styleUrls: ['./intern-timeline.component.scss']
})
export class InternTimelineComponent implements OnInit {

  timeLines:TimeLine[];
  currentDate = new Date();
  sixMonthsAgo :Date ; 
  sixMonthsAfter :Date;
  startDateFilter :Date;
  endDateFilter:Date;
  horizontalOptions:any;
  basicData:any;
  arrayLabels:string[];
  constructor(
    private ref: DynamicDialogRef,
    private internService:InternService,
    private primengConfig:PrimeNGConfig,
    private translateService:TranslateService
  ){}

  ngOnInit(): void {
    this.primengConfig.setTranslation(this.translateService.getSpanish());
    this.sixMonthsAgo= new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 6, this.currentDate.getDate());
    this.sixMonthsAfter =  new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 6, this.currentDate.getDate());
    this.updateChar();
  }
  updateChar(){
    this.internService.findTimelineByDate(this.sixMonthsAgo,this.sixMonthsAfter).subscribe({
      next: (res: TimeLine[]) => {
        this.timeLines = res;
        console.log(this.timeLines);
        this.arrayLabels = this.timeLines.map(timeLine => timeLine.x);
        this.basicData = {
          labels: this.arrayLabels,
          datasets:  [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
      };
      },
    });
    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      },
      tooltip:false,
    };    
    
  }

  closeWindow(){
    this.ref.close();
  }

}
