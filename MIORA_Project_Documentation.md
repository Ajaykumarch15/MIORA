# MIORA --- Project Documentation

## Development Record up to the Responsive Design Phase

**Status:** Working multi-user MVP under final polish\
**Frontend:** React + TypeScript + Vite + Tailwind CSS v4\
**Backend:** Express + TypeScript + Prisma\
**Database:** PostgreSQL via Supabase Cloud (setup in progress)\
**Authentication:** JWT + bcrypt

------------------------------------------------------------------------

# 1. What MIORA Is

MIORA is a calm, personal application for remembering the people who
matter. Users can add people, record remembrances, attach context,
review a timeline, archive or restore people, manage deletion flows, and
configure settings.

Core journey:

``` text
Welcome → Register/Login → People → Person Detail
→ Remember → Add Context → Timeline
→ Archive/Restore → Settings → Logout
```

MIORA is mobile-first but is currently being polished for responsive use
across mobile, tablet, and desktop.

------------------------------------------------------------------------

# 2. Technology Stack

## Frontend

-   React 19
-   TypeScript
-   Vite
-   React Router
-   Tailwind CSS v4
-   Lucide React

## Backend

-   Express
-   TypeScript
-   Prisma

## Database

-   PostgreSQL
-   Supabase Cloud PostgreSQL is the selected provider

## Authentication

-   JWT
-   bcrypt

------------------------------------------------------------------------

# 3. Important Architecture

``` text
React Frontend
      ↓
Express Backend
      ↓
Prisma
      ↓
Supabase PostgreSQL
```

The frontend must not directly connect to PostgreSQL.

Supabase is being used as PostgreSQL hosting only. MIORA keeps its own
Express + JWT authentication and is not replacing authentication with
Supabase Auth.

------------------------------------------------------------------------

# 4. Frontend Foundation

The frontend was scaffolded with:

-   `index.html`
-   Vite configuration
-   TypeScript configuration
-   `main.tsx`
-   `App.tsx`
-   Tailwind v4
-   Lazy-loaded routes
-   MIORA design tokens

Verification completed:

``` bash
npx tsc -b
npm run build
```

Both were reported as passing during implementation.

------------------------------------------------------------------------

# 5. Layout and Navigation

Created:

-   `AppShell`
-   `TopBar`
-   `BottomNavigation`

## AppShell

Provides:

-   Centered mobile-focused application layout
-   Responsive content area
-   React Router Outlet integration
-   Bottom navigation support

## TopBar

Supports:

-   Back button
-   Title
-   Optional right-side action

## BottomNavigation

Primary navigation includes:

-   People
-   Settings

It is hidden during focused flows such as add person, remembrance,
context, archive, and deletion.

------------------------------------------------------------------------

# 6. Shared UI Components

Created reusable components:

-   PrimaryButton
-   SecondaryButton
-   IconButton
-   BottomSheet
-   Dialog
-   SectionHeader
-   EmptyState
-   LoadingState
-   ErrorState
-   StatusBadge
-   Divider

Accessibility work includes native buttons, labels for icon buttons,
semantic dialog roles, Escape-key closing, disabled states, and semantic
HTML.

------------------------------------------------------------------------

# 7. Welcome Experience

The Welcome page is a standalone screen outside AppShell.

It includes:

-   Atmospheric background
-   MIORA branding
-   Emotional tagline
-   Supporting copy
-   Get Started CTA

Current behavior:

``` text
Unauthenticated → Register
Authenticated → People
```

The previously existing "I already have an account" link was
intentionally removed.

------------------------------------------------------------------------

# 8. People Experience

Implemented:

-   Person structure
-   Relative date formatting
-   Recency sorting
-   Initials avatars
-   Person cards
-   Person list
-   Empty state

Original mock structure:

``` ts
interface Person {
  id: string;
  name: string;
  nickname?: string;
  remembranceCount: number;
  lastRememberedAt: string | null;
}
```

Ordering:

1.  Most recently remembered
2.  Older remembrances
3.  Never remembered

The application later progressed toward real backend data.

------------------------------------------------------------------------

# 9. Core MIORA Features

The application now includes:

-   People
-   Add Person
-   Person Detail
-   Remember
-   Remembrance/thought cooldown
-   Add Context
-   Timeline
-   Archive
-   Restore
-   Deletion flow
-   Settings

The project has moved beyond a static UI and includes backend/API
integration.

------------------------------------------------------------------------

# 10. Backend

The Express backend includes APIs for:

-   Authentication
-   People
-   Remembrances
-   Contexts
-   Settings
-   Timeline

Prisma is the database access layer.

Relevant backend structure includes:

``` text
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── config.ts
    ├── index.ts
    ├── middleware/auth.ts
    └── api/
        ├── auth.ts
        ├── people.ts
        ├── remembrances.ts
        ├── contexts.ts
        ├── settings.ts
        └── timeline.ts
```

------------------------------------------------------------------------

# 11. Authentication --- Completed

Authentication uses JWT + bcrypt.

Implemented:

``` text
POST /auth/register
POST /auth/login
GET  /auth/me
POST /auth/logout
```

Frontend authentication includes:

-   `AuthProvider`
-   Auth types
-   Auth service
-   Protected routes
-   Login page
-   Register page

Architecture:

``` text
AuthProvider
   ↓
MioraProvider
   ↓
ProtectedRoute
   ↓
Application routes
```

AuthProvider provides:

-   Current user
-   Authentication state
-   Loading state
-   Login
-   Register
-   Logout

------------------------------------------------------------------------

# 12. Security and User Isolation

Completed security behavior:

-   Passwords hashed with bcrypt
-   Passwords not returned in API responses
-   JWT required for protected data APIs
-   Middleware extracts authenticated `userId`
-   Queries are scoped to the authenticated user
-   Ownership is verified before modifying person-specific data
-   401 responses clear frontend authentication state

Required behavior:

``` text
User A → sees only User A data
User B → sees only User B data
```

The frontend must not control arbitrary user IDs to retrieve data.

Correct pattern:

``` text
GET /people
   ↓
Authenticate JWT
   ↓
Backend determines user
   ↓
Return that user's data
```

------------------------------------------------------------------------

# 13. Supabase Database Decision

Local PostgreSQL installation is intentionally not being used.

The selected provider is Supabase Cloud PostgreSQL.

Supabase project URL:

``` text
https://rnvzszbqbylhwhovmumc.supabase.co
```

Important: this is the Supabase project/API URL, not Prisma's
`DATABASE_URL`.

The real PostgreSQL connection URI must be obtained from the Supabase
dashboard and kept secret.

Never expose:

-   Database password
-   Full production `DATABASE_URL`
-   `JWT_SECRET`

------------------------------------------------------------------------

# 14. Current Database Status

Current state:

``` text
Supabase project created                 ✅
Local PostgreSQL intentionally avoided   ✅
Supabase PostgreSQL URI obtained         🔄
Prisma migration verified                🔄
Database seed verified                   🔄
Full persistence test                    🔄
```

Next database sequence:

``` text
Get PostgreSQL connection URI
        ↓
Configure backend/.env
        ↓
Connect Prisma
        ↓
Run migration
        ↓
Run seed
        ↓
Start backend
        ↓
Start frontend
        ↓
Verify persistence
```

------------------------------------------------------------------------

# 15. Current Responsive Design Phase

The current UI focus is responsive polish.

This is not a redesign.

Target screen sizes:

``` text
320 × 568
375 × 667
390 × 844
768 × 1024
1024 × 768
1440 × 900
```

Responsive requirements:

## Small mobile

-   No horizontal scrolling
-   Text does not clip
-   Buttons fit
-   Forms fit
-   Cards fit
-   Navigation fits

## Tablet

-   Layout remains readable
-   Content does not stretch excessively

## Desktop

-   MIORA remains centered
-   Forms and cards remain focused
-   Preserve the personal mobile-app feeling

Areas being audited:

-   AppShell
-   TopBar
-   BottomNavigation
-   Login/Register
-   Forms
-   Person cards
-   Person Detail
-   Dialogs
-   Bottom sheets
-   Settings
-   Welcome page

------------------------------------------------------------------------

# 16. Routes

Public routes:

``` text
/welcome
/login
/register
```

Protected routes include:

``` text
/people
/people/new
/people/:personId
/people/:personId/remembrance
/people/:personId/context
/people/:personId/archive
/people/:personId/deletion
/archived
/timeline
/settings
```

------------------------------------------------------------------------

# 17. Full MVP Test Checklist

## Authentication

-   [ ] Register
-   [ ] Login
-   [ ] Logout
-   [ ] Login again

## People

-   [ ] Add person
-   [ ] Refresh and verify persistence
-   [ ] Archive
-   [ ] Restore

## Remembrance

-   [ ] Remember person
-   [ ] Count updates
-   [ ] Last remembered updates
-   [ ] Refresh and verify persistence

## Context

-   [ ] Add context
-   [ ] Refresh and verify persistence
-   [ ] Verify timeline

## Settings

-   [ ] Change cooldown
-   [ ] Refresh and verify persistence

## Multi-user isolation

``` text
User A creates data
      ↓
Logout
      ↓
User B logs in
      ↓
User A data must not appear
      ↓
Login as User A again
      ↓
User A data still exists
```

------------------------------------------------------------------------

# 18. Current Position

``` text
UI/UX Design                    ✅
Frontend Foundation             ✅
Navigation & Layout             ✅
Shared UI Components            ✅
Welcome                         ✅
People                          ✅
Core MIORA Features             ✅
Backend Foundation              ✅
Frontend/API Integration        ✅
Authentication                  ✅
User Isolation                  ✅
Protected Routes                ✅
──────────────────────────────────
Supabase Database Connection    🔄
Responsive Polish               🔄
Full End-to-End Testing         ⏳
Final Visual Polish             ⏳
Deployment                      ⏳
```

# 19. Recommended Next Steps

Keep the remaining work simple:

## 1. Connect Supabase PostgreSQL

Configure Prisma, migrate, and seed.

## 2. Test the entire MVP

Test registration through logout and login again.

## 3. Finish responsive polish

Fix real layout issues only. Do not redesign.

## 4. Final visual polish

Review colors, spacing, typography, and alignment.

## 5. Deploy

Deploy only after database persistence, authentication, user isolation,
responsive behavior, and production builds are verified.

------------------------------------------------------------------------

# 20. Final Summary

MIORA is no longer just a UI prototype.

It currently has:

-   A complete frontend experience
-   Core MIORA workflows
-   Express backend
-   Prisma architecture
-   JWT authentication
-   bcrypt password hashing
-   Protected routes
-   Multi-user data isolation
-   A Supabase cloud database project ready to connect

The project is now in the MVP completion and production-preparation
stage.

The main remaining tasks are:

``` text
Supabase connection
→ migration + seed
→ end-to-end testing
→ responsive polish
→ visual polish
→ deployment
```
