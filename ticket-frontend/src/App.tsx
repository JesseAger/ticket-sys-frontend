import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StaffDashboard from "./pages/StaffDashboard";
import ITSupportDashboard from "./pages/ITSupportDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  id: string;
  name: string;
  role: 'staff' | 'it_support' | 'admin';
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
              <Route path="/" element={
                <Layout user={user} onLogout={handleLogout}>
                  <Home />
                </Layout>
              } />
              <Route path="/login" element={
                <Layout user={user} onLogout={handleLogout}>
                  <Login onLogin={handleLogin} />
                </Layout>
              } />
              <Route path="/signup" element={
                <Layout user={user} onLogout={handleLogout}>
                  <Signup onSignup={handleLogin} />
                </Layout>
              } />
              <Route path="/dashboard/staff" element={
                <Layout user={user} onLogout={handleLogout}>
                  <StaffDashboard />
                </Layout>
              } />
              <Route path="/dashboard/it-support" element={
                <Layout user={user} onLogout={handleLogout}>
                  <ITSupportDashboard />
                </Layout>
              } />
              <Route path="/dashboard/admin" element={
                <Layout user={user} onLogout={handleLogout}>
                  <AdminDashboard />
                </Layout>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={
                <Layout user={user} onLogout={handleLogout}>
                  <NotFound />
                </Layout>
              } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
