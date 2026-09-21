import { eventBus } from '../../core/patterns/Observer.js';

export class BlogModalView {
  constructor() {
    eventBus.subscribe('blog:openDetail', (blog) => this.open(blog));
    eventBus.subscribe('blog:closeDetail', () => this.close());
  }
  render() {
    const modal = document.createElement('div');
    modal.className = 'blog-modal hidden';
    modal.id = 'blogModal';
    modal.innerHTML = `
      <div class="blog-modal__bg"></div>
      <div class="blog-modal__container">
        <div class="blog-modal__header">
          <div class="blog-modal__meta">
            <span class="cyber-tag" id="blogType"></span>
            <span id="blogDate" class="blog-date"></span>
          </div>
          <button class="cyber-btn cyber-btn--ghost small" id="blogCloseBtn">[ X ]</button>
        </div>
        <div class="blog-modal__content" id="blogContent"></div>
      </div>
    `;
    modal.querySelector('#blogCloseBtn').addEventListener('click', () => this.close());
    modal.querySelector('.blog-modal__bg').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) this.close();
    });
    this.element = modal;
    return modal;
  }
  open(blog) {
    if (!blog) return;
    this.element.querySelector('#blogType').textContent = blog.type.toUpperCase();
    this.element.querySelector('#blogDate').textContent = `${blog.date} • ${blog.readTime} • ${blog.author}`;
    const content = this.element.querySelector('#blogContent');
    // Simple markdown-like rendering
    const htmlContent = this.formatContent(blog.content);
    content.innerHTML = `
      <div class="blog-full-thumb">${blog.thumbnail}</div>
      <h1 class="blog-full-title">${blog.title}</h1>
      <p class="blog-full-summary">${blog.summary}</p>
      <div class="blog-full-tags">${blog.tags.map(t=>`<span class="cyber-tag">${t}</span>`).join('')}</div>
      <div class="blog-full-divider"></div>
      <div class="blog-full-body">${htmlContent}</div>
    `;
    this.element.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Scroll to top
    this.element.querySelector('.blog-modal__container').scrollTop = 0;
  }
  close() {
    if (!this.element) return;
    this.element.classList.add('hidden');
    document.body.style.overflow = '';
    if (window.soundController) window.soundController.playClose();
  }
  formatContent(md) {
    // Very light markdown to HTML
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\`\`\`ts([\s\S]*?)\`\`\`/g, '<div class="code-block"><pre><code>$1</code></pre></div>')
      .replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<div class="code-block"><pre><code>$1</code></pre></div>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\n/g, '<br>')
      .split('\n').map(line => {
        if (line.trim().startsWith('<')) return line;
        if (line.trim() === '') return '<br>';
        return `<p>${line}</p>`;
      }).join('');
  }
}
