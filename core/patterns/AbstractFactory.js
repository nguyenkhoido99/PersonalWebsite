/**
 * Abstract Factory (Factory Family) - Sci-Fi UI Family
 * Creates consistent themed components. Change family = change theme.
 */
export class SciFiComponentFactory {
  static createButton({ text, variant='primary', onClick }) {
    const btn = document.createElement('button');
    btn.className = `cyber-btn cyber-btn--${variant}`;
    btn.innerHTML = `<span class="cyber-btn__content">[ ${text} ]</span>`;
    if (onClick) btn.addEventListener('click', onClick);
    return btn;
  }
  static createCard() {
    const card = document.createElement('div');
    card.className = 'cyber-card';
    return card;
  }
  static createTag(text, ghost=false) {
    const tag = document.createElement('span');
    tag.className = `cyber-tag ${ghost ? 'ghost' : ''}`;
    tag.textContent = text;
    return tag;
  }
}
