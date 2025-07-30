import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '@/store/useAppStore';
import { apiRequest } from '@/lib/queryClient';
import type { User } from '@/types';

interface RegisterData {
  email: string;
  name: string;
  country: string;
  walletAddress?: string;
}

export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAppStore();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await apiRequest('POST', '/api/users/register', data);
      return response.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['/api/leaderboard'] });
    },
  });

  const { data: currentUser, isLoading: userLoading } = useQuery<{ user: User }>({
    queryKey: ['/api/users', user?.id],
    enabled: !!user?.id,
  });

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    logout();
    queryClient.clear();
  };

  return {
    user: currentUser?.user || user,
    isAuthenticated,
    isLoading: isLoading || userLoading,
    register,
    logout: signOut,
  };
}
