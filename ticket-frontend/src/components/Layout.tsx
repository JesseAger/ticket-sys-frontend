import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface User {
  id: string;
  name: string;
  role: 'staff' | 'it_support' | 'admin';
}

interface LayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
}

const Layout = ({ children, user, onLogout }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-inter">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;