/**
 * Handles a promise and returns a tuple indicating success or failure.
 *
 * @param promise - The promise to handle.
 * @param errorExt - Optional additional error information to include in the error response.
 * @returns A promise that resolves to a tuple: [null, result] on success or [error, undefined] on failure.
 *
 * @example
 * const fetchData = async () => {
 *     const [error, data] = await tryCatchAsync(fetch('/api/data'));
 *     if (error) {
 *         console.error('Error fetching data:', error);
 *     } else {
 *         console.log('Fetched data:', data);
 *     }
 * };
 *
 * @example
 * const saveData = async (data) => {
 *     const [error, result] = await tryCatchAsync(saveToDatabase(data), { context: 'Saving user data' });
 *     if (error) {
 *         console.error('Error saving data:', error);
 *     } else {
 *         console.log('Data saved successfully:', result);
 *     }
 * };
 *
 * @example
 * const processData = async () => {
 *     const [error, result] = await tryCatchAsync(processHeavyTask());
 *     if (error) {
 *         console.error('Error processing data:', error);
 *     } else {
 *         console.log('Processing result:', result);
 *     }
 * };
 */
export function tryCatchAsync<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt);
                return [parsedError, undefined];
            }
            return [err, undefined];
        });
}

/**
 * Executes a synchronous operation and returns a tuple indicating success or failure.
 *
 * @param operation - The synchronous operation to execute.
 * @param errorExt - Optional additional error information to include in the error response.
 * @returns A tuple: [null, result] on success or [error, undefined] on failure.
 *
 * @example
 * const result = tryCatchSync(() => {
 *     // Some synchronous operation
 *     return "Success!";
 * });
 *
 * if (result[0]) {
 *     console.error('Error:', result[0]);
 * } else {
 *     console.log('Result:', result[1]);
 * }
 *
 * @example
 * const calculate = (a: number, b: number) => {
 *     return tryCatchSync(() => {
 *         if (b === 0) {
 *             throw new Error("Division by zero");
 *         }
 *         return a / b;
 *     });
 * };
 *
 * const [error, divisionResult] = calculate(10, 0);
 * if (error) {
 *     console.error('Error:', error);
 * } else {
 *     console.log('Division Result:', divisionResult);
 * }
 */
export function tryCatchSync<T, U = Error>(operation: () => T, errorExt?: Partial<U>): [U, undefined] | [null, T] {
    try {
        const result = operation();
        return [null, result];
    } catch (err) {
        if (errorExt) {
            const parsedError = Object.assign({}, err, errorExt) as U;
            return [parsedError, undefined];
        }
        return [err as U, undefined];
    }
}