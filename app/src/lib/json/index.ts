import Ajv from "ajv/dist/jtd";

import { JSONParseError, JSONSerializeError } from "@/lib/json/error";
import type { JTDSchema } from "@/lib/json/type";

const ajv = new Ajv();

const serialize = (schema: JTDSchema, data: unknown): string => {
  try {
    const serializer = ajv.compileSerializer(schema);
    return serializer(data);
  } catch (e: unknown) {
    const options = {
      cause: e,
    };
    throw JSONSerializeError(`data serialize failed: ${String(data)}`, options);
  }
};

const parse = <T>(schema: JTDSchema, json: string): T => {
  const parser = ajv.compileParser<T>(schema);
  const parsed = parser(json);
  if (parsed === undefined) {
    throw JSONParseError(`json parse failed: ${json}`);
  }
  return parsed;
};

export const json = {
  serialize,
  parse,
};
