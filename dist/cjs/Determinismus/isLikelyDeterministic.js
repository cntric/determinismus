"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLikelyDeterministic = void 0;
const _isLikelyDeterministic = (kwargs) => {
    return Array(kwargs.width).fill(null).reduce((last) => {
        const args = kwargs.argGenerator();
        return last && Array(kwargs.depth).fill(null).reduce((last) => {
            return last && kwargs.func(...args) === kwargs.func(...args);
        }, true);
    }, true); // start with the assumption that it is deterministic
};
/**
 *
 * @param kwargs Keyword arguments containing the
 * @returns
 */
const isLikelyDeterministic = (kwargs) => {
    return _isLikelyDeterministic(Object.assign(Object.assign({}, kwargs), { width: kwargs.width ? kwargs.width : 100, depth: kwargs.depth ? kwargs.depth : 100, toleranceFunc: kwargs.toleranceFunc ? kwargs.toleranceFunc :
            (a, b) => a === b }));
};
exports.isLikelyDeterministic = isLikelyDeterministic;
