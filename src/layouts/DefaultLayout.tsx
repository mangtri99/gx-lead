import { Navigate } from "react-router-dom";
import { useAuth } from "../composables/useAuth";
import LayoutProvider from "./components/LayoutProvider";
import SidebarWrapper from "./components/SidebarWrapper";
import MainContentWrapper from "./components/MainContentWrapper";

export default function DefaultLayout() {
  const { user } = useAuth();
  // if not login, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <LayoutProvider>
      <div className="min-h-screen d-flex">
        {/* Sidebar */}
        <SidebarWrapper />

        {/* Main */}
        <MainContentWrapper />
      </div>
    </LayoutProvider>
  );
}
