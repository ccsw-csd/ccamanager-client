import { Person } from "src/app/personal/models/Person";

export class Customer {
    id: number;
    name: string;
    managers: Person[];
    managersParsed: string;
    numberOfPersonWithoutOrganization: number;
}