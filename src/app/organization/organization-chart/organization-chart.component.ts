import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OrganizationService } from '../services/organization.service';
import { OrganizationCustomer } from '../models/OrganizationCustomer';

@Component({
  selector: 'app-organization-chart',
  templateUrl: './organization-chart.component.html',
  styleUrls: ['./organization-chart.component.scss']
})
export class OrganizationChartComponent implements OnInit {

  data: TreeNode[] = [];
  zoomValue: number = 10;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private organizationService: OrganizationService,
  ) { }

  ngOnInit(): void {

    this.organizationService.getOrganizationCustomer(this.config.data.customers).subscribe((res) => {

      let rootNode : TreeNode = {label: 'Organigrama', styleClass: 'bg-indigo-500 text-white', expanded: true, data: {title: true}, children:[]};

      res.forEach(item => {
        rootNode.children.push(this.makeCustomTree(item));
      });

      if (rootNode.children.length == 1) rootNode = rootNode.children[0];

      this.data = [];
      this.data.push(rootNode);

      //this.showVal(10);
    });

  }

  makeCustomTree(customer : OrganizationCustomer) : TreeNode {

    let customerNode : TreeNode = {label: customer.name, styleClass: 'bg-teal-500 text-white', expanded: true, data: {title: true}, children:[]};

    this.makeTree(customer, null, customerNode);

    return customerNode;
  }


  makeTree(customer : OrganizationCustomer, idParent: number, rootNode: TreeNode) {

    customer.members.filter(member => member.parent == idParent).forEach(member => {

      let node : TreeNode = {label: member.person.name + ' ' + member.person.lastname, expanded: true, data: {image: 'data:image/jpg;base64,'+member.photo, role: member.person.role}, children:[]};
      rootNode.children.push(node);

      this.makeTree(customer, member.person.id, node);
    });

  }


  closeWindow(): void {
    this.ref.close();
  }


  setZoom(zoom,el) : void {
      
    let transformOrigin = [0,0];
    el = el;
    var p = ["webkit", "moz", "ms", "o"],
          s = "scale(" + zoom + ")",
          oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    
  }

  changeZoom() : void {
    var zoomScale = Number(this.zoomValue) / 10;
    this.setZoom(zoomScale,document.getElementsByClassName('container')[0]);
  }

}
