import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '@/store/useAppStore';
import { apiRequest } from '@/lib/queryClient';
import type { NFT } from '@/types';

export function useWeb3() {
  const { user, nfts, setNFTs, nftStats, setNFTStats } = useAppStore();
  const queryClient = useQueryClient();
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Mock wallet connection - replace with actual Web3 integration
  const connectWallet = useCallback(async () => {
    if (isConnecting) return { success: false, error: 'Already connecting' };
    
    setIsConnecting(true);
    try {
      // Simulate wallet connection with shorter delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 42).padStart(40, '0');
      setWalletAddress(mockAddress);
      return { success: true, address: mockAddress };
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return { success: false, error: 'Failed to connect wallet' };
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
  }, []);

  // Fetch user's NFTs
  const { data: nftData, isLoading: nftsLoading } = useQuery<{ nfts: NFT[] }>({
    queryKey: ['/api/nfts/owner', user?.id],
    enabled: !!user?.id,
  });

  // Fetch NFT stats
  const { data: statsData } = useQuery<{ totalMinted: number; maxSupply: number }>({
    queryKey: ['/api/nfts/stats'],
  });

  // Mint NFT mutation
  const mintNFTMutation = useMutation({
    mutationFn: async (data: { ownerId: string; serialNumber: number; metadata?: any }) => {
      const tokenId = `SAFARIQ-${data.serialNumber}`;
      const response = await apiRequest('POST', '/api/nfts/mint', {
        tokenId,
        ownerId: data.ownerId,
        serialNumber: data.serialNumber,
        metadata: data.metadata || { rarity: 'common', benefits: ['travel_rewards'] },
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/nfts/owner', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/nfts/stats'] });
    },
  });

  const mintNFT = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const currentStats = statsData || nftStats;
      const nextSerialNumber = currentStats.totalMinted + 1;
      
      if (nextSerialNumber > currentStats.maxSupply) {
        return { success: false, error: 'All NFTs have been minted' };
      }

      await mintNFTMutation.mutateAsync({
        ownerId: user.id,
        serialNumber: nextSerialNumber,
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Minting failed' 
      };
    }
  };

  // Update store when data changes
  if (nftData?.nfts && nftData.nfts !== nfts) {
    setNFTs(nftData.nfts);
  }

  if (statsData && (statsData.totalMinted !== nftStats.totalMinted || statsData.maxSupply !== nftStats.maxSupply)) {
    setNFTStats(statsData);
  }

  return {
    // Wallet
    isConnecting,
    walletAddress,
    connectWallet,
    disconnectWallet,
    
    // NFTs
    nfts: nftData?.nfts || nfts,
    nftsLoading,
    mintNFT,
    isMinting: mintNFTMutation.isPending,
    
    // Stats
    nftStats: statsData || nftStats,
  };
}
