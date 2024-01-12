import { Component, OnInit } from '@angular/core';
import { CostService } from '../services/cost.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { PyramidGraphCustomer } from '../models/PyramidGraphCustomer';
import { CostCenterCostIndex } from '../models/CostCenterCostIndex';

@Component({
  selector: 'app-pyramid-graph-customer',
  templateUrl: './pyramid-graph-customer.component.html',
  styleUrls: ['./pyramid-graph-customer.component.scss']
})
export class PyramidGraphCustomerComponent implements OnInit {

  costCenterCostIndex: CostCenterCostIndex[];
  pyramidGraph: PyramidGraphCustomer[];

  data: any = [];
  config: any;

  loading: boolean = false;
  loadingGraph: boolean = false;

  constructor(
    private costService: CostService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.config = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        legend: {
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
          }
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          }
        }
      }
    };

    this.getCostIndex();
    this.getPyramidGraph();
  }

  getCostIndex() {
    this.loading = true;
    this.costService.getCostCenterCostIndex().subscribe({
      next: (res: CostCenterCostIndex[]) => {
        this.costCenterCostIndex = res;
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

  getPyramidGraph(){
    this.loadingGraph = true;
    this.costService.getPyramidGraphCustomer().subscribe({
      next:(res)=>{
        this.pyramidGraph = res;
        this.getDatasForCharts(this.pyramidGraph);
      },
      error: (error)=>{
        this.loadingGraph = false;
        this.snackbarService.error(error.message);
      },
      complete: ()=>{
        this.loadingGraph = false;
      }
    });
  }

  getDatasForCharts(items: PyramidGraphCustomer[]){
    for(let item of items){
      this.data.push({
        labels: item.data.slice(0, -1).map((countIndex)=> countIndex.grade),
        datasets:[
          {
            backgroundColor: '#008FFB',
            data: item.data.slice(0, -1).map((countIndex)=> countIndex.index),
          }
        ]
      });
    }
  }

  formatNumber(num: number): string {
    return num.toFixed(2);
  }

}
