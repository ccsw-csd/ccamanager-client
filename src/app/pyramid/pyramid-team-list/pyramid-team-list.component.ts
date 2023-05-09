import { Component, OnInit } from '@angular/core';
import { PyramidService } from '../services/pyramid.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Pyramid } from '../models/Pyramid';
import { PyramidTeam } from '../models/PyramidTeam';
import {CountIndexGraph} from '../models/CountIndexGraph';
@Component({
  selector: 'app-pyramid-team-list',
  templateUrl: './pyramid-team-list.component.html',
  styleUrls: ['./pyramid-team-list.component.scss']
})
export class PyramidTeamListComponent implements OnInit {

  loading : boolean = false;
  loadingTeam : boolean = false;
  pyramids: Pyramid[] ;
  configCharts: any;
  dataCharts : any = [];
  pyramidTeams : PyramidTeam[];
  constructor(
    private pyramidService: PyramidService,
    private snackbarService:SnackbarService,
    ) { }

  ngOnInit(): void {
    this.configCharts = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins:{
        legend:{
          display:false,
        }
      },
      scales: {
        x: {
          position: 'bottom',
          ticks: {
            color: '#495057',
          },
          grid: {
            display:false,
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
  this.getAllPyramids();
  this.getAllPyramidsTeam();
  }

  getAllPyramids() {
    this.loading = true;
    this.pyramidService.getAllPyramids().subscribe({
      next: (res: Pyramid[]) => {
        this.pyramids = res;
      },
      error: (error)=>{
        this.loading = false;
        this.snackbarService.error(error.message);
      },
      complete: ()=>{
        this.loading = false;
      }
    });
  }

  formatNumber(num: number): string {
    return num.toFixed(2);
  }

  getAllPyramidsTeam(){
    this.loadingTeam = true;
    this.pyramidService.getAllPyramidsTeams().subscribe({
      next:(res)=>{
        this.pyramidTeams = res;
        this.getDatasForCharts(this.pyramidTeams);
      },
      error: (error)=>{
        this.loadingTeam = false;
        this.snackbarService.error(error.message);
      },
      complete: ()=>{
        this.loadingTeam = false;
      }
    });
  }

  getDatasForCharts(items:PyramidTeam[]){
    for(let item of items ){
      this.dataCharts.push({
        labels: item.customerList.slice(0, -1).map((countIndex)=> countIndex.profile),
        datasets:[
          {
            backgroundColor: '#008FFB',
            data: item.customerList.slice(0, -1).map((countIndex)=> countIndex.index),
          }
        ]
      });
    }
  }
}
