import { Optimizer } from "./optimizer";

describe('Genetic optimizer', () => {
    it('can be constructed', () => {
        let optimizer = new Optimizer<number>({} as any);
        expect(optimizer).not.toBeNull();
        expect(optimizer.findOptimal).toBeDefined();
    });

    it('can optimize simple exp math function', () => {
        let expectedSolution = 25;
        let expFn = (x: number) => -Math.pow(x - expectedSolution, 2);

        let optimizer = new Optimizer<number>({
            evaluate: expFn,
            crossover: (a, b) => (a+b)/2 + (Math.random()-0.5)/4,
            endCondition: (input, score, generation) => generation === 10
        });

        let population = new Array(5000);
        for (let i = 0; i < population.length; i++){
            population[i] = (Math.random() - 0.5) * 100;
        }

        let foundSolution = optimizer.findOptimal(population);

        expect(foundSolution).toBeCloseTo(expectedSolution, 1);
    });
});