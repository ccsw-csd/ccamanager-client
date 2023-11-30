import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Person } from '../models/Person';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-org',
  templateUrl: './personal-org.component.html',
  styleUrls: ['./personal-org.component.scss']
})
export class PersonalOrgComponent implements OnInit {

  data: TreeNode[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {

    this.setTree();
    this.config.data.persons;
  }

  public setTree(): void {
		this.config.data.persons.map((p) => {

      if(this.isRoot(p) && this.hasChildren(p)) {
        this.data.push(this.getNode(p));
      }
    });
  }

  getNode(person: Person) : TreeNode {

    let node : TreeNode = {label: person.name + ' ' + person.lastname, expanded: true, data: {image: environment.server + '/photo/' + person.id, role: person.role}, children:[]};

    this.config.data.persons.filter(p => p.parent?.id == person.id).forEach(e => node.children.push(this.getNode(e)));

    return node;
  }

  isRoot(person: Person) : boolean {
    return person.parent == null || this.config.data.persons.filter(p => p.id == person.parent.id).length == 0;
  }

  hasChildren(person: Person) : boolean {
    return this.config.data.persons.filter(p => p.parent?.id == person.id).length > 0;
  }

}
