export class InvalidKeyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidKeyError';
    }
}
