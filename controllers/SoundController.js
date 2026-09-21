import { Singleton } from '../core/patterns/Singleton.js';
import { eventBus } from '../core/patterns/Observer.js';

/**
 * SoundController - Singleton + Observer + Facade for external audio files
 * Now supports external .mp3 / .wav files from assets/sounds/
 * - BGM: looping background music (HTMLAudioElement for easy mp3 support)
 * - SFX: short effects (HTMLAudioElement pool for low latency)
 * 
 * User can drop any .mp3/.wav into assets/sounds/bgm or assets/sounds/sfx
 * and update the config below.
 */
export class SoundController extends Singleton {
  constructor() {
    super();
    if (SoundController._initialized) return SoundController._instance;

    // --- CONFIG: External files - user can replace with any .mp3/.wav ---
    this.bgmConfig = [
      { id: 'cyber_ambient', src: './assets/sounds/bgm/main_bgm.mp3', name: 'Cyber Ambient', loop: true, volume: 0.6 },
    ];

    this.sfxConfig = {
      click: { src: './assets/sounds/sfx/click.wav', volume: 0.3 },
      hover: { src: './assets/sounds/sfx/hover.wav', volume: 0.15 },
      tab: { src: './assets/sounds/sfx/tab_switch.wav', volume: 0.05 },
      modalOpen: { src: './assets/sounds/sfx/modal_open.wav', volume: 0.4 },
      modalClose: { src: './assets/sounds/sfx/modal_close.wav', volume: 0.4 }
    };

    this.bgmAudios = new Map(); // id -> Audio element
    this.sfxAudios = new Map(); // id -> Audio element
    this.currentBGM = null;
    this.currentBGMId = 'cyber_ambient';
    this.isBgmOn = false;
    this.isSfxOn = true;
    this.isInitialized = false;
    this.masterVolume = 0.6;

    SoundController._initialized = true;
  }

  init() {
    if (this.isInitialized) return;
    try {
      // Preload BGM
      this.bgmConfig.forEach(cfg => {
        const audio = new Audio();
        audio.src = cfg.src;
        audio.loop = cfg.loop;
        audio.volume = 0;
        audio.preload = 'auto';
        audio.addEventListener('error', () => console.warn(`[Sound] Failed to load BGM: ${cfg.src}`));
        this.bgmAudios.set(cfg.id, audio);
      });

      // Preload SFX
      Object.entries(this.sfxConfig).forEach(([key, cfg]) => {
        const audio = new Audio();
        audio.src = cfg.src;
        audio.preload = 'auto';
        audio.volume = cfg.volume * this.masterVolume;
        audio.addEventListener('error', () => console.warn(`[Sound] Failed to load SFX: ${cfg.src}`));
        this.sfxAudios.set(key, audio);
      });

      // Observer: auto play sound on UI events
      eventBus.subscribe('nav:activeChanged', () => this.playSFX('tab'));
      eventBus.subscribe('project:openModal', () => this.playSFX('modalOpen'));
      eventBus.subscribe('blog:openDetail', () => this.playSFX('modalOpen'));
      eventBus.subscribe('project:closeModal', () => this.playSFX('modalClose'));
      eventBus.subscribe('blog:closeDetail', () => this.playSFX('modalClose'));

      this.isInitialized = true;
      console.log('[Sound] External files controller initialized', {
        bgm: this.bgmConfig.map(c => c.src),
        sfx: Object.values(this.sfxConfig).map(c => c.src)
      });
    } catch (e) {
      console.warn('[Sound] Init failed', e);
    }
  }

  // --- Public API: User can add external files at runtime ---
  addBGM(id, src, options = {}) {
    const cfg = { id, src, name: options.name || id, loop: options.loop ?? true, volume: options.volume ?? 0.25 };
    this.bgmConfig.push(cfg);
    const audio = new Audio();
    audio.src = src;
    audio.loop = cfg.loop;
    audio.volume = 0;
    audio.preload = 'auto';
    this.bgmAudios.set(id, audio);
    return cfg;
  }

  addSFX(id, src, volume = 0.5) {
    this.sfxConfig[id] = { src, volume };
    const audio = new Audio();
    audio.src = src;
    audio.volume = volume * this.masterVolume;
    audio.preload = 'auto';
    this.sfxAudios.set(id, audio);
  }

  // --- BGM Controls ---
  async playBGM(id = null) {
    if (!this.isInitialized) this.init();
    const targetId = id || this.currentBGMId;
    const audio = this.bgmAudios.get(targetId);
    if (!audio) {
      console.warn(`[Sound] BGM not found: ${targetId}`);
      return;
    }
    // Stop current
    if (this.currentBGM && this.currentBGM !== audio) {
      this.currentBGM.pause();
      this.currentBGM.currentTime = 0;
    }
    this.currentBGM = audio;
    this.currentBGMId = targetId;
    const cfg = this.bgmConfig.find(c => c.id === targetId);
    try {
      await audio.play();
      // Fade in
      let vol = 0;
      const targetVol = (cfg?.volume || 0.25) * this.masterVolume;
      const fade = setInterval(() => {
        vol += 0.02;
        if (vol >= targetVol) {
          vol = targetVol;
          clearInterval(fade);
        }
        audio.volume = vol;
      }, 50);
      this.isBgmOn = true;
      eventBus.notify('sound:bgmToggled', true);
    } catch (e) {
      console.warn('[Sound] BGM play blocked by autoplay policy', e);
    }
  }

  stopBGM() {
    if (!this.currentBGM) return;
    const audio = this.currentBGM;
    let vol = audio.volume;
    const fade = setInterval(() => {
      vol -= 0.03;
      if (vol <= 0) {
        vol = 0;
        clearInterval(fade);
        audio.pause();
        audio.currentTime = 0;
      }
      audio.volume = vol;
    }, 50);
    this.isBgmOn = false;
    eventBus.notify('sound:bgmToggled', false);
  }

  toggleBGM() {
    if (!this.isInitialized) this.init();
    if (this.isBgmOn) {
      this.stopBGM();
    } else {
      this.playBGM(this.currentBGMId);
    }
    return this.isBgmOn;
  }

  // --- SFX Controls ---
  playSFX(name) {
    if (!this.isSfxOn || !this.isInitialized) return;
    const audio = this.sfxAudios.get(name);
    if (!audio) {
      console.warn(`[Sound] SFX not found: ${name}`);
      return;
    }
    try {
      audio.currentTime = 0;
      audio.play().catch(() => { });
    } catch (e) { }
  }

  playClick() { this.playSFX('click'); }
  playHover() { this.playSFX('hover'); }
  playTabSwitch() { this.playSFX('tab'); }
  playModalOpen() { this.playSFX('modalOpen'); }
  playClose() { this.playSFX('modalClose'); }

  toggleSFX() {
    this.isSfxOn = !this.isSfxOn;
    eventBus.notify('sound:sfxToggled', this.isSfxOn);
    return this.isSfxOn;
  }

  setMasterVolume(v) {
    this.masterVolume = Math.max(0, Math.min(1, v));
    this.sfxAudios.forEach(a => a.volume = a.volume * this.masterVolume);
    if (this.currentBGM) {
      const cfg = this.bgmConfig.find(c => c.id === this.currentBGMId);
      this.currentBGM.volume = (cfg?.volume || 0.25) * this.masterVolume;
    }
  }

  getState() {
    return { bgm: this.isBgmOn, sfx: this.isSfxOn, currentBGM: this.currentBGMId, bgmList: this.bgmConfig.map(c => ({ id: c.id, name: c.name, src: c.src })) };
  }

  // Allow user gesture to unlock audio
  ensureContext() {
    if (!this.isInitialized) this.init();
  }
}
SoundController._initialized = false;