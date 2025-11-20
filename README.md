# Penng Dashboards

Monorepo containing the Penng dashboard platform - corporate and personal trainer dashboards for health and wellness management.

## 📦 Projects

### Corporate Dashboard
Enterprise wellness dashboard for companies to track employee health metrics, engagement, and ROI.

**Location**: `corporate-dashboard/`

**Tech Stack**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Liquid Glass UI
- Recharts for data visualization

**Features**:
- Employee health metrics overview
- Department-level analytics
- Wellness challenges management
- ROI tracking and cost savings
- Engagement analytics

[View Corporate Dashboard README](./corporate-dashboard/DASHBOARD_STATUS.md)

### Trainer Dashboard
Professional dashboard for personal trainers to manage clients, workout programs, and meal plans.

**Location**: `trainer-dashboard/`

**Tech Stack**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Liquid Glass design system
- React Query for data management

**Features**:
- Client management and progress tracking
- Workout program builder
- Meal plan creator
- Analytics and leaderboards
- Client messaging
- Health metrics visualization

[View Trainer Dashboard README](./trainer-dashboard/README.md)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies for both dashboards
cd corporate-dashboard && npm install && cd ..
cd trainer-dashboard && npm install && cd ..
```

### Running Locally

**Corporate Dashboard**:
```bash
cd corporate-dashboard
npm run dev
# Opens on http://localhost:3000
```

**Trainer Dashboard**:
```bash
cd trainer-dashboard
npm run dev
# Opens on http://localhost:3000
```

## 🏗️ Project Structure

```
penng-dashboards/
├── corporate-dashboard/     # Enterprise wellness dashboard
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   ├── components/     # Reusable components
│   │   ├── data/           # Mock data
│   │   └── lib/            # Utilities
│   ├── public/             # Static assets
│   └── package.json
│
├── trainer-dashboard/      # Personal trainer dashboard
│   ├── app/               # Next.js pages
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # API client & utilities
│   ├── types/             # TypeScript types
│   └── package.json
│
└── README.md              # This file
```

## 🎨 Design System

Both dashboards share a common design philosophy:

- **Liquid Glass Aesthetic**: Frosted glass effects, subtle gradients, and depth
- **TT Commons Font**: Premium typography throughout
- **Penng Brand Colors**: 
  - Blue: `#004CFF`
  - Orange: `#FFAC5B`
  - Aqua: `#31C1D8`
  - Dark: `#101010`

## 🔧 Development

### Building for Production

```bash
# Corporate Dashboard
cd corporate-dashboard && npm run build

# Trainer Dashboard
cd trainer-dashboard && npm run build
```

### Linting

```bash
# Corporate Dashboard
cd corporate-dashboard && npm run lint

# Trainer Dashboard
cd trainer-dashboard && npm run lint
```

## 🚢 Deployment

Both dashboards are optimized for Vercel deployment:

1. Push this repository to GitHub
2. Import in Vercel
3. Configure environment variables (see individual dashboard READMEs)
4. Deploy!

### Environment Variables

Each dashboard has its own environment variables. See:
- [Corporate Dashboard Environment Setup](./corporate-dashboard/DASHBOARD_STATUS.md)
- [Trainer Dashboard Environment Setup](./trainer-dashboard/README.md)

## 📊 Backend Integration

Both dashboards are designed to integrate with the Penng backend API:

**Base URL**: `https://api.penng.ai`

**Authentication**: Firebase Auth tokens

See individual dashboard documentation for API endpoint details.

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes in the appropriate dashboard directory
3. Test locally: `npm run dev`
4. Build to verify: `npm run build`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

Copyright © 2025 Penng. All rights reserved.

## 📞 Support

- Email: gold@penng.ai
- Website: https://www.penng.ai

---

**Made in Cape Town 🇿🇦**
