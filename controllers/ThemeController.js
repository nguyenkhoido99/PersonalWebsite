import { Singleton } from '../core/patterns/Singleton.js';

export class ThemeController extends Singleton {
  constructor() {
    super();
    this.theme = 'cyberpunk';
  }
  getColors() {
    return { bg: '#05070A', cyan: '#00F0FF', magenta: '#FF006B', yellow: '#FFE600' };
  }
}
