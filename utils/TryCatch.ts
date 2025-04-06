// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * A utility function to handle promises with try-catch
 * and return a result object, courtesy of t3.
 *
 * @param promise The promise to be executed
 * @returns A promise that resolves to an object with either the data or the error
 * @link https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
