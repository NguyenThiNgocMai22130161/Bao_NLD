# Báo cáo công nghệ — Dự án ThreePanthersNews

Ngày: 2026-06-03

Tệp tham chiếu: [package.json](package.json), [vite.config.ts](vite.config.ts), [tailwind.config.js](tailwind.config.js), [postcss.config.js](postcss.config.js), [tsconfig.json](tsconfig.json), [ThreePanthers/pom.xml](ThreePanthers/pom.xml)

## Tổng quan
Dự án gồm hai phần chính:
- Frontend: ứng dụng web SPA viết bằng React + TypeScript, build bằng Vite.
- Backend: ứng dụng Java (Spring Boot) dùng Maven.

---

## Frontend (Client)

- Ngôn ngữ: TypeScript (version: 5.6.3)
- Thư viện/framework: React (version: 18.3.1)
- Bundler / dev server: Vite (version: 6.0.11)
- Plugin Vite: `@vitejs/plugin-react`, `vite-tsconfig-paths`, `@tailwindcss/vite`
- UI / Component library: HeroUI (`@heroui/*`, `@heroui/react`) và icon set `@heroicons/react`
- CSS Utility: Tailwind CSS (version: 4.1.11)
- Tailwind helper: `tailwind-variants`
- CSS processing: PostCSS (`postcss`) và plugin `@tailwindcss/postcss`
- HTTP client: Axios
- Routing: React Router (`react-router-dom` 6.x)
- Animation: Framer Motion
- Icons: `@phosphor-icons/react`, `lucide-react`, `react-icons`
- RSS parsing: `rss-parser`
- Printing: `react-to-print`
- Utility: `clsx`

Linting / Formatting / Dev tooling:
- ESLint với các plugin TypeScript/React/Accessibility/Import
- Prettier
- TypeScript compiler (tsconfig.json) dùng `react-jsx` và thiết lập `strict`.

Scripts (trong `package.json`):
- `dev` — chạy Vite dev server
- `build` — `tsc` rồi `vite build`
- `lint` — chạy ESLint
- `preview` — preview build

---

## Backend (Server)

- Ngôn ngữ: Java (target Java 21)
- Build: Maven (pom.xml)
- Framework: Spring Boot (parent version 4.0.0)
- Spring Starters sử dụng:
  - `spring-boot-starter-webmvc` (REST / Web)
  - `spring-boot-starter-data-jpa` (JPA / ORM)
  - `spring-boot-starter-security` (security)
  - `spring-boot-starter-mail` (email)
- Database driver: PostgreSQL JDBC (`org.postgresql:postgresql`)
- JWT library: JJWT (`io.jsonwebtoken:jjwt-api`, `jjwt-impl`, `jjwt-jackson` v0.11.5)
- Lombok: `org.projectlombok:lombok` (annotation processing)
- Spring Boot Maven plugin và maven-compiler-plugin được dùng trong phần `build`.

Configs:
- `application.yml` nằm trong `ThreePanthers/src/main/resources`.

---

## Cấu trúc dự án
- Frontend: root (Vite project) — mã nguồn trong `src/` (React components, pages, services)
- Backend: thư mục `ThreePanthers/` chứa Maven/Spring Boot app

## Triển khai / Khác
- Có file `vercel.json` → có thể triển khai frontend lên Vercel
- Monorepo: cả frontend và backend cùng trong repository

---

## Lệnh khởi động nhanh (Frontend)
```bash
npm install
npm run dev
```

## Lệnh build (Frontend)
```bash
npm run build
```

## Lệnh build/run (Backend)
```bash
cd ThreePanthers
mvn clean package
java -jar target/*.jar
```

---

Nếu cần tớ xuất file này thành PDF hoặc Word để nộp cho thầy, tớ có thể tạo và đính kèm. Hoặc tớ có thể thêm danh sách phiên bản chi tiết từng dependency nếu thầy yêu cầu.
