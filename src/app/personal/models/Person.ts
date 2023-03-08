import { Province } from 'src/app/core/models/Province';
import { Person_role } from 'src/app/core/models/Person_role';
import { Center } from 'src/app/core/models/Center';

export class Person {
  id: number;
  saga: string;
  username: string;
  name: string;
  lastname: string;
  customer: string;
  grade: string;
  role: Person_role;
  hours: number;
  center: Center;
  province: Province;
  active: number;
  businesscode:string;
}
