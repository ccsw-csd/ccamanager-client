import { Province } from 'src/app/core/models/Province';
import { Center } from 'src/app/core/models/Center';
import { CustomerSimple } from 'src/app/maintenance/customer/models/CustomerSimple';
import { PersonCustomer } from 'src/app/organization/models/PersonCustomer';

export class Person {
  id: number;
  saga: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  customer: string;  
  customers: CustomerSimple[];
  personCustomers: PersonCustomer[];
  grade: string;
  role: string;
  hours: number;
  department: string;
  manager: string;
  parents: string;
  center: Center;
  province: Province;
  active: number;
  businesscode:string;
}
