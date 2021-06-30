export class Test {
    constructor(
        public data: string
    ) {}
}

export namespace TestRepository {
    export function getTest()
    {
        return new Test("Some string.");
    }
}