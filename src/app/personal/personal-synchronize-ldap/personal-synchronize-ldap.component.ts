import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { LdapPerson } from '../models/LdapPerson';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListsLdapPerson } from '../models/ListsLdapPerson';

@Component({
  selector: 'app-personal-synchronize-ldap',
  templateUrl: './personal-synchronize-ldap.component.html',
  styleUrls: ['./personal-synchronize-ldap.component.scss']
})
export class PersonalSynchronizeLdapComponent implements OnInit {
  
  personsCCSW_app: LdapPerson[];
  personsApp_CCSW: LdapPerson[];

  totalPersonsCCSW_app: number;
  totalPersonsApp_CCSW: number;

  showSpinner: Boolean = true;

  constructor(
    private personService: PersonService,
    private ref: DynamicDialogRef,
    private clipboard: Clipboard,
    private snackbarService : SnackbarService,
  ) { }

  ngOnInit(): void {

    this.personService.compareLdapPersons().subscribe({
      next: (res: ListsLdapPerson) => {
      this.personsCCSW_app = res.ldapToPersons;
      this.personsApp_CCSW = res.personsToLdap;
      this.totalPersonsCCSW_app = this.personsCCSW_app.length;
      this.totalPersonsApp_CCSW = this.personsApp_CCSW.length;
      this.showSpinner = false;
      },
    });
  }
  
  copyList(){
    var persons: String[];
    var list = "";

    this.personService.findListLdapUsernames().subscribe((usernames) => {
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
