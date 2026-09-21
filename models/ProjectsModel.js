/**
 * ProjectsModel - Data + Entity
 * Factory creates instances of this class
 */
export class ProjectModel {
  constructor({ id, title, type, role, platforms, tech, problem, solution, metrics, links, thumbnail, description }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.role = role;
    this.platforms = platforms;
    this.tech = tech;
    this.problem = problem;
    this.solution = solution;
    this.metrics = metrics;
    this.links = links;
    this.thumbnail = thumbnail;
    this.description = description;
  }
}

export const rawProjects = [
  {
    id: "merge-master",
    title: "Merge Master - Casual Puzzle",
    type: "production",
    role: "Solo Gameplay Developer",
    platforms: ["Web", "Android", "iOS"],
    tech: ["Cocos Creator 3.8", "TypeScript", "Object Pool", "Asset Bundle"],
    problem: "Game lag trên Android low-end khi spawn 100+ entities, GC spike mỗi 5s.",
    solution: "Triển khai Generic Object Pool + Sprite Atlas + Lazy Asset Bundle. Tách Logic/View bằng Component-Based. Giảm GC 80%.",
    metrics: { fps: "35 -> 60", bundle: "14.2MB -> 8.4MB", drawCall: "-55%" },
    links: { github: "https://github.com", demo: "#" },
    thumbnail: "MERGE",
    description: "Casual merge game với 50 levels, save/load và remote config. Case study về performance optimization."
  },
  {
    id: "ui-framework",
    title: "Reusable UI Framework",
    type: "technical",
    role: "Technical Architect",
    platforms: ["Web", "Mobile"],
    tech: ["Cocos Creator 3.x", "TypeScript", "Facade", "Observer", "State"],
    problem: "UI code lặp lại giữa các màn hình, khó maintain khi scale 20+ popup.",
    solution: "Xây dựng UIManager dạng Facade + State Pattern cho Popup Queue + EventBus Observer. Config-driven UI với prefab registry.",
    metrics: { reuse: "80% reused", devTime: "-60% /screen", bugs: "-70%" },
    links: { github: "https://github.com", demo: "#" },
    thumbnail: "UI_SYS",
    description: "Framework UI modular dùng cho 5 game, hỗ trợ animation queue và responsive scaling."
  },
  {
    id: "battle-arena",
    title: "Battle Arena - Mini RPG",
    type: "production",
    role: "Gameplay & SDK Developer",
    platforms: ["WebGL", "Android"],
    tech: ["Cocos Creator 3.8", "TypeScript", "Spine", "Firebase", "Box2D"],
    problem: "Skill system phức tạp, cần dễ mở rộng và cân bằng sát thương đa nền tảng.",
    solution: "Thiết kế Skill System dùng Strategy + Factory Pattern. Dữ liệu cân bằng qua JSON config, hot-update qua Firebase Remote Config.",
    metrics: { skills: "25+ skills", retention: "+22% D1", crash: "0.1%" },
    links: { github: "https://github.com", demo: "#" },
    thumbnail: "ARENA",
    description: "Mini RPG arena với skill, inventory và leaderboard."
  }
];
