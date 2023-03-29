import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-personal-selector',
  templateUrl: './personal-selector.component.html',
  styleUrls: ['./personal-selector.component.scss']
})
export class PersonalSelectorComponent implements OnInit {

  searchText = '';
  searchResults = [];
  showResults = false;

  constructor(
    private personService: PersonService
    ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSearch() {
    if (this.searchText.length < 3) {
      this.showResults = false;
      return;
    }

    this.personService.searchPerson('/api/person/' + this.searchText).subscribe((response: any) => {
      this.searchResults = response;
      this.showResults = true;
    });
  }

  onPersonSelected(person) {
    this.searchText = person.name;
    this.showResults = false;

    // Actualizar el formulario con los datos de la persona seleccionada
  }
}
