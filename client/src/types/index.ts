export interface User {
  id: string;
  email: string;
  name: string;
  country: string;
  walletAddress?: string;
  referralCode: string;
  referredBy?: string;
  totalInvites: number;
  sedEarned: number;
  rank: string;
  isActive: boolean;
  createdAt: Date;
}

export interface NFT {
  id: string;
  tokenId: string;
  ownerId: string;
  serialNumber: number;
  metadata?: any;
  mintedAt: Date;
}

export interface ReferralStats {
  totalInvites: number;
  sedEarned: number;
  rank: string;
  progress: {
    current: number;
    next: number;
    percentage: number;
  };
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  sedEarned: number;
  rank: string;
  position: number;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  nfts: NFT[];
  leaderboard: LeaderboardEntry[];
  nftStats: {
    totalMinted: number;
    maxSupply: number;
  };
}
