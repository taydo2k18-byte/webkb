import { useState, useEffect, createContext, useContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock } from "lucide-react";

interface AdminContextType {
  isAdmin: boolean;
  showAdminLogin: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}

interface AdminProviderProps {
  children: React.ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Check localStorage on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem("kb-admin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = () => {
    // Simple password check - in production, this would be done server-side
    const adminPassword = "admin123"; // This would typically come from environment variables
    
    if (password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem("kb-admin", "true");
      setShowLogin(false);
      setPassword("");
      toast({
        title: "Admin Access Granted",
        description: "You can now edit and create knowledge base content"
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive"
      });
      setPassword("");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("kb-admin");
    toast({
      title: "Logged Out",
      description: "Admin access revoked"
    });
  };

  const showAdminLogin = () => {
    setShowLogin(true);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, showAdminLogin, logout }}>
      {children}
      
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-admin-login">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Authentication
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                data-testid="input-admin-password"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowLogin(false)}
                data-testid="button-cancel-login"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogin}
                data-testid="button-admin-login"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminContext.Provider>
  );
}

interface AdminButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminButton({ children, className }: AdminButtonProps) {
  const { isAdmin, showAdminLogin } = useAdmin();

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={showAdminLogin}
      className={className}
      data-testid="button-admin-access"
    >
      <Lock className="h-4 w-4 mr-2" />
      Admin Access Required
    </Button>
  );
}