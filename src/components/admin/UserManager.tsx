import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, User } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_roles: Array<{ role: string }>;
}

export const UserManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name");
    
    if (!profiles) {
      setUsers([]);
      return;
    }

    // Fetch roles separately
    const usersWithRoles = await Promise.all(
      profiles.map(async (profile) => {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", profile.id);
        
        return {
          ...profile,
          user_roles: roles || [],
        };
      })
    );
    
    setUsers(usersWithRoles);
  };

  const toggleAdmin = async (userId: string, currentlyAdmin: boolean) => {
    if (currentlyAdmin) {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");
      
      if (error) {
        toast.error("Failed to remove admin role");
      } else {
        toast.success("Admin role removed");
        fetchUsers();
      }
    } else {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      
      if (error) {
        toast.error("Failed to grant admin role");
      } else {
        toast.success("Admin role granted");
        fetchUsers();
      }
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const isAdmin = user.user_roles?.some((r) => r.role === "admin");
        return (
          <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h4 className="font-medium">{user.full_name || "No name"}</h4>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-1 flex items-center gap-2">
                {isAdmin ? (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Shield className="h-3 w-3" />
                    Admin
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    User
                  </span>
                )}
              </div>
            </div>
            <Button
              variant={isAdmin ? "destructive" : "default"}
              size="sm"
              onClick={() => toggleAdmin(user.id, isAdmin)}
            >
              {isAdmin ? "Remove Admin" : "Make Admin"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};