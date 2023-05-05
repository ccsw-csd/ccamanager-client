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

  totalPersonsCCSW_app: number;
  totalPersonsApp_CCSW: number;

  showSpinner1: Boolean = true;
  showSpinner2: Boolean = true;

  constructor(
    private personService: PersonService,
    private ref: DynamicDialogRef,
    private clipboard: Clipboard,
    private snackbarService : SnackbarService,
  ) { }

  ngOnInit(): void {
    this.showSpinner1 = true;
    this.showSpinner2 = true;
    console.log(this.showSpinner1)

    this.personService.compareLdapToPersons().subscribe({
      next: (res: LdapPerson[]) => {
        this.personsCCSW_app = res;
        setTimeout(()=>{
          this.totalPersonsCCSW_app = this.personsCCSW_app.length;
          
        },0);
        this.showSpinner1 = false;
      },
    });
    
    this.personService.comparePersonsToLdap().subscribe({
      next: (res: LdapPerson[]) => {
        this.personsApp_CCSW = res;
        setTimeout(()=>{
          this.totalPersonsApp_CCSW = this.personsApp_CCSW.length;
          
        },0);
        this.showSpinner2 = false;
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
