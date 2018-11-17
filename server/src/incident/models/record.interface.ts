import { Field } from "./field.interface";

export class Record {
  readonly datasetid: string;
  readonly recordid: string;
  readonly fields: Field;
  readonly record_timestamp: string;
}
