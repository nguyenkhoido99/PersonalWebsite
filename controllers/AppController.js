/**
 * AppController - Singleton + Facade entry
 * SRP: Only bootstraps other controllers, no UI logic
 */
import { Singleton } from '../core/patterns/Singleton.js';
import { NavigationController } from './NavigationController.js';
import { ProjectController } from './ProjectController.js';
import { BlogController } from './BlogController.js';
import { SoundController } from './SoundController.js';
import { ThemeController } from './ThemeController.js';
import { HomeModel } from '../models/HomeModel.js';
import { SkillsModel } from '../models/SkillsModel.js';
import { AboutModel } from '../models/AboutModel.js';
import { ResumeModel } from '../models/ResumeModel.js';
import { rawBlogs } from '../models/BlogsModel.js';

export class AppController extends Singleton {
  constructor() {
    super();
    if (AppController._initialized) return AppController._instance;
    this.navController = new NavigationController();
    this.projectController = new ProjectController();
    this.blogController = new BlogController();
    this.soundController = SoundController.getInstance();
    this.themeController = ThemeController.getInstance();
    AppController._initialized = true;
  }
  getNavController() { return this.navController; }
  getProjectController() { return this.projectController; }
  getBlogController() { return this.blogController; }
  getSoundController() { return this.soundController; }
  getHomeController() { return { getData: () => HomeModel }; }
  getSkillsData() { return SkillsModel; }
  getAboutData() { return AboutModel; }
  getResumeData() { return ResumeModel; }
  getBlogsData() { return rawBlogs; }
}
AppController._initialized = false;