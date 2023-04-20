import { Component, ElementRef, OnInit } from '@angular/core';
import { Intern } from '../models/Intern';
import { PrimeNGConfig } from 'primeng/api';
import { Center } from 'src/app/core/models/Center';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EducationCenter } from 'src/app/maintenance/education-center/models/EducationCenter';
import { Province } from 'src/app/core/models/Province';
import { Education } from 'src/app/maintenance/education/models/Education';
import { Technology } from 'src/app/maintenance/technology/models/Technology';
import { Level } from 'src/app/maintenance/english-level/models/Level';
import { Action } from 'src/app/core/models/Action';
import { PersonService } from 'src/app/personal/services/person.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { TranscodeService } from 'src/app/core/services/transcode.service';
import { FormBuilder,Validators } from '@angular/forms';
import { DateRangeValidator } from 'src/app/core/models/DateRangeValidator';
import { TranslateService } from 'src/app/core/services/translate.service';
import { InternService } from '../services/intern.service';
import { EducationCenterService } from 'src/app/maintenance/education-center/services/education-center.service';

@Component({
  selector: 'app-intern-edit',
  templateUrl: './intern-edit.component.html',
  styleUrls: ['./intern-edit.component.scss']
})
export class InternEditComponent implements OnInit {

  intern:Intern;
  isNew:boolean;
  educationsCenter:EducationCenter[];
  centers:Center[];
  provinces:Province[];
  educations:Education[];
  technologies:Technology[];
  englishLevels:Level[];
  actions:Action[];
  internSelected;
  checked : boolean = false;
  quantity:number;
  groupIntern:any[] = [];
  profileForm :any;
  genders: any[] = [
    { label: 'Otros', value:0 },
    { label: 'Mujer', value: 1 },
    { label: 'Hombre', value: 2 },
  ];
  actives: any[] = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
    { label: 'Pendiente', value: 2},
  ];

  constructor(
    private primengConfig: PrimeNGConfig,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private elementRef: ElementRef,
    private personService:PersonService,
    private authService:AuthService,
    private educationCenterService:EducationCenterService,
    private internService:InternService,
    private transCodeService:TranscodeService,
    private translateService: TranslateService,
    private snackbarService:SnackbarService,
    private fb: FormBuilder
    ) { }
    
   ngOnInit(): void {
     if(this.config.data.intern === undefined){
      this.intern = new Intern();
      this.intern.hours=5;
      this.isNew = true;
      this.intern.active = 1;
      this.intern.period = this.getActualQuarter();
    }else{
      this.intern = Object.assign({intern:Intern},this.config.data.intern);
      this.isNew = false;
    }
    this.primengConfig.setTranslation(this.translateService.getSpanish());
    this.educations = this.config.data.educations;
    this.technologies = this.config.data.technologies;
    this.educationCenterService.getAllEducationCentersSimple().subscribe({
      next: (res: EducationCenter[]) => {
        this.educationsCenter = res;
      },
    });
    this.centers = this.config.data.centers;
    this.englishLevels = this.config.data.englishLevels;
    this.provinces = this.config.data.provinces;
    this.actions = this.config.data.actions;
    this.sizeHeight();
    this.setFormGroup();
  }

  setFormGroup(){
      this.profileForm =this.fb.group({
        period: [this.getActualQuarter(),Validators.required],
        name: [this.intern.name,Validators.required],
        lastname:[this.intern.lastname,Validators.required],
        email: [this.intern.email,Validators.email],
        username: [this.intern.username],
        gender: [this.intern.gender,Validators.required],
        education:[this.intern?.education],
        educationCenter:[this.intern?.educationCenter],
        center:[this.intern?.center],
        province:[this.intern?.province],
        startDate:[this.intern?.startDate],
        endDate:[this.intern?.endDate],
        hours:[this.intern?.hours,Validators.required],
        customer:[this.intern?.customer,Validators.required],
        code:[this.intern?.code],
        englishLevel:[this.intern.englishLevel,Validators.required],
        mentor:[this.intern?.mentor],
        coordinator:[this.intern?.coordinator,Validators.required],
        rrhh:[this.intern?.hrManager,Validators.required],
        active:[this.intern?.active,Validators.required],
        saga:[this.intern?.saga],
        quantity:[]
      },{
      validators: DateRangeValidator.dateRange
      });
  }
  
  updateFormGroup(){
    this.profileForm.get('email').setValidators([Validators.required,Validators.email]);
    this.profileForm.get('education').setValidators([Validators.required]);
    this.profileForm.get('education').updateValueAndValidity();
    this.profileForm.get('educationCenter').setValidators([Validators.required]);
    this.profileForm.get('educationCenter').updateValueAndValidity();
    this.profileForm.get('center').setValidators([Validators.required]);
    this.profileForm.get('center').updateValueAndValidity();
    this.profileForm.get('province').setValidators([Validators.required]);
    this.profileForm.get('startDate').setValidators([Validators.required]);
    this.profileForm.get('startDate').updateValueAndValidity();
    this.profileForm.get('endDate').setValidators([Validators.required]);
    this.profileForm.get('endDate').updateValueAndValidity();
    this.profileForm.get('code').setValidators([Validators.required]);
    this.profileForm.get('saga').setValidators([Validators.required]);
    this.profileForm.get('mentor').setValidators([Validators.required]);
  }

  getInfoUserLogin(){
    let centerName= this.authService.getUserInfo().officeName;
    this.transCodeService.getCenterByName(centerName).subscribe(
      (res)=>{
        this.intern.center = res;
        this.profileForm.patchValue({
          center:this.intern.center
        });
        this.matchByProvince();
        this.intern.active=2;
        this.intern.gender=0;
        this.intern.englishLevel = this.englishLevels.find(english => english.name==="Pendiente");
        this.profileForm.patchValue({
          active:this.intern.active,
          gender:this.intern.gender,
          englishLevel:this.intern.englishLevel
        });
      }
      );
    if(this.checked){
      this.profileForm.get('quantity').setValidators([Validators.required]);
      this.profileForm.get('quantity').updateValueAndValidity();
      this.profileForm.patchValue({
        email:"",
        username:"",
        saga:""
      });
      this.profileForm.get("email").disable();
      this.profileForm.get("username").disable();
      this.profileForm.get("saga").disable();
      
    }else{
      this.profileForm.get('quantity').setValidators();
      this.profileForm.get('quantity').updateValueAndValidity();
      this.profileForm.get("email").enable();
      this.profileForm.get("username").enable();
      this.profileForm.get("saga").enable();
    }
  }

  showGender(value: number): string {    
    return this.genders.find((gender) => gender.value === value)?.label;
  }

  getActualQuarter():string{
    const actualDate = new Date();
    const year = actualDate.getFullYear();
    const month = actualDate.getMonth() + 1;    
    let quarter = 0;
    if (month >= 1 && month <= 4) {
      quarter = 1;
    } else if (month >= 5 && month <= 8) {
      quarter = 2;
    } else if (month >= 9 && month <= 12) {
      quarter = 3;
    }    
    return `Q${quarter}'${String(year).slice(-2)}`;
  }

  searchIntern($event){
    if ($event.query != null) {
      this.personService.searchIntern($event.query).subscribe({
        next: (res: Intern[]) => {
          this.groupIntern = res.map((intern) => this.mappingIntern(intern));
        }
      });
    }
  }

  mappingIntern(intern: Intern): any {
    let username  =  intern.username ? intern.username : "Añadir nuevo becario";
    return {
      field: intern.name + ' ' + intern.lastname + ' - ' + username,
      value: intern,
    };
  }

  onSelectIntern(event){
    this.intern = event.value;
    this.intern.center = this.intern.center ? this.intern.center : this.centers.find(center => center.name=="Valencia");
    this.profileForm.patchValue({
      center:this.intern.center
    });
    this.fillInputs(this.intern);
    this.matchByProvince();
    this.updateFormGroup();
  }

  matchByProvince(){
    this.intern.province = this.provinces.find(province => province.province == this.intern.center?.name);
    this.profileForm.patchValue({
        province:this.intern.province
      });
  }

  fillInputs(intern:Intern){
    this.profileForm.patchValue({
      name: intern.name,
      lastname: intern.lastname,
      username:intern.username,
      email: intern.email,
      center: intern.center,
      hours: intern.hours,
      saga:intern.saga
    });
  }

  sizeHeight(){
    const availableHeight = document.documentElement.clientHeight;
    let proportion = 0.84;
    if(this.isNew)proportion= 0.9;
    const maxHeight = Math.floor(availableHeight * proportion);
    const dialogEl = this.elementRef.nativeElement.parentElement.parentElement;
    dialogEl.style.maxHeight = maxHeight + 'px';
  }

  closeWindow(){
    this.ref.close();
  }
  
  onSave(){
    if(this.profileForm.valid){
      this.formToInternObject();
      if(this.checked){
        this.quantity = this.profileForm.get('quantity').value;
        this.internService.saveBulk(this.intern,this.quantity).subscribe(
          (result)=>{
            if(this.isNew){
              this.snackbarService.showMessage("Se ha añadido correctamente el Becario");
            }else{
              this.snackbarService.showMessage("Se ha actualizado el Becario");
            }
            this.closeWindow();
          },
          (error)=>{
            this.snackbarService.error(error.message);
          }
        );
      }else{
        this.internService.save(this.intern).subscribe(
          (result)=>{
            if(this.isNew){
                this.snackbarService.showMessage("Se ha añadido correctamente el Becario");
            }else{
                this.snackbarService.showMessage("Se ha actualizado el Becario");
            }
            this.closeWindow();
          },
          (error)=>{
            this.snackbarService.error(error.message);
          }
        );
      }
    }
  }
  
  formToInternObject(){
    this.intern.saga = this.profileForm.get('saga').value;
    this.intern.period = this.profileForm.get('period').value;
    this.intern.username = this.profileForm.get('username').value;
    this.intern.name = this.profileForm.get('name').value;
    this.intern.lastname = this.profileForm.get('lastname').value;
    this.intern.email = this.profileForm.get('email').value;
    this.intern.gender = this.profileForm.get('gender').value;
    this.intern.education = this.profileForm.get('education').value ? this.educations.find(education=>education.name === this.profileForm.get('education').value.name) : null;
    this.intern.educationCenter = this.profileForm.get('educationCenter').value ? this.educationsCenter.find(educationCenter=>educationCenter.name === this.profileForm.get('educationCenter').value.name) : null;
    this.intern.center = this.profileForm.get('center').value ? this.centers.find(center=>center.name === this.profileForm.get('center').value.name): null;
    this.intern.province = this.profileForm.get('province').value ? this.provinces.find(province=>province.province === this.profileForm.get('province').value.province) : null; 
    this.intern.startDate = this.profileForm.get('startDate').value;
    this.intern.endDate = this.profileForm.get('endDate').value;
    this.intern.hours = this.profileForm.get('hours').value;
    this.intern.customer = this.profileForm.get('customer').value;
    this.intern.code = this.profileForm.get('code').value;
    this.intern.englishLevel = this.profileForm.get('englishLevel').value ? this.englishLevels.find(englishLevel=> englishLevel.name === this.profileForm.get('englishLevel').value.name) : null;
    this.intern.mentor = this.profileForm.get('mentor').value;
    this.intern.coordinator = this.profileForm.get('coordinator').value;
    this.intern.hrManager = this.profileForm.get('rrhh').value;
    this.intern.active = this.profileForm.get('active').value;
  }
}
