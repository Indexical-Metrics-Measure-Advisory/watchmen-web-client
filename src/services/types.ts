/** let given keys of given type to be required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
/** let given keys of given type to be partial */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;