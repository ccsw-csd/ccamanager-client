import { Person } from "src/app/personal/models/Person";
import { OrganizationPersonCustomer } from "./OrganizationPersonCustomer";

export class OrganizationCustomer {
    id: number;
    name: string;
    
    members: OrganizationPersonCustomer[];
}