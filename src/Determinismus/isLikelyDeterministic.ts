export interface ArgGeneratorI<T extends any[]> {
    () : T
}

export interface ToleranceFuncI<R extends any>{
    (a : R, b : R) : boolean
}

export interface _isLikelyDeterministicKwargsI<F extends (...args : any[])=>any> {
    /**The function to be checked. */
    func : F,
    /**A function that will generate args for the function being checked. */
    argGenerator : ArgGeneratorI<Parameters<F>>,
    /**The explore width of the the determinism check. (How many new sets of args will be passed.) */
    width : number,
    /**The explore depth of the the determinism check. (How many times a function and a set of args will be checked.) */
    depth : number,
    toleranceFunc : ToleranceFuncI<ReturnType<F>>
}

const _isLikelyDeterministic = <F extends (...args : any[])=>any>(
    kwargs :_isLikelyDeterministicKwargsI<F>
) : boolean =>{

    return Array(kwargs.width).fill(null).reduce((last)=>{

        const args = kwargs.argGenerator();

        return last && Array(kwargs.depth).fill(null).reduce((last)=>{

            return last && kwargs.func(...args) === kwargs.func(...args);

        }, true)


    }, true) // start with the assumption that it is deterministic

}

export interface isLikelyDeterministicKwargsI<F extends (...args : any[])=>any> {
    /**The function to be checked. */
    func : F,
    /**A function that will generate args for the function being checked. */
    argGenerator : ArgGeneratorI<Parameters<F>>,
    /**The explore width of the the determinism check. (How many new sets of args will be passed.) */
    width? : number,
    /**The explore depth of the the determinism check. (How many times a function and a set of args will be checked.) */
    depth? : number,
    toleranceFunc? : ToleranceFuncI<ReturnType<F>>
}

/**
 * 
 * @param kwargs Keyword arguments containing the 
 * @returns 
 */
export const isLikelyDeterministic = <F extends (...args : any[])=>any>(
    kwargs : isLikelyDeterministicKwargsI<F>
) : boolean =>{

    return _isLikelyDeterministic({
        ...kwargs,
        width : kwargs.width ? kwargs.width : 100,
        depth : kwargs.depth ? kwargs.depth : 100,
        toleranceFunc : kwargs.toleranceFunc ? kwargs.toleranceFunc :
                            (a : ReturnType<F>, b : ReturnType<F>)=>a === b
    })

}