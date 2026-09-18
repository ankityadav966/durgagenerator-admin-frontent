import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import { AdminLayout } from "./components/AdminLayout";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { HeroManager } from "./pages/HeroManager";
import { GeneratorsManager } from "./pages/GeneratorsManager";
import { FeaturesManager } from "./pages/FeaturesManager";
import { TestimonialsManager } from "./pages/TestimonialsManager";
import { AboutManager } from "./pages/AboutManager";
import { HowItWorksManager } from "./pages/HowItWorksManager";
import { FaqManager } from "./pages/FaqManager";
import { ContactManager } from "./pages/ContactManager";
import { SettingsManager } from "./pages/SettingsManager";
import { MediaManager } from "./pages/MediaManager";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07162b] flex items-center justify-center">
        <Loader2 size={36} className="text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07162b] flex items-center justify-center">
        <Loader2 size={36} className="text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="generators" element={<GeneratorsManager />} />
            <Route path="features" element={<FeaturesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="how-it-works" element={<HowItWorksManager />} />
            <Route path="faq" element={<FaqManager />} />
            <Route path="contact" element={<ContactManager />} />
            <Route path="media" element={<MediaManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
