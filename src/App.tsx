import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import { useMiora } from "./context/MioraContext";
import LoadingState from "./components/ui/LoadingState";

export default function App() {
  const { loading, error } = useMiora();
  const element = useRoutes(routes);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-miora-snow">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-miora-snow px-6 text-center">
        <p className="text-[15px] text-miora-charcoal font-medium mb-2">
          Unable to connect
        </p>
        <p className="text-sm text-miora-muted mb-6">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-miora-frost text-miora-charcoal text-sm font-medium border border-miora-line transition-all hover:bg-miora-snow active:scale-[0.98]"
        >
          Retry
        </button>
      </div>
    );
  }

  return <Suspense>{element}</Suspense>;
}
