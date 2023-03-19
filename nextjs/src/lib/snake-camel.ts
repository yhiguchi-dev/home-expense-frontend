const convertToSnakeString = (value: string): string => {
  return value
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

const convertToSnake = <RETURN>(value: Record<string, object>): RETURN => {
  const result: Record<string, object> = {};
  Object.keys(value).forEach((key) => {
    result[convertToSnakeString(key)] = value[key];
  });
  return result as RETURN;
};

const convertToCamelString = (value: string): string => {
  return value
    .split("_")
    .map((value, index) => {
      if (index === 0) {
        return value.toLowerCase();
      }
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    })
    .join("");
};

const convertToCamel = <RETURN>(value: Record<string, object>): RETURN => {
  const result: Record<string, object> = {};
  Object.keys(value).forEach((key) => {
    result[convertToCamelString(key)] = value[key];
  });
  return result as RETURN;
};

export const snakeCamel = {
  convertToSnake,
  convertToCamel,
};
