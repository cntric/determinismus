import { isLikelyDeterministic } from "./isLikelyDeterministic";
import { performance } from "perf_hooks";
import { withPrecision } from "tulleries";
export const CheckOrderTestSuiteA = () => {
    describe("Basic functionality", () => {
        test("Detects probable determinism", () => {
            const func = (a, b) => a + b;
            const generator = () => [
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ];
            const i = Math.floor(Math.random() * 900) + 100;
            const isDeterministic = Array(i).fill(null).reduce((last) => {
                return last && isLikelyDeterministic({
                    func: func,
                    argGenerator: generator,
                    width: Math.floor(Math.random() * 100),
                    depth: Math.floor(Math.random() * 100),
                    toleranceFunc: withPrecision()
                });
            }, true);
            expect(isDeterministic).toBe(true);
        });
        test("Detects indeterminism", () => {
            const func = (a, b) => performance.now();
            const generator = () => [
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ];
            const i = Math.floor(Math.random() * 900) + 100;
            const isDeterministic = Array(i).fill(null).reduce((last) => {
                return last && isLikelyDeterministic({
                    func: func,
                    argGenerator: generator,
                    width: Math.floor(Math.random() * 100),
                    depth: Math.floor(Math.random() * 100)
                });
            }, true);
            expect(isDeterministic).toBe(false);
        });
        test("Autogenerates width, depth, and tolerance", () => {
            const func = (a, b) => performance.now();
            const generator = () => [
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ];
            const i = Math.floor(Math.random() * 900) + 100;
            const isDeterministic = Array(i).fill(null).reduce((last) => {
                return last && isLikelyDeterministic({
                    func: func,
                    argGenerator: generator,
                });
            }, true);
            expect(isDeterministic).toBe(false);
        });
    });
};
CheckOrderTestSuiteA();
