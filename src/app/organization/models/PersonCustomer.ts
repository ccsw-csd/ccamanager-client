import { Customer } from "src/app/maintenance/customer/models/Customer";
import { Person } from "src/app/personal/models/Person";

export class PersonCustomer {
    id: number;
    person: Person;
    parent: Person;
    customer: Customer;
}