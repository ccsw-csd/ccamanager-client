import { Component, OnInit } from '@angular/core';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gtemanager-client';

  constructor(
    private filterService: FilterService,
  ) {}  

  ngOnInit(): void {

    this.registerCustomFilter();

  }

  filterIsNull(filter) : boolean {
    return filter === '-- Vacío --' || filter === '-- Vacía --' || (filter.length != filter.trim().length && filter.trim().length == 0);
  }


  registerCustomFilter(): void {

    this.filterService.register('equals-and-null', (value, filter): boolean => {      
      if (filter == null || filter.length == 0) {
        return true;
      }

      if (this.filterIsNull(filter) && (value == null || value.length == 0)) return true;
      if (value == null || value.length == 0) return false;
      
      return value == filter;
    });    
    
    this.filterService.register('contains-and-null', (value, filter): boolean => {  
      if (filter == null || filter.length == 0) {
        return true;
      }

      if (this.filterIsNull(filter)) {
        if (value == null || value.length == 0) return true;
        return false;
      } 
      if (value == null || value.length == 0) return false;
      
      if (value.indexOf)
      return value.indexOf(filter) >= 0;
      
      return value == filter;
    });    
    
    this.filterService.register('array-and-null', (value, filter): boolean => {  
      if (filter == null || filter.length == 0) {
        return true;
      }

      if (this.filterIsNull(filter) && (value == null || value.length == 0)) return true;
      if (value == null || value.length == 0) return false;
      
      return value.filter(item => item.name == filter).length > 0;
    });    


    this.filterService.register('multiple', (value, filter): boolean => {
      if (filter == null || filter.length == 0) {
        return value == null;
      }

      value = ''+value;

      return filter.includes(value);
    });

    

  }

}
