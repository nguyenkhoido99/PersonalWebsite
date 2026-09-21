# Personal Portfolio - Cocos Creator Developer
## MVC + SOLID + Design Patterns - Cyberpunk Theme

### Cấu trúc MVC chuẩn yêu cầu
```
/models          # Data layer - Single Source of Truth
/views           # Presentation layer - Pure render
  /components
/controllers     # Logic layer - Business rules
/core/patterns   # Design Patterns (Singleton, Observer, Factory, AbstractFactory, Facade, State)
/css
/js             # Bootstrap
```

### Design Patterns đã áp dụng (có comment trong code)
- Singleton: AppController.getInstance(), ThemeController
- Observer: EventBus - nav:activeChanged, project:openModal
- Factory: ProjectFactory.create()
- Abstract Factory: SciFiComponentFactory (họ UI cyberpunk)
- Facade: AppFacade - Views chỉ gọi Facade
- State: NavigationStateContext

### Cách chạy ngay
1. Giải nén
2. Mở terminal tại thư mục:
   python3 -m http.server 8000
   hoặc
   npx serve .
3. Mở http://localhost:8000
- Hoặc double-click index.html (ES modules cần server, khuyến nghị dùng http.server)

### Thay data của bạn
- Sửa models/HomeModel.js, ProjectsModel.js, SkillsModel.js, AboutModel.js, ResumeModel.js
- ResumeModel đồng bộ với CV PDF - 1 nguồn duy nhất

### Tech: Vanilla JS + ES Modules + CSS (không cần build, dễ đọc, đúng yêu cầu không dùng quá nhiều công nghệ phức tạp)
