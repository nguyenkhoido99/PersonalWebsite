export const SkillsModel = {
  core: [
    { name: "Cocos Creator", level: "Advanced", evidence: "3.x production, Asset Bundle, Lifecycle" },
    { name: "TypeScript", level: "Advanced", evidence: "OOP, Generics, Design Patterns" },
    { name: "JavaScript ES6+", level: "Advanced", evidence: "Async, Optimization" },
    { name: "Component-Based", level: "Advanced", evidence: "Reusable systems" }
  ],
  gameDev: [
    { name: "Gameplay Programming", level: "Advanced", evidence: "Loop, State Machine" },
    { name: "UI Systems", level: "Advanced", evidence: "Facade UIManager, Popup Queue" },
    { name: "Performance Optimization", level: "Advanced", evidence: "Object Pool, Draw Call, Memory" },
    { name: "Cross-platform Build", level: "Proficient", evidence: "Web / Android / iOS pipeline" },
    { name: "Spine / Animation", level: "Proficient", evidence: "Slot, IK integration" }
  ],
  workflow: [
    { name: "Git / GitHub", level: "Advanced", evidence: "Branch strategy, PR review" },
    { name: "Build & Deploy", level: "Proficient", evidence: "Gradle, Xcode, WebGL" },
    { name: "Profiling", level: "Proficient", evidence: "Chrome DevTools, Cocos Profiler" }
  ],
  engineering: {
    title: "Engineering Approach",
    codeSample: `// Generic Object Pool - Clean Code + SOLID
class ObjectPool<T> {
  private pool: T[] = [];
  constructor(private factory: () => T, private reset: (o:T)=>void){}
  acquire(): T { return this.pool.pop() ?? this.factory(); }
  release(o: T){ this.reset(o); this.pool.push(o); }
}`,
    principles: ["SOLID", "DRY", "KISS", "Composition over Inheritance"]
  }
};
