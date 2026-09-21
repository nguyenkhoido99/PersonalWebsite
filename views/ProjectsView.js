export class ProjectsView {
  constructor(projects, facade) { this.projects = projects; this.facade = facade; }
  render() {
    const sec = document.createElement('section');
    sec.id = 'projects';
    sec.className = 'section';
    sec.innerHTML = `
      <div class="section-head">
        <h2>[ PROJECTS ] <span class="section-count">// ${this.projects.length} CASE STUDIES</span></h2>
        <p class="section-desc">Mỗi dự án trả lời 4 câu hỏi: Làm gì? Bằng gì? Khó đâu? Kết quả gì? - Format Outlier yêu thích</p>
      </div>
      <div class="projects-grid"></div>
    `;
    const grid = sec.querySelector('.projects-grid');
    this.projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'cyber-card project-card';
      card.innerHTML = `
        <div class="project-thumb">${p.thumbnail}</div>
        <div class="project-body">
          <div class="project-top"><span class="cyber-tag">${p.type}</span><span class="cyber-tag ghost">${p.platforms.join('/')}</span></div>
          <h3>${p.title}</h3>
          <p class="project-role">${p.role}</p>
          <div class="project-tech">${p.tech.slice(0,3).map(t=>`<span class="cyber-tag small">${t}</span>`).join('')}</div>
          <div class="project-metrics">${Object.entries(p.metrics).map(([k,v])=>`<span>${k}: <b>${v}</b></span>`).join(' | ')}</div>
        </div>
        <div class="project-actions">
          <button class="cyber-btn cyber-btn--primary small" data-id="${p.id}">[ DETAILS ]</button>
        </div>
      `;
      card.querySelector('button').addEventListener('click', () => this.facade.openProjectModal(p.id));
      grid.appendChild(card);
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
    });
    return sec;
  }
}
