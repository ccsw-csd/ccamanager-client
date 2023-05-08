import { Component, OnInit } from '@angular/core';
import { Pyramid } from '../models/Pyramid';
import { PyramidService } from '../services/pyramid.service';
import { CountGraph } from '../models/CountGraph';
import { CountIndexGraph } from '../models/CountIndexGraph';
import { cloneDeep } from 'lodash';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
@Component({
  selector: 'app-pyramid-list',
  templateUrl: './pyramid-list.component.html',
  styleUrls: ['./pyramid-list.component.scss'],
})
export class PyramidListComponent implements OnInit {
  pyramids: Pyramid[];
  countGraphs: CountGraph[];
  countIndexGraphs:CountIndexGraph[];
  result: any;
  dataCountGraph:any;
  configCountGraph:any; 
  dataCountIndexGraph:any;
  configCountIndexGraph:any; 
  editable:boolean = false;
  pyramidsEdit : Pyramid[];
  loading:boolean = false;
  loadingIndexGraph:boolean = false;
  loadingGraph:boolean = false;

  constructor(
    private pyramidService: PyramidService,
    private snackbarService:SnackbarService,
    ) {}

  ngOnInit(): void {
    this.getAllPyramids();
    this.getCountIndexGraphs();
    this.getCountGraphs();

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

  getCountIndexGraphs(){
    this.loadingIndexGraph = true;
    this.pyramidService.getProfileCountIndexGraph().subscribe({
      next: (res: CountIndexGraph[]) => {
        this.countIndexGraphs = res;
        this.dataCountIndexGraph = {
          labels: this.countIndexGraphs.slice(0, -1).map((countIndex)=> countIndex.profile),
          datasets:[
            {
              backgroundColor: '#008FFB',
              data: this.countIndexGraphs.slice(0, -1).map((countIndex)=> countIndex.index),
            }
          ]          
        };
        this.configCountIndexGraph = {
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
        },
        error:(error)=>{
          this.loadingIndexGraph = false;
          this.snackbarService.error(error.message);
        },
        complete: ()=>{
          this.loadingIndexGraph= false;
        }
    });
  }

  getCountGraphs(){
    this.loadingGraph = true;
    this.pyramidService.getProfileCountGraph().subscribe({
      next: (res: CountGraph[]) => {
        this.countGraphs = res;
        this.dataCountGraph = {
          labels: this.countGraphs.slice(0, -1).map((count)=> count.profile),
          datasets:[
            {
              backgroundColor: '#008FFB',
              data: this.countGraphs.slice(0, -1).map((count)=> count.count),
            }
          ]          
        };
        this.configCountGraph = {
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
      },
      error:(error)=>{
        this.loadingGraph = false;
        this.snackbarService.error(error.message);
      },
      complete: ()=>{
        this.loadingGraph= false;
      }
    });
  }

  formatNumber(num: number): string {
    return num.toFixed(2);
  }

  onEdit(){
    this.editable = true;
    this.pyramidsEdit = cloneDeep(this.pyramids);
  }

  onCancel(){
    this.editable = false;
    Object.assign(this.pyramids, this.pyramidsEdit);
  }
  
  onSave(){
    this.loading = true;
    this.pyramidService.save(this.pyramids).subscribe({
      next:(result)=>{
        this.getAllPyramids();
        this.getCountIndexGraphs();
        this.getCountGraphs();
        this.snackbarService.showMessage("Se ha actualizado correctamente");
      },
      error:(error)=>{
        this.snackbarService.error(error.message);
      },
      complete:()=>{     
        this.editable = false;
      }
    });
  }
}
