import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CostService } from '../services/cost.service';
import { PyramidGraph } from '../models/PyramidGraph';
import { CostCenterCostIndex } from '../models/CostCenterCostIndex';

@Component({
  selector: 'app-pyramid-graph',
  templateUrl: './pyramid-graph.component.html',
  styleUrls: ['./pyramid-graph.component.scss']
})
export class PyramidGraphComponent implements OnInit {

  costCenterCostIndex: CostCenterCostIndex[];
  pyramidGraph: PyramidGraph[];

  data: any;
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
    this.costService.getPyramidGraph().subscribe({
      next: (res: PyramidGraph[]) => {
          this.pyramidGraph = res;
          this.data = {
            labels: this.pyramidGraph.slice(0, -1).map((countIndex)=> countIndex.grade),
            datasets:[
              {
                backgroundColor: '#008FFB',
                data: this.pyramidGraph.slice(0, -1).map((countIndex)=> countIndex.index),
              }
            ]          
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

}
