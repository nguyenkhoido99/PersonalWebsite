/**
 * APP Bootstrap - TAB SYSTEM + BLOGS + SOUNDS
 * Fix: Only render active tab, with sound integration
 * Patterns: Singleton, Observer, Factory, Facade, State
 */
import { AppController } from '../controllers/AppController.js';
import { AppFacade } from '../core/patterns/Facade.js';
import { NavbarView } from '../views/components/Navbar.js';
import { ProjectModalView } from '../views/components/ProjectModal.js';
import { BlogModalView } from '../views/components/BlogModal.js';
import { SoundControlView } from '../views/components/SoundControl.js';
import { HomeView } from '../views/HomeView.js';
import { ProjectsView } from '../views/ProjectsView.js';
import { BlogsView } from '../views/BlogsView.js';
import { SkillsView } from '../views/SkillsView.js';
import { AboutView } from '../views/AboutView.js';
import { ResumeContactView } from '../views/ResumeContactView.js';
import { eventBus } from '../core/patterns/Observer.js';

class Application {
  constructor() {
    this.appController = AppController.getInstance();
    this.facade = new AppFacade();
    this.viewsCache = new Map();
    this.currentSection = 'home';
    // Expose sound controller globally for hover sounds
    window.soundController = this.facade.getSoundController();
  }

  init() {
    const appRoot = document.getElementById('app');
    
    // Navbar
    const navbar = new NavbarView(this.facade);
    appRoot.appendChild(navbar.render());

    // Content container - single viewport
    const content = document.createElement('div');
    content.id = 'content';
    appRoot.appendChild(content);
    this.contentEl = content;

    // Modals
    const projectModal = new ProjectModalView();
    const blogModal = new BlogModalView();
    document.body.appendChild(projectModal.render());
    document.body.appendChild(blogModal.render());

    // Sound control mount
    const soundControl = new SoundControlView(this.facade.getSoundController());
    const mount = document.getElementById('soundControlMount');
    if (mount) mount.appendChild(soundControl.render());

    // Initial render: HOME only
    this.renderSection('home');

    // Observer: tab change
    eventBus.subscribe('nav:activeChanged', (sectionId) => {
      this.renderSection(sectionId);
    });

    // CTA buttons delegation + sound
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-go]');
      if (btn) {
        this.facade.getSoundController().ensureContext();
        this.facade.navigateTo(btn.dataset.go);
      }
    });

    // First user interaction to enable audio
    const enableAudio = () => {
      this.facade.getSoundController().init();
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);

    console.log('%c[SYSTEM] MVC + Blogs + Sounds initialized', 'color:#00F0FF', {
      patterns: ['Singleton','Observer','Factory','Facade','State'],
      newFeatures: ['Blogs full-scene', 'Procedural BGM + SFX']
    });
  }

  getViewInstance(sectionId) {
    if (this.viewsCache.has(sectionId)) return this.viewsCache.get(sectionId);
    let view = null;
    switch(sectionId) {
      case 'home': view = new HomeView(this.facade.getHomeData()); break;
      case 'projects': view = new ProjectsView(this.facade.getProjects(), this.facade); break;
      case 'blogs': view = new BlogsView(this.facade.getBlogs(), this.facade); break;
      case 'skills': view = new SkillsView(this.facade.getSkills()); break;
      case 'about': view = new AboutView(this.facade.getAbout()); break;
      case 'resume': view = new ResumeContactView(this.facade.getResume()); break;
      default: view = new HomeView(this.facade.getHomeData());
    }
    const el = view.render();
    this.viewsCache.set(sectionId, el);
    return el;
  }

  renderSection(sectionId) {
    this.contentEl.innerHTML = '';
    const activeView = this.getViewInstance(sectionId);
    this.viewsCache.forEach((el) => el.classList.remove('active'));
    activeView.classList.add('active');
    this.contentEl.appendChild(activeView);
    this.currentSection = sectionId;
    this.contentEl.scrollTop = 0;
  }
}

document.addEventListener('DOMContentLoaded', () => new Application().init());