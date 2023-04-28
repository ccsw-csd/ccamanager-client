import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
//import zoomPlugin from 'chartjs-plugin-zoom';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from 'src/app/core/services/translate.service';
import { TimeLine } from '../models/TimeLine';
import { InternService } from '../services/intern.service';
@Component({
  selector: 'app-intern-timeline',
  templateUrl: './intern-timeline.component.html',
  styleUrls: ['./intern-timeline.component.scss'],
})
export class InternTimelineComponent implements OnInit {
  timeLines: TimeLine[];
  currentDate = new Date();
  sixMonthsAgo: Date;
  sixMonthsAfter: Date;
  config: any;
  basicData: any;
  arrayLabels: string[];
  constructor(
    private ref: DynamicDialogRef,
    private internService: InternService,
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    Chart.register(annotationPlugin);
    this.primengConfig.setTranslation(this.translateService.getSpanish());
    this.sixMonthsAgo = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 6,
      this.currentDate.getDate()
    );
    this.sixMonthsAfter = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 6,
      this.currentDate.getDate()
    );
    this.updateChar();
  }
   updateChar() {
    this.internService
      .findTimelineByDate(this.sixMonthsAgo, this.sixMonthsAfter)
      .subscribe({
        next: (res: TimeLine[]) => {
          this.timeLines = res;
          console.log(this.timeLines);
          this.basicData = {
            labels: this.timeLines.map((timeLine) => timeLine.x),
            datasets: [
              {
                backgroundColor: this.timeLines.map(
                  (timeline) => timeline.fillColor
                ),
                data: this.timeLines.map((timeLine) => timeLine.y),
                barPercentage: 0.8,
                order: 2,
              },
            ],
          };
        },
      });
    this.config = {
      indexAxis: 'y',
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: new Date().getTime(),
              borderColor: '#333333',
              borderWidth: 1,
              label: {
                display:true,
                content: 'Hoy',
                rotation: -90,
                yAdjust: -7,
                enabled: true,
                position: 'start',
                backgroundColor: '#775DD0',
                font: {
                  size: 12,
                  weight: 'bold',
                },
              },
            },
          ],
        },
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart) {
              return [
                { text: 'Contrato', fillStyle: '#00E396' },
                { text: 'Vacio', fillStyle: '#008FFB' },
                { text: 'Rechazado', fillStyle: '#FF4560' },
              ];
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return (
                'Fecha: ' +
                new Date(context.raw[0]).toLocaleDateString('es-ES') +
                ' - ' +
                new Date(context.raw[1]).toLocaleDateString('es-ES')
              );
            },
          },
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',
          }
        }
      },
      scales: {
        x: {
          min: this.sixMonthsAgo,
          type: 'time',
          time: {
            unit: 'day',
          },
          position: 'bottom',
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  closeWindow() {
    this.ref.close();
  }
}