import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/people" replace /> },
  { path: "/welcome", lazy: () => import("../pages/WelcomePage") },
  { path: "/people", lazy: () => import("../pages/PeoplePage") },
  { path: "/people/new", lazy: () => import("../pages/AddPersonPage") },
  { path: "/people/:personId", lazy: () => import("../pages/PersonDetailPage") },
  { path: "/people/:personId/remembrance", lazy: () => import("../pages/RememberPage") },
  { path: "/people/:personId/context", lazy: () => import("../pages/AddContextPage") },
  { path: "/people/:personId/archive", lazy: () => import("../pages/ArchivePersonPage") },
  { path: "/archived", lazy: () => import("../pages/ArchivedPeoplePage") },
  { path: "/people/:personId/deletion", lazy: () => import("../pages/DeletionFlowPage") },
  { path: "/timeline", lazy: () => import("../pages/ThoughtTimelinePage") },
  { path: "/settings", lazy: () => import("../pages/SettingsPage") },
  { path: "*", element: <Navigate to="/people" replace /> }
];