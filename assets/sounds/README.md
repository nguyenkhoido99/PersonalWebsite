
# Sounds Assets - External .mp3 / .wav

Đây là nơi bạn đưa file âm thanh bên ngoài vào.

## Cấu trúc
```
assets/sounds/
├── bgm/
│   ├── cyber_ambient.wav (mẫu - bạn thay bằng .mp3/.wav của bạn)
│   └── cyber_pulse.wav
└── sfx/
    ├── click.wav
    ├── hover.wav
    ├── tab_switch.wav
    ├── modal_open.wav
    └── modal_close.wav
```

## Cách thêm file mới
1. Copy file .mp3 hoặc .wav vào folder tương ứng
2. Mở controllers/SoundController.js
3. Thêm vào config:

```js
// BGM
this.bgmConfig = [
  { id: 'my_bgm', src: './assets/sounds/bgm/my_music.mp3', name: 'My Music', loop: true, volume: 0.25 }
]

// SFX
this.sfxConfig = {
  click: { src: './assets/sounds/sfx/my_click.mp3', volume: 0.5 }
}

// Hoặc runtime:
soundController.addBGM('new_bgm', './assets/sounds/bgm/new.mp3')
soundController.addSFX('new_sfx', './assets/sounds/sfx/new.wav')
```

## Lưu ý
- Hỗ trợ .mp3 và .wav
- BGM nên loop, 2-3 phút, < 5MB
- SFX nên ngắn < 1s, < 100KB
- Trình duyệt cần user click đầu tiên mới phát được (autoplay policy)
