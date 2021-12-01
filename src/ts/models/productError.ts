export class ProductError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ProductError.prototype);
    }
}
