import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { TechnologyService } from '../services/technology.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Technology } from '../models/Technology';

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.scss'],
})
export class TechnologyEditComponent implements OnInit {
  technologyElement: Technology;

  item: any;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private technologyService: TechnologyService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.technologyElement = Object.assign(
      { technologyData: Technology },
      this.config.data.technologyData
    );
  }

  saveItem(item: Technology) {
    this.technologyService.save(item).subscribe({
      next: () => {
        this.snackbarService.showMessage(
          'El registro se ha guardado con éxito'
        );
        this.ref.close(true);
      },
      error: (errorResponse) => {
        this.snackbarService.error(errorResponse['message']);
      },
    });
  }

  closeWindow() {
    this.ref.close(false);
  }

  showDialog(element?: any) {
    this.item = element;
  }
}
