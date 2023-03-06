import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InternListComponent } from './intern-list/intern-list.component';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [InternListComponent],
  imports: [CommonModule, ButtonModule, TableModule,DropdownModule],
})
export class InternModule {}
