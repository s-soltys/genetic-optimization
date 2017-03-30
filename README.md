# Genetic optimization
[![Build Status](https://travis-ci.org/s-soltys/genetic-optimization.svg?branch=master)](https://travis-ci.org/s-soltys/genetic-optimization)

A simple library used to find an optimal solution to a problem.

### How to install
```
npm install --save genetic-optimization
```

### How to use
Example implementation of a simple exponential math function:
```typescript
import { Optimizer } from "genetic-optimization";

// the optimized exponential function
let expFn = (x: number) => -Math.pow(x - expectedSolution, 2);
let expectedSolution = 25;

// construct the optimizer
let optimizer = new Optimizer<number>({
    evaluate: expFn,
    crossover: (a, b) => (a+b)/2 + (Math.random()-0.5)/4,
    endCondition: (input, score, generation) => generation === 10
});

// generate initial population
let population = new Array(5000);
for (let i = 0; i < population.length; i++){
    population[i] = (Math.random() - 0.5) * 100;
}

// run the optimization algorithm
let foundSolution = optimizer.findOptimal(population);

// assert solution
expect(foundSolution).toBeCloseTo(expectedSolution, 1);
```