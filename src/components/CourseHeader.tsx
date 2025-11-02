import { BookOpen, Award, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CourseHeader = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { isAdmin } = useUserRole();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="border-b bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/10 p-2 backdrop-blur">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI-Powered Automation Testing</h1>
              <p className="text-sm text-primary-foreground/80">From Selenium to Playwright</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">Module 1: Foundation</span>
            </div>
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/admin")}
                    className="bg-white/20 hover:bg-white/30"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-white/20 hover:bg-white/30"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/auth")}
                className="bg-white/20 hover:bg-white/30"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
