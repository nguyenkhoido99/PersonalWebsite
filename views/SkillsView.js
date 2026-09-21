export class SkillsView {
  constructor(skills) { this.skills = skills; }
  render() {
    const sec = document.createElement('section');
    sec.id = 'skills';
    sec.className = 'section';
    sec.innerHTML = `
      <div class="section-head"><h2>[ SKILLS & ENGINEERING ]</h2><p class="section-desc">Evidence-based, không dùng % ảo. Mỗi skill có bằng chứng production.</p></div>
      <div class="skills-layout">
        <div class="skills-cols">
          ${['core','gameDev','workflow'].map(group=>`
            <div class="skill-group">
              <h4>[ ${group.toUpperCase()} ]</h4>
              ${this.skills[group].map(s=>`
                <div class="skill-item">
                  <div class="skill-item__head"><span>${s.name}</span><span class="level ${s.level.toLowerCase()}">${s.level}</span></div>
                  <div class="skill-item__evidence">// ${s.evidence}</div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
        <div class="eng-box">
          <h4>[ ${this.skills.engineering.title} ]</h4>
          <div class="code-block"><pre><code>${this.skills.engineering.codeSample}</code></pre></div>
          <div class="principles">${this.skills.engineering.principles.map(p=>`<span class="cyber-tag">${p}</span>`).join('')}</div>
          <ul class="eng-list">
            <li>Singleton cho AppController - single source</li>
            <li>Observer EventBus - decouple View/Controller</li>
            <li>Factory cho Project - OCP</li>
            <li>Facade đơn giản hóa - DIP</li>
            <li>State cho Navigation - tránh if-else</li>
          </ul>
        </div>
      </div>
    `;
    return sec;
  }
}
