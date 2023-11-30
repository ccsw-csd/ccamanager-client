import { Province } from 'src/app/core/models/Province';
import { Center } from 'src/app/core/models/Center';
import { CustomerSimple } from 'src/app/maintenance/customer/models/CustomerSimple';

export class Person {
  id: number;
  saga: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  customer: string;
  customers: CustomerSimple[];
  grade: string;
  role: string;
  hours: number;
  department: string;
  manager: string;
  parent: Person;
  center: Center;
  province: Province;
  active: number;
  businesscode:string;
}
