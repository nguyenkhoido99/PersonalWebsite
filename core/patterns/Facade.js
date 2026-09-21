/**
 * Facade Pattern - Simplifies system for Views
 * DIP: Views depend on Facade abstraction, not concrete controllers
 */
import { AppController } from '../../controllers/AppController.js';

export class AppFacade {
  constructor() {
    this.app = AppController.getInstance();
  }
  getHomeData() { return this.app.getHomeController().getData(); }
  getProjects() { return this.app.getProjectController().getAll(); }
  getProjectById(id) { return this.app.getProjectController().getById(id); }
  getSkills() { return this.app.getSkillsData(); }
  getAbout() { return this.app.getAboutData(); }
  getResume() { return this.app.getResumeData(); }
  getBlogs() { return this.app.getBlogController().getAll(); }
  getBlogById(id) { return this.app.getBlogController().getById(id); }
  openBlogDetail(id) { return this.app.getBlogController().openDetail(id); }
  getSoundController() { return this.app.getSoundController(); }
  navigateTo(sectionId) { return this.app.getNavController().navigateTo(sectionId); }
  openProjectModal(id) { return this.app.getProjectController().openModal(id); }
}