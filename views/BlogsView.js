export class BlogsView {
  constructor(blogs, facade) {
    this.blogs = blogs;
    this.facade = facade;
  }
  render() {
    const sec = document.createElement('section');
    sec.id = 'blogs';
    sec.className = 'section';
    sec.innerHTML = `
      <div class="section-head">
        <h2>[ BLOGS ] <span class="section-count">// ${this.blogs.length} ARTICLES</span></h2>
        <p class="section-desc">Technical writing cho Outlier - cách tôi giải thích vấn đề kỹ thuật rõ ràng, có cấu trúc</p>
      </div>
      <div class="blogs-grid"></div>
    `;
    const grid = sec.querySelector('.blogs-grid');
    this.blogs.forEach(b => {
      const card = document.createElement('div');
      card.className = 'cyber-card blog-card';
      card.innerHTML = `
        <div class="blog-thumb">${b.thumbnail}</div>
        <div class="blog-body">
          <div class="blog-top"><span class="cyber-tag">${b.type}</span><span class="blog-date">${b.date} • ${b.readTime}</span></div>
          <h3>${b.title}</h3>
          <p class="blog-summary">${b.summary}</p>
          <div class="blog-tags">${b.tags.map(t=>`<span class="cyber-tag small">${t}</span>`).join('')}</div>
        </div>
        <div class="blog-actions">
          <button class="cyber-btn cyber-btn--primary small" data-id="${b.id}">[ READ ]</button>
        </div>
      `;
      card.querySelector('button').addEventListener('click', () => {
        if (window.soundController) window.soundController.playClick();
        this.facade.openBlogDetail(b.id);
      });
      // Hover sound
      card.addEventListener('mouseenter', () => {
        if (window.soundController && window.soundController.isSfxOn) {
          // Throttle hover sound
          if (!card._hoverTimeout) {
            window.soundController.playHover();
            card._hoverTimeout = setTimeout(()=>card._hoverTimeout=null, 300);
          }
        }
      });
      grid.appendChild(card);
    });
    return sec;
  }
}
