import { Center } from "src/app/core/models/Center";
import { Cost } from "./Cost";

export class CostCenter {
    id: number;
    name: string;
    centers: Center[];
    centersParsed: string;
    costs: Cost[];
}