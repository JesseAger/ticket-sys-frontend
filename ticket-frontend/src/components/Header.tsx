import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  user?: {
    id: string;
    name: string;
    role: 'staff' | 'it_support' | 'admin';
  } | null;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className="bg-white border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="./public/img/logo.jpg" 
              alt="Optimum Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-semibold font-inter text-foreground">Optimum IT Support</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Professional Support System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!user && !isAuthPage && (
              <>
                <Button 
                  variant="soft" 
                  onClick={() => navigate('/signup')}
                  className="hidden sm:inline-flex"
                >
                  Sign Up
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </>
            )}
            
            {user && (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;