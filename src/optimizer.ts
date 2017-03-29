import { GOptimizer, EvaluatedInput, Config } from "./optimize";

export class Optimizer<P> implements GOptimizer<P> {
    constructor(private config: Config<P>){

    }

    findOptimal(population: P[]): P {
        let optimal: EvaluatedInput<P> = { input: population[0], score: Number.NEGATIVE_INFINITY };
        let generation = 0;

        do {
            let results = population.map(input => ({ input, score: this.config.evaluate(input) }));

            results.forEach(current => {
                if (current.score > optimal.score){
                    optimal = current;
                }
            });

            population = this.crossover(results);
        } while (generation++ < this.config.maxGenerations && this.config.endCondition(optimal.input, optimal.score));

        return optimal.input;
    }

    private crossover(previousGeneration: EvaluatedInput<P>[]): P[] {
        let nextGeneration: P[] = new Array<P>(previousGeneration.length);

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