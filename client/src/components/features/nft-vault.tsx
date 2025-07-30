import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Link } from 'wouter';
import { ROUTES } from '@/lib/constants';
import { Key, Plus, ExternalLink, Zap, Shield, Star } from 'lucide-react';
import type { NFT } from '@/types';

interface NFTVaultProps {
  nfts: NFT[];
  nftStats: {
    totalMinted: number;
    maxSupply: number;
  };
  isLoading?: boolean;
}

export default function NFTVault({ nfts, nftStats, isLoading = false }: NFTVaultProps) {
  const mintProgress = (nftStats.totalMinted / nftStats.maxSupply) * 100;

  const getNFTRarity = (serialNumber: number) => {
    if (serialNumber <= 10) return { rarity: 'Legendary', color: 'neon-green', icon: Shield };
    if (serialNumber <= 50) return { rarity: 'Epic', color: 'neon-violet', icon: Star };
    if (serialNumber <= 200) return { rarity: 'Rare', color: 'neon-cyan', icon: Zap };
    return { rarity: 'Common', color: 'gray', icon: Key };
  };

  const getNFTBenefits = (serialNumber: number) => {
    const { rarity } = getNFTRarity(serialNumber);
    switch (rarity) {
      case 'Legendary':
        return ['20% travel discount', '3x SED multiplier', 'VIP concierge', 'Governance rights'];
      case 'Epic':
        return ['15% travel discount', '2.5x SED multiplier', 'Priority support'];
      case 'Rare':
        return ['10% travel discount', '2x SED multiplier', 'Exclusive deals'];
      default:
        return ['5% travel discount', '1.5x SED multiplier', 'Community access'];
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-neon-violet/30">
        <CardHeader>
          <CardTitle className="text-neon-violet">NFT Vault</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-20 rounded" />
            ))}
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <Card className="bg-gray-800 border-neon-violet/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-neon-violet flex items-center">
              <Key className="mr-2" size={24} />
              NFT Vault
            </CardTitle>
            <Badge className="bg-neon-violet/20 text-neon-violet border-neon-violet">
              {nfts.length} Owned
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Owned NFTs */}
          {nfts.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Your SafariQ Keys</h4>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {nfts.map((nft) => {
                  const { rarity, color, icon: RarityIcon } = getNFTRarity(nft.serialNumber);
                  const benefits = getNFTBenefits(nft.serialNumber);
                  
                  return (
                    <motion.div
                      key={nft.id}
                      variants={fadeInUp}
                      className={`bg-${color}/10 border border-${color}/30 p-4 rounded-lg hover:border-${color}/50 transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <RarityIcon className={`text-${color}`} size={20} />
                          <span className="font-bold">#{nft.serialNumber}</span>
                        </div>
                        <Badge className={`bg-${color}/20 text-${color} border-${color} text-xs`}>
                          {rarity}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Benefits:</h5>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {benefits.slice(0, 2).map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1 h-1 bg-gray-500 rounded-full mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full mt-3 border-${color} text-${color} hover:bg-${color}/10 text-xs`}
                      >
                        <ExternalLink size={12} className="mr-1" />
                        View Details
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <Key className="text-gray-500" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">No NFTs Yet</h4>
              <p className="text-gray-400 text-sm mb-4">
                Mint your first SafariQ Key to unlock exclusive travel benefits and enhanced rewards.
              </p>
            </div>
          )}

          {/* Minting Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold">Global Minting Progress</h4>
              <span className="text-sm text-gray-400">
                {nftStats.totalMinted} / {nftStats.maxSupply}
              </span>
            </div>
            
            <Progress value={mintProgress} className="h-2" />
            
            <div className="text-center text-sm text-gray-400">
              {Math.round(mintProgress)}% Complete • {nftStats.maxSupply - nftStats.totalMinted} Remaining
            </div>
          </div>

          {/* Mint More CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={ROUTES.NFT_MINT} className="flex-1">
              <Button className="w-full bg-neon-violet text-white hover:bg-neon-violet/90">
                <Plus size={16} className="mr-2" />
                Mint SafariQ Key
              </Button>
            </Link>
            
            {nfts.length > 0 && (
              <Button
                variant="outline"
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
              >
                <ExternalLink size={16} className="mr-2" />
                OpenSea
              </Button>
            )}
          </div>

          {/* Utility Info */}
          <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
            <h5 className="font-bold text-sm mb-2 text-neon-violet">NFT Utility</h5>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Travel booking discounts (5-20%)</li>
              <li>• Enhanced SED token multipliers (1.5x-3x)</li>
              <li>• Exclusive partner benefits and deals</li>
              <li>• Governance voting rights</li>
              <li>• VIP customer support tiers</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
