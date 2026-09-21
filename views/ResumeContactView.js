export class ResumeContactView {
  constructor(resume) { this.resume = resume; }
  render() {
    const sec = document.createElement('section');
    sec.id = 'resume';
    sec.className = 'section';
    sec.innerHTML = `
      <div class="section-head"><h2>[ RESUME & CONTACT ]</h2><p class="section-desc">Đồng bộ 100% giữa website và CV PDF - Single Source of Truth</p></div>
      <div class="resume-grid">
        <div class="resume-main">
          <h4>[ SUMMARY ]</h4><p>${this.resume.summary}</p>
          <h4>[ EXPERIENCE ]</h4>
          ${this.resume.experience.map(e=>`
            <div class="exp-item">
              <div class="exp-head"><b>${e.company}</b> - ${e.role} <span>${e.time}</span></div>
              <p>${e.desc}</p>
            </div>
          `).join('')}
          <h4>[ EDUCATION ]</h4><p>${this.resume.education.school} - ${this.resume.education.major}</p>
          <div class="cta-row">
            <button class="cyber-btn cyber-btn--primary" id="downloadCv">[ DOWNLOAD CV PDF ]</button>
          </div>
        </div>
        <div class="contact-card">
          <h4>[ CONTACT ]</h4>
          <div class="contact-item"><span>EMAIL</span><a>${this.resume.contact.email}</a></div>
          <div class="contact-item"><span>GITHUB</span><a>${this.resume.contact.github}</a></div>
          <div class="contact-item"><span>LINKEDIN</span><a>${this.resume.contact.linkedin}</a></div>
          <div class="contact-item"><span>LOCATION</span><span>${this.resume.contact.location}</span></div>
          <div class="availability"><span class="dot"></span>${this.resume.availability}</div>
          <div class="contact-form">
            <input placeholder="Your email" id="cEmail" />
            <textarea placeholder="Message for Outlier collaboration" id="cMsg"></textarea>
            <button class="cyber-btn cyber-btn--ghost" id="sendMsg">[ SEND TRANSMISSION ]</button>
          </div>
        </div>
      </div>
    `;
    sec.querySelector('#downloadCv').addEventListener('click', () => alert('CV PDF sẽ được generate từ resume.json - Demo đồng bộ!'));
    sec.querySelector('#sendMsg').addEventListener('click', () => {
      const e = sec.querySelector('#cEmail').value;
      const m = sec.querySelector('#cMsg').value;
      if (!e || !m) return alert('Nhập email và message!');
      alert('Đã gửi! (Mock)');
    });
    return sec;
  }
}
