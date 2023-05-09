import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/personal/services/person.service';
import { LdapPerson } from 'src/app/personal/models/LdapPerson';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-intern-synchronize-ldap',
  templateUrl: './intern-synchronize-ldap.component.html',
  styleUrls: ['./intern-synchronize-ldap.component.scss'],
})
export class InternSynchronizeLdapComponent implements OnInit {
  
  internsCCSW_app: LdapPerson[];
  internsApp_CCSW: LdapPerson[];

  totalInternsCCSW_app: number;
  totalInternsApp_CCSW: number;

  showSpinner1: Boolean = true;
  showSpinner2: Boolean = true;

  constructor(
    private personService: PersonService,
    private ref: DynamicDialogRef,
    private clipboard: Clipboard,
    private snackbarService : SnackbarService,
  ) { }

  ngOnInit(): void {
    
    this.personService.compareLdapToInterns().subscribe({
      next: (res: LdapPerson[]) => {
        this.internsCCSW_app = res;
          this.totalInternsCCSW_app = this.internsCCSW_app.length;
          this.showSpinner1 = false;
      },
    });
    
    this.personService.compareInternsToLdap().subscribe({
      next: (res: LdapPerson[]) => {
        this.internsApp_CCSW = res;
        this.totalInternsApp_CCSW = this.internsApp_CCSW.length;
        this.showSpinner2 = false;
      },
    });
  }
  
  copyList(){
    var persons: String[];
    var list = "";

    this.personService.findListLdapUsernamesInterns().subscribe((usernames) => {
      persons = usernames;
      persons.forEach(username => {
      list += username + "\n";
      });
      this.clipboard.copy(list.slice(0,-1));

      this.snackbarService.showMessage(
        'Se ha copiado la lista al clipboard, ya puede impotar la lista en el CorporateDirectory'
      );
      this.closeWindow();
    });
  }

  closeWindow() {
    this.ref.close(false);
  }

}