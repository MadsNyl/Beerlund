import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    // TODO: Create a loading component
    return (
        <p>Loading...</p>
    )
  };

  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  return <Outlet />;
}
