import { ProjectFactory } from '../core/patterns/Factory.js';
import { rawProjects } from '../models/ProjectsModel.js';
import { eventBus } from '../core/patterns/Observer.js';

export class ProjectController {
  constructor() {
    this.projects = ProjectFactory.createMany(rawProjects);
  }
  getAll() { return this.projects; }
  getById(id) { return this.projects.find(p => p.id === id); }
  openModal(id) {
    const project = this.getById(id);
    if (project) eventBus.notify('project:openModal', project);
  }
  closeModal() {
    eventBus.notify('project:closeModal');
  }
}
