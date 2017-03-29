import { Optimizer } from "./optimizer";

describe('Genetic optimizer', () => {
    it('can be constructed', () => {
        let optimizer = new Optimizer<number>({} as any);
        expect(optimizer).not.toBeNull();
        expect(optimizer.findOptimal).toBeDefined();
    });
});