# LabODC Platform

<p align="center">
  <img src="public/logo.png" alt="LabODC Logo" width="120" />
</p>

<p align="center">
  🚀 LabODC is a React-based platform that modernizes the Offshore Development Center (ODC) model through a lab-based training and team-matching approach.
</p>

---

## 🌟 Overview

LabODC bridges the gap between enterprises seeking skilled development teams and pre-trained, vetted professionals ready for immediate integration.  

### Key Value Propositions
- **Rapid Team Deployment**: Reduce hiring time by 70% with pre-trained developers  
- **Quality Assurance**: Lab-trained professionals ensure enterprise-grade deliverables  
- **Seamless Integration**: Teams ready to contribute from day one  
- **Scalable Solutions**: Flexible team sizing based on project needs  
- **Cost Optimization**: Competitive pricing with premium talent quality  

---

## ✨ Features

- **Talent Marketplace** – Browse and select from pre-vetted developer profiles  
- **Team Assembly** – Configure custom teams based on requirements  
- **Project Management** – Integrated tools for tasks and progress tracking  
- **Communication Hub** – Real-time collaboration and updates  
- **Performance Analytics** – Metrics and reporting dashboard  
- **Quality Assurance** – Built-in code review and testing workflows  

### User Roles
- **Enterprise Clients** – Companies seeking development teams  
- **Development Teams** – Lab-trained professionals available for projects  
- **Administrators** – System management and oversight  
- **Project Managers** – Team coordination and delivery management  

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript  
- **Build Tool**: Vite  
- **Routing**: TanStack Router (file-based, type-safe)  
- **State Management**: TanStack Query (server state) + Zustand (client state)  
- **Forms**: React Hook Form + Zod validation  
- **UI/UX**: Tailwind CSS + Shadcn/UI + Lucide/Tabler Icons  
- **Notifications**: Sonner  
- **Testing**: Jest + React Testing Library + MSW  
- **Code Quality**: ESLint + Prettier + TypeScript strict mode  

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18  
- npm >= 8 (or yarn/pnpm)  
- Git  

### Installation
```bash
git clone https://github.com/your-org/labodc-client.git
cd labodc-client
npm install
cp .env.example .env.local   # configure environment variables
```

### Development
```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # build production bundle
npm run preview   # preview production build locally
```

---

## 📂 Project Structure
```
src/
 ├─ components/        # Reusable UI components
 ├─ features/          # Feature-first modules (auth, teams, projects...)
 ├─ routes/            # File-based routes (TanStack)
 ├─ lib/               # Utils, constants, hooks
 ├─ styles/            # Global styles, Tailwind config
 └─ tests/             # Unit/integration tests
```

---

## 📜 Available Scripts
- `npm run dev` – Start development server  
- `npm run build` – Build production bundle  
- `npm run preview` – Preview production build locally  
- `npm run lint` – Run ESLint checks  
- `npm run lint:fix` – Fix linting issues  
- `npm run type-check` – Run TypeScript checks  
- `npm test` – Run test suite with Jest  
- `npm run test:watch` – Watch mode for tests  
- `npm run test:coverage` – Generate coverage report  

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core platform development  
- ✅ Authentication & user profiles  
- ✅ Team marketplace  
- ✅ Basic project management tools  

### Phase 2 (Planned)
- 🔄 Advanced analytics dashboard  
- 🔄 Integrated communication tools  
- 🔄 Mobile app (React Native)  
- 🔄 API marketplace  

### Phase 3 (Future)
- 📋 AI-powered team matching  
- 📋 Automated project estimation  
- 📋 Blockchain-based contracts  
- 📋 Global expansion features  

---

## 🧪 Testing Strategy

- **Unit Tests**: Components & utilities  
- **Integration Tests**: Features & workflows  
- **E2E Tests**: Critical user journeys (planned)  

### Tools
- Jest + React Testing Library  
- MSW (mock service worker) for API mocking  

### Coverage Goals
- Statements: > 80%  
- Branches: > 75%  
- Functions: > 80%  
- Lines: > 80%  

---

## 🔐 Authentication & Security

- JWT-based authentication with auto-refresh  
- Role-Based Access Control (RBAC): Admin, Client, Team Lead, Developer  
- Route-level guards for protected pages  
- Input validation (Zod + server-side checks)  
- HTTPS enforced + CSRF & XSS protection  

---

## 📊 Performance & Accessibility

- Code splitting with lazy loading  
- Image optimization (WebP, responsive images)  
- WCAG 2.1 AA compliance  
- Full keyboard navigation and ARIA support  
- Core Web Vitals targets:  
  - LCP < 2.5s  
  - FID < 100ms  
  - CLS < 0.1  

---

## 🚀 Deployment & DevOps

- **Environments**: Dev → Staging → Production  
- **CI/CD Pipeline**: Build → Lint → Test → Deploy → Monitor  
- **Hosting**: Vercel/Netlify + CDN  
- **Monitoring**: APM & error tracking  
- **Analytics**: Conversion and usage analytics  

---

## 🤝 Contributing

We welcome contributions!  

1. Fork the repo  
2. Create a branch: `git checkout -b feature/amazing-feature`  
3. Commit changes: `git commit -m "feat: add amazing feature"`  
4. Push: `git push origin feature/amazing-feature`  
5. Open a Pull Request  

### Code Standards
- TypeScript strict mode  
- ESLint + Prettier  
- Conventional Commits  
- Tests required for new features  
- Accessibility (WCAG compliance)  

---
## 📞 Contact
- **Project Lead**: [Lê Kim Bảo Nhật]  
- **Frontend Team**: React/TypeScript specialists  
- **UI/UX Team**: Design system & user experience  
- **DevOps Team**: Infrastructure & deployment  

Resources:  
- [Design System (Figma)](https://figma.com)  
- [Documentation](https://your-docs-link)  
- [API Reference](https://your-api-docs-link)  

---

Built with ❤️ by the LabODC Team
