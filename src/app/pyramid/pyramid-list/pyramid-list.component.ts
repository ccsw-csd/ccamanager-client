import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pyramid } from '../models/Pyramid';
import { PyramidService } from '../services/pyramid.service';
import { CountGraph } from '../models/CountGraph';
import { CountIndexGraph } from '../models/CountIndexGraph';
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
  constructor(
    private pyramidService: PyramidService,
    ) {}

  ngOnInit(): void {
    this.getAllPyramids();
    this.getCountIndexGraphs();
    this.getCountGraphs();
  }

  getAllPyramids() {
    this.pyramidService.getAllPyramids().subscribe({
      next: (res: Pyramid[]) => {
        this.pyramids = res;
      },
    });
  }

  getCountGraphs(){
    this.pyramidService.getProfileCountGraph().subscribe({
      next: (res: CountGraph[]) => {
        this.countGraphs = res;
        console.log(res);
      },
    });
  }

  getCountIndexGraphs(){
    this.pyramidService.getProfileCountIndexGraph().subscribe({
      next: (res: CountIndexGraph[]) => {
        this.countIndexGraphs = res;
        console.log(res);
      },
    });
  }

  formatNumber(num: number): string {
    return num.toFixed(2);
  }
  
  show(value:any){
    console.log(value);
  }
}
