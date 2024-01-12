import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import packageInfo from '../../../../../../package.json';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  frontVersion : string = packageInfo.version;
  backVersion : string = "1.0.0";
  items: MenuItem[];

  constructor(
    public authService: AuthService,
    public dialogService: DialogService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {

    this.items = [
      {label: "Gestión Personal", routerLink: '/personal', visible: this.authService.hasRole('PERSONAL')},
      {label: "Gestión Becarios", routerLink: '/intern', visible: this.authService.hasRole('INTERN')},
      {label: "Organigrama", routerLink: '/organization', visible: this.authService.hasRole('PERSONAL')},
      {label: "Pyramid Index", routerLink: '/pyramid-graph', visible: this.authService.hasRole('PERSONAL')},
      {label: "Pyramid Team Index", routerLink: '/pyramid-graph-customer', visible: this.authService.hasRole('PERSONAL')},
      {
        label: "Mantenimiento",
        expanded: true,
        visible: this.authService.hasRole('MAINTENANCE'),
        items: [
          {label: "Clientes", routerLink: '/customer'},
          {label: "Centros de Coste", routerLink: '/cost-center'},
          {label: "Centros Educativos", routerLink: '/education-center'},
          {label: "Titulaciones", routerLink: '/education'},
          {label: "Tecnologías", routerLink: '/technology'}
       ]
      }
    ];



    this.utilsService.getAppVersion().subscribe((result: any) => {
      this.backVersion = result.version;
    });
  }

}
