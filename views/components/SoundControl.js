import { eventBus } from '../../core/patterns/Observer.js';

export class SoundControlView {
  constructor(soundController) {
    this.soundController = soundController;
    eventBus.subscribe('sound:bgmToggled', (isOn) => this.updateBGM(isOn));
    eventBus.subscribe('sound:sfxToggled', (isOn) => this.updateSFX(isOn));
  }
  render() {
    const panel = document.createElement('div');
    panel.className = 'sound-control';
    panel.id = 'soundControl';
    const state = this.soundController.getState();
    panel.innerHTML = `
      <div class="sound-control__group">
        <button class="sound-btn ${state.bgm ? 'active' : ''}" id="bgmBtn" title="Background Music - External .mp3/.wav">
          <span class="sound-icon">${state.bgm ? '♫' : '♪'}</span> BGM
        </button>
        <button class="sound-btn ${state.sfx ? 'active' : ''}" id="sfxBtn" title="Sound Effects - External .wav">
          <span class="sound-icon">${state.sfx ? '◉' : '◎'}</span> SFX
        </button>
      </div>
      <div class="sound-visualizer" id="visualizer">
        <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
      </div>
      <div class="sound-bgm-list" id="bgmList" style="display:none">
        ${state.bgmList.map(b => `<div class="bgm-item" data-id="${b.id}" title="${b.src}">${b.name}</div>`).join('')}
      </div>
    `;
    
    panel.querySelector('#bgmBtn').addEventListener('click', async () => {
      this.soundController.ensureContext();
      const isOn = this.soundController.toggleBGM();
    });
    panel.querySelector('#sfxBtn').addEventListener('click', () => {
      const isOn = this.soundController.toggleSFX();
      if (isOn) this.soundController.playClick();
    });

    // BGM list selection (for external files)
    panel.querySelectorAll('.bgm-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        this.soundController.playBGM(id);
      });
    });

    // Show BGM list on hover
    panel.addEventListener('mouseenter', () => {
      const list = panel.querySelector('#bgmList');
      if (list) list.style.display = 'flex';
    });
    panel.addEventListener('mouseleave', () => {
      const list = panel.querySelector('#bgmList');
      if (list) list.style.display = 'none';
    });

    this.element = panel;
    this.updateVisualizer(state.bgm);
    return panel;
  }
  updateBGM(isOn) {
    if (!this.element) return;
    const btn = this.element.querySelector('#bgmBtn');
    btn.classList.toggle('active', isOn);
    btn.querySelector('.sound-icon').textContent = isOn ? '♫' : '♪';
    this.updateVisualizer(isOn);
  }
  updateSFX(isOn) {
    if (!this.element) return;
    const btn = this.element.querySelector('#sfxBtn');
    btn.classList.toggle('active', isOn);
    btn.querySelector('.sound-icon').textContent = isOn ? '◉' : '◎';
  }
  updateVisualizer(isOn) {
    if (!this.element) return;
    const viz = this.element.querySelector('#visualizer');
    viz.classList.toggle('playing', isOn);
  }
}