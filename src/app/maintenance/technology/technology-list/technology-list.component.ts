import { Component, OnInit } from '@angular/core';
import { Technology } from '../models/Technology';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { TechnologyEditComponent } from '../technology-edit/technology-edit.component';
import { TechnologyService } from '../services/technology.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss'],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    ConfirmationService,
  ],
})
export class TechnologyListComponent implements OnInit {
  listOfData: Technology[];
  isLoading: boolean = false;
  item: Technology;

  constructor(
    private technologyService: TechnologyService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.isLoading = true;
    this.technologyService.findAll().subscribe({
      next: (results) => {
        this.listOfData = results;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro/a que quieres borrar la tecnología?',
      accept: () => {
        this.confirmationService.close();
        this.technologyService.deleteTechnology(id).subscribe({
          next: () => {
            this.technologyService.findAll().subscribe((result: any) => {
              this.listOfData = result;
              this.snackbarService.showMessage(
                'El registro se ha borrado con éxito'
              );
            });
          },
          error: (errorResponse) => {
            this.snackbarService.error(errorResponse['message']);
          },
        });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }

  addOrEditItem(item: Technology) {
    let window = this.dialogService.open(TechnologyEditComponent, {
      width: '600px',
      data: {
        technologyData: item,
      },
    });

    window.onClose.subscribe((result: boolean) => {
      if (result) this.findAll();
    });
  }
}
