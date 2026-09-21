export class BlogModel {
  constructor({ id, title, type, tags, summary, content, date, readTime, thumbnail, author }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.tags = tags;
    this.summary = summary;
    this.content = content;
    this.date = date;
    this.readTime = readTime;
    this.thumbnail = thumbnail;
    this.author = author;
  }
}

export const rawBlogs = [
  {
    id: "cocos-optimize",
    title: "Cách tôi tối ưu Draw Call từ 85 xuống 12 trong Cocos Creator 3.x",
    type: "deep-dive",
    tags: ["Cocos Creator", "Performance", "TypeScript"],
    summary: "Case study thực tế giảm draw call bằng sprite atlas, static batching và custom render queue. FPS tăng 35 -> 60 trên Android low-end.",
    content: `
## Problem
Game casual của mình có 85 draw calls ở màn hình chính, FPS tụt xuống 28 trên Redmi 9A.

## Analysis
- Mỗi icon là 1 sprite riêng lẻ
- Label không dùng BMFont
- Không dùng auto atlas
- UI động không batch được

## Solution (Factory + Observer pattern)
1. **Auto Atlas**: Gom 120 icon vào 2 atlas 2048x2048
2. **BMFont**: Thay 30 Label TTF bằng BMFont
3. **Custom UIManager (Facade)**: Queue popup, không render cùng lúc
4. **Static Batching**: Đánh dấu node tĩnh

\`\`\`ts
// Object Pool + Batching
class RenderBatcher {
  private staticBatches: Map<string, Node[]> = new Map();
  batch(nodes: Node[]) { /* ... */ }
}
\`\`\`

## Result
- Draw Call: 85 -> 12 (-86%)
- FPS: 28 -> 60
- Memory: -15%

> Bài học: Đừng chỉ làm game chạy được, phải làm game chạy mượt.
    `,
    date: "2024-11-15",
    readTime: "6 min",
    thumbnail: "OPTIMIZE",
    author: "Do Nguyen Khoi"
  },
  {
    id: "typescript-cocos",
    title: "Tại sao tôi chuyển toàn bộ project Cocos sang TypeScript?",
    type: "engineering",
    tags: ["TypeScript", "Clean Code", "SOLID"],
    summary: "Từ JS sang TS giúp giảm 70% bug runtime, dễ refactor và áp dụng SOLID. Chia sẻ cấu trúc project mình dùng cho Outlier tasks.",
    content: `
## Tại sao?

JS linh hoạt nhưng khó scale khi project > 10k dòng. TS giúp:
- Bắt lỗi ngay lúc code, không đợi runtime
- Autocomplete + refactor an toàn
- Áp dụng OOP + Design Pattern dễ dàng

## Cấu trúc mình dùng (MVC + Facade)
\`\`\`
/models      -> Interface + Data
/views       -> Chỉ render
/controllers -> Logic + Pattern
/core/patterns -> Singleton, Observer, Factory...
\`\`\`

## Ví dụ: EventBus (Observer)
\`\`\`ts
eventBus.subscribe('player:die', () => ui.showGameOver());
eventBus.notify('player:die');
\`\`\`

## Kết quả
- Bug giảm 70%
- Onboarding dev mới nhanh hơn 2x
- Phù hợp với Outlier: code sạch, dễ review, dễ giải thích
    `,
    date: "2024-10-20",
    readTime: "5 min",
    thumbnail: "TYPESCRIPT",
    author: "Do Nguyen Khoi"
  },
  {
    id: "object-pool",
    title: "Object Pool Pattern trong game bắn súng: Giảm GC 90%",
    type: "tutorial",
    tags: ["Design Pattern", "Cocos Creator", "Optimization"],
    summary: "Hướng dẫn implement Generic Object Pool tái sử dụng cho đạn, VFX, enemy. Kèm benchmark GC trước/sau.",
    content: `
## Vấn đề GC
Mỗi viên đạn instantiate/destroy -> GC spike -> giật hình.

## Generic Pool (Clean Code)
\`\`\`ts
class ObjectPool<T> {
  private pool: T[] = [];
  constructor(private factory: () => T, private reset: (obj:T)=>void){}
  acquire(): T { return this.pool.pop() ?? this.factory(); }
  release(obj:T){ this.reset(obj); this.pool.push(obj); }
}
// Dùng cho mọi loại
const bulletPool = new ObjectPool(() => instantiate(bulletPrefab), (b)=>b.reset());
\`\`\`

## Benchmark
- Trước: 120 GC/ phút, spike 45ms
- Sau: 8 GC/ phút, spike 3ms

## Khi nào dùng?
- Đạn, enemy, VFX lặp lại
- UI item trong list
- Bất cứ thứ gì spawn > 20 lần/phút
    `,
    date: "2024-09-08",
    readTime: "4 min",
    thumbnail: "POOL",
    author: "Do Nguyen Khoi"
  }
];
