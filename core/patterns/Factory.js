/**
 * Factory Pattern - Creates ProjectModel
 * OCP: Add new project types without modifying clients
 */
import { ProjectModel } from '../../models/ProjectsModel.js';

export class ProjectFactory {
  /**
   * @param {Object} raw
   * @returns {ProjectModel}
   */
  static create(raw) {
    if (!raw.id || !raw.title) throw new Error('Invalid project data');
    return new ProjectModel({
      id: raw.id,
      title: raw.title,
      type: raw.type || 'production',
      role: raw.role,
      platforms: raw.platforms,
      tech: raw.tech,
      problem: raw.problem,
      solution: raw.solution,
      metrics: raw.metrics,
      links: raw.links,
      thumbnail: raw.thumbnail,
      description: raw.description
    });
  }
  static createMany(list) {
    return list.map(r => this.create(r));
  }
}
