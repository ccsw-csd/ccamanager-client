import { Component, OnInit } from '@angular/core';
import { Pyramid } from '../models/Pyramid';
import { PyramidService } from '../services/pyramid.service';
@Component({
  selector: 'app-pyramid-list',
  templateUrl: './pyramid-list.component.html',
  styleUrls: ['./pyramid-list.component.scss'],
})
export class PyramidListComponent implements OnInit {
  pyramids: Pyramid[];
  numero:string;
  result: any;
  constructor(private pyramidService: PyramidService) {}

  ngOnInit(): void {
    this.numero = "HOLA";
    this.getAllPyramids();
  }

  getAllPyramids() {
    this.pyramidService.getAllPyramids().subscribe({
      next: (res: Pyramid[]) => {
        this.pyramids = res;
      },
    });
  }

  show(value:any){
    console.log(value);
  }
}
