import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, NFT, LeaderboardEntry, AppState } from '@/types';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setNFTs: (nfts: NFT[]) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  setNFTStats: (stats: { totalMinted: number; maxSupply: number }) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      nfts: [],
      leaderboard: [],
      nftStats: {
        totalMinted: 0,
        maxSupply: 1000,
      },

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setNFTs: (nfts) => set({ nfts }),
      setLeaderboard: (leaderboard) => set({ leaderboard }),
      setNFTStats: (nftStats) => set({ nftStats }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        nfts: [],
        leaderboard: [],
        nftStats: { totalMinted: 0, maxSupply: 1000 }
      }),
    }),
    {
      name: 'safariq-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
