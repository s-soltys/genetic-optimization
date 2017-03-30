export class Optimizer<P> {
    constructor(private config: Config<P>){

    }

    findOptimal(population: P[]): P {
        let optimal: EvaluatedInput<P> = { input: population[0], score: Number.NEGATIVE_INFINITY };
        let generation = 0;

        while (!this.config.endCondition(optimal.input, optimal.score, generation++)) {
            let results = population.map(input => ({ input, score: this.config.evaluate(input) }));

            results.forEach(current => {
                if (current.score > optimal.score){
                    optimal = current;
                }
            });

            population = this.crossover(results);
        }

        return optimal.input;
    }

    private crossover(previousGeneration: EvaluatedInput<P>[]): P[] {
        const nextGeneration = new Array<P>(previousGeneration.length);

        for (let i = 0; i < nextGeneration.length; i++){
            let j = Math.floor(nextGeneration.length * Math.random()); // TODO ensure j != i

            let parentA = previousGeneration[i].input;
            let parentB = previousGeneration[j].input;

            let child = this.config.crossover(parentA, parentB);

            nextGeneration[i] = child;
        }

        return nextGeneration;
    }

}

export interface EvaluatedInput<P> {
    input: P;
    score: number;
}

export interface Config<P> {
    endCondition: (currentOptimalInput: P, score: number, generation: number) => boolean;
    crossover: (inputA: P, inputB: P) => P;
    evaluate: (input: P) => number;
}