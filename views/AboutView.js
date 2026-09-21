export class AboutView {
  constructor(data) { this.data = data; }
  render() {
    const sec = document.createElement('section');
    sec.id = 'about';
    sec.className = 'section';
    sec.innerHTML = `
      <div class="section-head"><h2>[ ABOUT ]</h2></div>
      <div class="about-grid">
        <div class="about-card">
          <div class="avatar small">[${this.data.avatar}]</div>
          <p>${this.data.bio}</p>
          <div class="workstyle">
            <h4>[ WORK STYLE ]</h4>
            ${this.data.workStyle.map(s=>`<div class="ws-item">> ${s}</div>`).join('')}
          </div>
        </div>
        <div class="outlier-card">
          <h4>[ WHY OUTLIER? ]</h4>
          <p>${this.data.whyOutlier}</p>
          <div class="outlier-points">
            <div>> Phân tích bug logic nhanh</div>
            <div>> Review code & viết giải thích rõ ràng</div>
            <div>> Tư duy hệ thống, viết spec kỹ thuật</div>
            <div>> Phù hợp evaluation / training AI tasks</div>
          </div>
        </div>
      </div>
    `;
    return sec;
  }
}
