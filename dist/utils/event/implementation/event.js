export class DomainEvent {
    createdAt;
    constructor() {
        this.createdAt = new Date();
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getEvent() {
        return JSON.parse(JSON.stringify(this));
    }
    getType() {
        return this.constructor.name;
    }
}
