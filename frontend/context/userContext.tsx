"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/client";

const UserContext = createContext<{ user: any | null }>({ user: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Fetch initial user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for login/logout/refresh
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
