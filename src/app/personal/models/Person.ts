import { Province } from 'src/app/core/models/Province';
import { Role } from 'src/app/core/models/Role';
import { Center } from 'src/app/core/models/Center';

export class Person {
  id: number;
  saga: string;
  username: string;
  name: string;
  lastname: string;
  customer: string;
  grade: string;
  role: Role;
  hours: number;
  center: Center;
  province: Province;
  active: number;
  businesscode:string;
}
