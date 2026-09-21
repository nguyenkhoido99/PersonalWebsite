/**
 * Observer Pattern - EventBus
 * Decouples Views <-> Controllers (DIP + OCP)
 * Views subscribe, Controllers publish. No direct dependency.
 */
export class EventBus {
  constructor() {
    this.events = new Map();
  }
  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) this.events.set(eventName, []);
    this.events.get(eventName).push(callback);
    return () => this.unsubscribe(eventName, callback);
  }
  unsubscribe(eventName, callback) {
    if (!this.events.has(eventName)) return;
    this.events.set(eventName, this.events.get(eventName).filter(cb => cb !== callback));
  }
  notify(eventName, data) {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName).forEach(cb => cb(data));
  }
}
export const eventBus = new EventBus();
