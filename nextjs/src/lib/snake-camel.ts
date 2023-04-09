type SnakeToCamelKey<T extends string> = T extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<SnakeToCamelKey<U>>}`
  : T;

export type SnakeToCamel<T extends object | object[]> =
  T extends readonly object[]
    ? {
        [K in keyof T]: T[K] extends readonly object[] | object
          ? SnakeToCamel<T[K]>
          : T[K];
      }
    : {
        [K in keyof T as `${SnakeToCamelKey<string & K>}`]: T[K] extends object
          ? SnakeToCamel<T[K]>
          : T[K];
      };

type CamelToSnakeKey<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeKey<U>}`
  : S;

export type CamelToSnake<T extends object | object[]> =
  T extends readonly object[]
    ? {
        [P in keyof T]: T[P] extends readonly object[]
          ? CamelToSnake<T[P]>
          : T[P];
      }
    : {
        [K in keyof T as `${CamelToSnakeKey<string & K>}`]: T[K] extends object
          ? CamelToSnake<T[K]>
          : T[K];
      };
