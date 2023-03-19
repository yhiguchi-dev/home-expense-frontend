export const isHTMLInputElement = (
  value: unknown
): value is HTMLInputElement => {
  const element = value as HTMLInputElement;
  return element.value !== undefined;
};
