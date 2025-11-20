# Penng Trainer Dashboard

A Next.js web application that allows trainers to create and manage meal plans and workout programs for their clients.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 + shadcn/ui
- **Authentication:** NextAuth v5
- **State Management:** React Query (TanStack Query) + Zustand
- **Forms:** React Hook Form + Zod

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later
- **npm** or **yarn**
- **Backend API** running on `http://localhost:8000`

## Backend Setup

The trainer dashboard requires the Penng backend API to be running locally. To start the backend:

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Check out the Week 1 backend branch:
   ```bash
   git checkout claude/day5-testing-migrations-ci-*
   ```

3. Install dependencies and run migrations:
   ```bash
   pip install -r requirements.txt
   alembic upgrade head
   ```

4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

5. Verify backend is running at `http://localhost:8000/docs`

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Generate a secure NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

   Copy the output and paste it into `.env.local` as the value for `NEXTAUTH_SECRET`.

4. **Update `.env.local` if needed:**
   - `NEXT_PUBLIC_API_URL` - Backend API URL (default: `http://localhost:8000`)
   - `NEXTAUTH_URL` - Dashboard URL (default: `http://localhost:3000`)
   - `NEXTAUTH_SECRET` - Your generated secret from step 3

## Creating a Test Trainer Account

Before logging in, you need to create a trainer account via the backend API:

1. **Using the API docs** (`http://localhost:8000/docs`):
   - Navigate to `POST /api/v1/auth/register`
   - Click "Try it out"
   - Fill in the request body:
     ```json
     {
       "email": "trainer@example.com",
       "password": "testpassword123",
       "first_name": "Test",
       "last_name": "Trainer",
       "role": "trainer"
     }
     ```
   - Click "Execute"

2. **Or using curl:**
   ```bash
   curl -X POST http://localhost:8000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "trainer@example.com",
       "password": "testpassword123",
       "first_name": "Test",
       "last_name": "Trainer",
       "role": "trainer"
     }'
   ```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

**Default login credentials** (after creating test account):
- Email: `trainer@example.com`
- Password: `testpassword123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
trainer-dashboard/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   └── login/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── clients/
│   │   ├── meal-plans/
│   │   └── workout-programs/
│   └── api/auth/            # NextAuth API routes
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── layout/              # Layout components
├── lib/
│   ├── api/                 # API client and endpoints
│   ├── providers/           # React Query provider
│   └── auth.ts              # NextAuth configuration
├── hooks/                   # Custom React hooks
└── types/                   # TypeScript type definitions
```

## Features

### Days 11-12 (Current)
- ✅ Next.js 14 setup with TypeScript
- ✅ NextAuth v5 authentication
- ✅ Dashboard layout with navigation
- ✅ Login page
- ✅ Protected routes
- ✅ API client with authentication
- ✅ React Query configuration

### Days 13-14 (Coming Next)
- Meal plan list page
- Create meal plan form
- Day-by-day meal editor
- Macro calculator
- Assign meal plans to clients

### Day 15 (Future)
- Workout program builder
- Exercise library
- Program assignment

## Troubleshooting

### Authentication Issues
- Ensure backend is running on `http://localhost:8000`
- Verify `NEXTAUTH_SECRET` is set in `.env.local`
- Check that trainer account exists in backend database

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` matches backend URL
- Check CORS is enabled on backend
- Ensure backend is running and accessible

## Deployment

This application is designed to be deployed on Vercel:

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

## License

This project is part of the Penng Platform.

## Support

For issues or questions, please refer to the project documentation in `/docs`.
