"use client";

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/components/auth/auth-provider';
import type { UserRole } from '@/lib/types';

export function useUserRole() {
  const { user } = useAuthContext();
  const [role, setRole] = useState<UserRole>("fan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      if (!user?.uid) {
        setRole("fan");
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'user_profiles', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role as UserRole);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();
  }, [user]);

  return {
    role,
    loading,
    isMusician: role === "musician",
    isProfessional: role === "professional",
    isAdmin: role === "admin",
    isFan: role === "fan"
  };
}