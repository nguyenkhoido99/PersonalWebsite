import { NavigationStateContext, NavigationStates } from '../core/patterns/State.js';
import { eventBus } from '../core/patterns/Observer.js';

export class NavigationController {
  constructor() {
    this.stateContext = new NavigationStateContext();
    this.activeSection = 'home';
    this.stateContext.onChange((newState) => {
      eventBus.notify('nav:stateChanged', newState);
    });
    window.addEventListener('scroll', () => this.handleScroll());
  }
  navigateTo(sectionId) {
    this.stateContext.transitionTo(NavigationStates.SCROLLING);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = sectionId;
    eventBus.notify('nav:activeChanged', sectionId);
    setTimeout(() => this.stateContext.transitionTo(NavigationStates.IDLE), 800);
  }
  handleScroll() {
    const sections = ['home','projects','skills','about','resume'];
    for (let id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        if (this.activeSection !== id) {
          this.activeSection = id;
          eventBus.notify('nav:activeChanged', id);
        }
        break;
      }
    }
  }
}
