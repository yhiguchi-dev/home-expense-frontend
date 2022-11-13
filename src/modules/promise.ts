import { CancellationError } from "@/modules/error";

export const promiseWithCancellation = async <T>(
  promise: Promise<T>,
  signal: AbortSignal
): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new CancellationError("signal already aborted"));
    }
    void promise
      .then((value) => {
        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
    signal.addEventListener(
      "abort",
      () => {
        reject(new CancellationError("aborted"));
      },
      { once: true }
    );
  });
};
