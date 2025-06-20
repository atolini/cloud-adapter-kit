"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
class DomainEvent {
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
exports.DomainEvent = DomainEvent;
