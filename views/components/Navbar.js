import { eventBus } from '../../core/patterns/Observer.js';

export class NavbarView {
  constructor(facade) {
    this.facade = facade;
    this.active = 'home';
    eventBus.subscribe('nav:activeChanged', (id) => this.setActive(id));
  }
  render() {
    const nav = document.createElement('nav');
    nav.className = 'cyber-nav';
    nav.innerHTML = `
      <div data-section="home" class="cyber-nav__logo">[ DNK<span class="neon-cyan">.DEV</span> ]</div>
      <div class="cyber-nav__links" id="navLinks">
        <a data-section="home" class="active">HOME</a>
        <a data-section="projects">PROJECTS</a>
        <a data-section="blogs">BLOGS</a>
        <a data-section="skills">SKILLS</a>
        <a data-section="about">ABOUT</a>
        <a data-section="resume">RESUME</a>
      </div>
      <div class="cyber-nav__right">
        <div id="soundControlMount"></div>
        <button class="cyber-nav__burger" id="burger">[=]</button>
      </div>
    `;
    nav.querySelectorAll('[data-section]').forEach(a => {
      a.addEventListener('click', () => {
        this.facade.navigateTo(a.dataset.section);
        if (window.soundController) window.soundController.playClick();
      });
    });
    const burger = nav.querySelector('#burger');
    const links = nav.querySelector('#navLinks');
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.addEventListener('click', () => links.classList.remove('open'));
    this.element = nav;
    return nav;
  }
  setActive(id) {
    this.active = id;
    if (!this.element) return;
    this.element.querySelectorAll('[data-section]').forEach(a => {
      a.classList.toggle('active', a.dataset.section === id);
    });
  }
}