import { isLikelyDeterministic } from "./isLikelyDeterministic";
import { performance } from "perf_hooks";

export const CheckOrderTestSuiteA = ()=>{

    describe("Basic functionality", ()=>{

        test("Detects probable determinism", ()=>{

            const func = (a : number, b : number)=>a+b;
            const toleranceFunc = (a : number, b : number)=>{
                return Math.abs(a - b) < 0.0001
            }

            const generator = () : [number, number]=>[
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ]

            const i = Math.floor(Math.random() * 900) + 100;
            
            const isDeterministic = Array(i).fill(null).reduce((last)=>{

                return last && isLikelyDeterministic({
                    func : func, 
                    argGenerator : generator,
                    width : Math.floor(Math.random() * 100),
                    depth : Math.floor(Math.random() * 100),
                    toleranceFunc: toleranceFunc
                })

            }, true)

            expect(isDeterministic).toBe(true);
   
        })

        test("Detects indeterminism", ()=>{

            const func = (a : number, b : number)=>performance.now();

            const generator = () : [number, number]=>[
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ]

            const i = Math.floor(Math.random() * 900) + 100;
            
            const isDeterministic = Array(i).fill(null).reduce((last)=>{

                return last && isLikelyDeterministic({
                    func : func, 
                    argGenerator : generator,
                    width : Math.floor(Math.random() * 100),
                    depth : Math.floor(Math.random() * 100)
                })

            }, true)

            expect(isDeterministic).toBe(false);

        })

        test("Autogenerates width, depth, and tolerance", ()=>{

            const func = (a : number, b : number)=>performance.now();

            const generator = () : [number, number]=>[
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ]

            const i = Math.floor(Math.random() * 900) + 100;
            
            const isDeterministic = Array(i).fill(null).reduce((last)=>{

                return last && isLikelyDeterministic({
                    func : func, 
                    argGenerator : generator,
                })

            }, true)

            expect(isDeterministic).toBe(false);

        })

    })

}; CheckOrderTestSuiteA();