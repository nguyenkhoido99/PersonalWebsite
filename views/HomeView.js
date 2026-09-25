export class HomeView {
  constructor(data) { this.data = data; }
  render() {
    const sec = document.createElement('section');
    sec.id = 'home';
    sec.className = 'section home-section';
    sec.innerHTML = `
      <div class="home-grid">
        <div class="home-left">
          <div class="eyebrow">[ AVAILABLE FOR OUTLIER ] • GMT+7 REMOTE</div>
          <h1 class="glitch-title">${this.data.name}</h1>
          <h2 class="subtitle"><span class="neon-cyan">${this.data.title}</span> | ${this.data.subtitle}</h2>
          <p class="bio">${this.data.englishBio}</p>
          <p class="bio vn">${this.data.bio}</p>
          <div class="cta-row">
            <button class="cyber-btn cyber-btn--primary" data-go="projects">[ VIEW PROJECTS ]</button>
            <button class="cyber-btn cyber-btn--ghost" data-go="resume">[ DOWNLOAD CV ]</button>
            <a class="cyber-link" href="https://github.com/nguyenkhoido99" target="_blank">[ GITHUB ]</a>
          </div>
        </div>
        <div class="home-right">
          <div class="avatar-box">
            <div class="avatar">[DNK]</div>
            <div class="avatar-scan"></div>
          </div>
        </div>
      </div>
      <div class="highlight-grid">
        ${this.data.highlights.map(h=>`
          <div class="highlight-card">
            <div class="highlight-card__value">${h.value}</div>
            <div class="highlight-card__label">${h.label}</div>
            <div class="highlight-card__desc">${h.desc}</div>
          </div>
        `).join('')}
      </div>
    `;
    return sec;
  }
}
