import type { SchemaObject } from "ajv/dist/ajv";
import type { JTDDataType } from "ajv/dist/jtd";

export type JTDSchema = SchemaObject;
export type JTD<T> = JTDDataType<T>;
