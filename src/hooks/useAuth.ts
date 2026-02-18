import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          const currentUser = session?.user ?? null;
          setUser(currentUser);

          if (currentUser) {
            const { data, error } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', currentUser.id)
              .eq('role', 'admin')
              .maybeSingle();

            if (error) {
              console.error("Error fetching user role:", error);
            }

            setIsAdmin(!!data);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
        } finally {
          setLoading(false);
        }
      }
    );

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error checking session:", error);
          throw error;
        }

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const { data, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .eq('role', 'admin')
            .maybeSingle();

          if (roleError) {
            console.error("Error fetching user role:", roleError);
          }

          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
        // Ensure we don't leave the user in a broken state if possible, 
        // but primarily we must stop loading.
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return { user, isAdmin, loading, signIn, signOut };
}
