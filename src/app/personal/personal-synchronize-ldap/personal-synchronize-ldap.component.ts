import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { LdapPerson } from '../models/LdapPerson';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';




@Component({
  selector: 'app-personal-synchronize-ldap',
  templateUrl: './personal-synchronize-ldap.component.html',
  styleUrls: ['./personal-synchronize-ldap.component.scss']
})
export class PersonalSynchronizeLdapComponent implements OnInit {
  
  personsCCSW_app: LdapPerson[];
  personsApp_CCSW: LdapPerson[];

  showSpinner1 = true;
  showSpinner2 = true;

  constructor(
    private personService: PersonService,
    private ref: DynamicDialogRef,
    private clipboard: Clipboard,
    private snackbarService : SnackbarService
  ) { }

  ngOnInit(): void {
    this.personService.compareLdapToPersons().subscribe({
      next: (res: LdapPerson[]) => {
        this.personsCCSW_app = res;
      },
    });
    
    this.personService.comparePersonsToLdap().subscribe({
      next: (res: LdapPerson[]) => {
        this.personsApp_CCSW = res;
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
      // this.snackbar.open('Se ha copiado la lista al clipboard, ya puede impotar la lista en el CorporateDirectory', '', {
      //   duration: 5000
      // });

    });
  }

  closeWindow() {
    this.ref.close(false);
  }

}
