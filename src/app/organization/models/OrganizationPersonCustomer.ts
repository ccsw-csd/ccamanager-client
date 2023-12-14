import { Person } from "src/app/personal/models/Person";

export class OrganizationPersonCustomer {
    id: number;
    
    person: Person;
    photo: string; 

    parent: number;
}