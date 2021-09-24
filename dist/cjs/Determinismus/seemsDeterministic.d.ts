export interface ArgGeneratorI<T extends any[]> {
    (): T;
}
export interface ToleranceFuncI<R extends any> {
    (a: R, b: R): boolean;
}
export interface _isLikelyDeterministicKwargsI<F extends (...args: any[]) => any> {
    /**The function to be checked. */
    func: F;
    /**A function that will generate args for the function being checked. */
    argGenerator: ArgGeneratorI<Parameters<F>>;
    /**The explore width of the the determinism check. (How many new sets of args will be passed.) */
    width: number;
    /**The explore depth of the the determinism check. (How many times a function and a set of args will be checked.) */
    depth: number;
    toleranceFunc: ToleranceFuncI<ReturnType<F>>;
}
export interface isLikelyDeterministicKwargsI<F extends (...args: any[]) => any> {
    /**The function to be checked. */
    func: F;
    /**A function that will generate args for the function being checked. */
    argGenerator: ArgGeneratorI<Parameters<F>>;
    /**The explore width of the the determinism check. (How many new sets of args will be passed.) */
    width?: number;
    /**The explore depth of the the determinism check. (How many times a function and a set of args will be checked.) */
    depth?: number;
    toleranceFunc?: ToleranceFuncI<ReturnType<F>>;
}
/**
 *
 * @param kwargs Keyword arguments containing the
 * @returns
 */
export declare const seemsDeterministic: <F extends (...args: any[]) => any>(kwargs: isLikelyDeterministicKwargsI<F>) => boolean;
