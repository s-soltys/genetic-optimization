export const XXX = 123;

export interface GOptimizer<P> {
    findOptimal(population: P[]): P;
}

export interface EvaluatedInput<P> {
    input: P;
    score: number;
}

export interface Config<P> {
    maxGenerations: number;
    endCondition: (currentOptimalInput: P, score: number) => boolean;
    crossover: (inputA: P, inputB: P) => P;
    evaluate: (input: P) => number;
}