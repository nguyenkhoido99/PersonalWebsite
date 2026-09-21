/**
 * State Pattern - Navigation State Machine
 * Avoids if-else hell, each state transition is explicit
 */
export const NavigationStates = {
  IDLE: 'IDLE',
  SCROLLING: 'SCROLLING',
  MODAL_OPEN: 'MODAL_OPEN',
  MOBILE_MENU_OPEN: 'MOBILE_MENU_OPEN'
};

export class NavigationStateContext {
  constructor() {
    this.currentState = NavigationStates.IDLE;
    this.listeners = [];
  }
  transitionTo(newState) {
    const previous = this.currentState;
    this.currentState = newState;
    this.listeners.forEach(fn => fn(newState, previous));
  }
  getState() { return this.currentState; }
  onChange(fn) { this.listeners.push(fn); }
}
