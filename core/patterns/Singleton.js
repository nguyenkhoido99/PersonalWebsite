/**
 * Singleton Pattern - Base class
 * SOLID: Ensures SRP - single global instance, controlled access
 */
export class Singleton {
  static _instance = null;
  static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
