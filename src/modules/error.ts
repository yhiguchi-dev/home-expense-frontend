export class NetworkError extends Error {
  code: number;
  constructor(code: number, message?: string) {
    super(message);
    this.name = "NetworkError";
    this.code = code;
  }
}

export class CancellationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "CancellationError";
  }
}
