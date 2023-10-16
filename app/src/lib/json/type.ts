import { SchemaObject } from "ajv/dist/ajv";
import { JTDDataType } from "ajv/dist/jtd";

export type JTDSchema = SchemaObject;
export type JTD<T> = JTDDataType<T>;
