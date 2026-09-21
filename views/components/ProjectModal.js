import { eventBus } from '../../core/patterns/Observer.js';

export class ProjectModalView {
  constructor() {
    eventBus.subscribe('project:openModal', (project) => this.open(project));
    eventBus.subscribe('project:closeModal', () => this.close());
  }
  render() {
    const modal = document.createElement('div');
    modal.className = 'cyber-modal hidden';
    modal.id = 'projectModal';
    modal.innerHTML = `
      <div class="cyber-modal__overlay"></div>
      <div class="cyber-modal__box">
        <button class="cyber-modal__close cyber-btn cyber-btn--ghost small" id="blogCloseBtn">[X]</button>
        <div id="modalContent"></div>
      </div>
    `;
    modal.querySelector('.cyber-modal__overlay').addEventListener('click', () => this.close());
    modal.querySelector('.cyber-modal__close').addEventListener('click', () => this.close());
    this.element = modal;
    return modal;
  }
  open(project) {
    if (!project) return;
    const content = this.element.querySelector('#modalContent');
    content.innerHTML = `
      <div class="modal-head"><span class="cyber-tag">${project.type.toUpperCase()}</span><h2>${project.title}</h2></div>
      <p class="modal-role">${project.role} | ${project.platforms.join(' / ')}</p>
      <div class="modal-tech">${project.tech.map(t=>`<span class="cyber-tag">${t}</span>`).join('')}</div>
      <div class="modal-grid">
        <div><h4>[ PROBLEM ]</h4><p>${project.problem}</p></div>
        <div><h4>[ SOLUTION ]</h4><p>${project.solution}</p></div>
      </div>
      <div class="modal-metrics">${Object.entries(project.metrics).map(([k,v])=>`<div class="metric"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
      <p style="color:#94A3B8;font-size:13px;margin-top:12px">${project.description}</p>
      <div class="modal-actions">
        <button class="cyber-btn cyber-btn--primary">[ GITHUB ]</button>
        <button class="cyber-btn cyber-btn--ghost">[ PLAY DEMO ]</button>
      </div>
    `;
    this.element.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  close() {
    if (!this.element) return;
    this.element.classList.add('hidden');
    document.body.style.overflow = '';
    if (window.soundController) window.soundController.playClose();
  }
}
