import { rawBlogs, BlogModel } from '../models/BlogsModel.js';
import { eventBus } from '../core/patterns/Observer.js';

class BlogFactory {
  static create(raw) {
    if (!raw.id || !raw.title) throw new Error('Invalid blog data');
    return new BlogModel(raw);
  }
  static createMany(list) { return list.map(r => this.create(r)); }
}

export class BlogController {
  constructor() {
    this.blogs = BlogFactory.createMany(rawBlogs);
  }
  getAll() { return this.blogs; }
  getById(id) { return this.blogs.find(b => b.id === id); }
  openDetail(id) {
    const blog = this.getById(id);
    if (blog) eventBus.notify('blog:openDetail', blog);
  }
  closeDetail() {
    eventBus.notify('blog:closeDetail');
  }
}
