import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import ProtectedRoute from "./ProtectedRoute";

const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const PeoplePage = lazy(() => import("../pages/PeoplePage"));
const AddPersonPage = lazy(() => import("../pages/AddPersonPage"));
const PersonDetailPage = lazy(() => import("../pages/PersonDetailPage"));
const RememberPage = lazy(() => import("../pages/RememberPage"));
const AddContextPage = lazy(() => import("../pages/AddContextPage"));
const ArchivePersonPage = lazy(() => import("../pages/ArchivePersonPage"));
const ArchivedPeoplePage = lazy(() => import("../pages/ArchivedPeoplePage"));
const DeletionFlowPage = lazy(() => import("../pages/DeletionFlowPage"));
const ThoughtTimelinePage = lazy(() => import("../pages/ThoughtTimelinePage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));

export const routes: RouteObject[] = [
  { path: "/", element: <WelcomePage /> },
  { path: "/welcome", element: <Navigate to="/" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { path: "/people", element: <PeoplePage /> },
      { path: "/people/new", element: <AddPersonPage /> },
      { path: "/people/:personId", element: <PersonDetailPage /> },
      { path: "/people/:personId/remembrance", element: <RememberPage /> },
      { path: "/people/:personId/context", element: <AddContextPage /> },
      { path: "/people/:personId/archive", element: <ArchivePersonPage /> },
      { path: "/archived", element: <ArchivedPeoplePage /> },
      { path: "/people/:personId/deletion", element: <DeletionFlowPage /> },
      { path: "/timeline", element: <ThoughtTimelinePage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
];
