import { Record } from "./record.interface";
import { Parameter } from "./parameter.interface";

export class Incident {
  readonly nhits: string;
  readonly parameters: Parameter;
  readonly records: Record[];
}
