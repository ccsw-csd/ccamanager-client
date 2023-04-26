import { Province } from 'src/app/core/models/Province';
import { Center } from 'src/app/core/models/Center';

export class Person {
  id: number;
  saga: string;
  username: string;
  name: string;
  lastname: string;
  email:string;
  customer: string;
  grade: string;
  role: string;
  hours: number;
  department: string;
  manager: string;
  center: Center;
  province: Province;
  active: number;
  businesscode:string;
}
