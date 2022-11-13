const encode = (value: ArrayBuffer): string => {
  const str = toString(value);
  const base64Value = window.btoa(str);
  return base64Value
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const decode = (value: string): ArrayBuffer => {
  const base64Value = value.replace(/-/g, "+").replace(/_/g, "/");
  return toArrayBuffer(window.atob(base64Value));
};

const toArrayBuffer = (str: string): ArrayBuffer => {
  const array = new Uint8Array(str.length);
  Array.from(str).forEach((value, index) => {
    array[index] = value.charCodeAt(0);
  });
  return array.buffer;
};

const toString = (buf: ArrayBuffer): string => {
  const array = Array.from(new Uint8Array(buf)).map((value): string => {
    return String.fromCharCode(value);
  });
  return array.join("");
};

export const base64url = {
  encode,
  decode,
};
