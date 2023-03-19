import { CancellationError, RetryError } from "@/lib/error";

export const promiseWithCancellation = async <T>({
  promise,
  signal,
}: {
  promise: Promise<T>;
  signal: AbortSignal;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new CancellationError("signal already aborted"));
    }
    promise
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

export const promiseWithRetry = async <T>({
  promise,
  retries,
  isRetry,
  delay,
}: {
  promise: Promise<T>;
  retries: number;
  isRetry: (result: T) => boolean;
  delay: number;
}): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    const result = await promise;
    if (!isRetry(result)) {
      return result;
    }
    if (i !== retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new RetryError("number of retries exceeded");
};
