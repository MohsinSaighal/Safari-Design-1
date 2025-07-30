import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useWeb3 } from '@/hooks/use-web3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ArrowLeft, Zap, Key, Star, Shield, Gift } from 'lucide-react';

export default function NFTMint() {
  const { user, isAuthenticated } = useAuth();
  const { mintNFT, isMinting, nftStats } = useWeb3();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<'basic' | 'premium' | 'elite'>('basic');

  const mintProgress = (nftStats.totalMinted / nftStats.maxSupply) * 100;

  const tiers = {
    basic: {
      name: 'Explorer Key',
      price: '0.05 ETH',
      color: 'neon-cyan',
      icon: Key,
      benefits: [
        '5% travel booking discount',
        'Basic SED rewards multiplier (1.2x)',
        'Access to community Discord',
        'Monthly travel insights'
      ]
    },
    premium: {
      name: 'Trailblazer Key',
      price: '0.15 ETH', 
      color: 'neon-violet',
      icon: Star,
      benefits: [
        '10% travel booking discount',
        'Enhanced SED rewards multiplier (1.5x)',
        'Priority customer support',
        'Exclusive partner deals',
        'Early access to new features'
      ]
    },
    elite: {
      name: 'Ambassador Key',
      price: '0.3 ETH',
      color: 'neon-green',
      icon: Shield,
      benefits: [
        '15% travel booking discount',
        'Maximum SED rewards multiplier (2x)',
        'VIP travel concierge service',
        'Governance voting rights',
        'Annual exclusive events access',
        'Custom NFT artwork'
      ]
    }
  };

  const handleMint = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign up first to mint NFTs.",
        variant: "destructive",
      });
      return;
    }

    if (nftStats.totalMinted >= nftStats.maxSupply) {
      toast({
        title: "Sold Out",
        description: "All NFTs have been minted.",
        variant: "destructive",
      });
      return;
    }

    const result = await mintNFT();
    
    if (result.success) {
      toast({
        title: "NFT Minted Successfully!",
        description: `Your ${tiers[selectedTier].name} has been minted to your wallet.`,
      });
    } else {
      toast({
        title: "Minting Failed",
        description: result.error || "Failed to mint NFT. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-neon-cyan hover:text-neon-cyan/80">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="font-space font-bold text-4xl lg:text-6xl mb-4">
              Mint Your <span className="text-neon-violet">SafariQ Key</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Unlock exclusive travel benefits, enhanced rewards, and become part of the Web3 travel revolution.
            </p>
          </div>
        </motion.div>

        {/* Mint Progress */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <Card className="bg-gray-800 border-neon-cyan/30">
            <CardHeader>
              <CardTitle className="text-center text-neon-cyan">
                Minting Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Minted</span>
                <span>{nftStats.totalMinted} / {nftStats.maxSupply}</span>
              </div>
              <Progress value={mintProgress} className="h-3" />
              <div className="text-center text-sm text-gray-400">
                {Math.round(mintProgress)}% Complete • {nftStats.maxSupply - nftStats.totalMinted} Remaining
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* NFT Tiers */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {Object.entries(tiers).map(([key, tier]) => {
            const isSelected = selectedTier === key;
            const TierIcon = tier.icon;
            
            return (
              <motion.div key={key} variants={fadeInUp}>
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `bg-gray-800 border-${tier.color} ring-2 ring-${tier.color}/50` 
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedTier(key as any)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${tier.color}/20 flex items-center justify-center`}>
                      <TierIcon className={`text-${tier.color} text-2xl`} size={32} />
                    </div>
                    <CardTitle className={`text-${tier.color} text-2xl font-space`}>
                      {tier.name}
                    </CardTitle>
                    <div className="text-3xl font-bold">{tier.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Zap size={16} className={`text-${tier.color} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {isSelected && (
                      <Badge className={`w-full mt-4 justify-center border-${tier.color} text-${tier.color}`}>
                        Selected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Utility Breakdown */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <Card className="bg-gray-800 border-neon-green/30">
            <CardHeader>
              <CardTitle className="text-center text-neon-green flex items-center justify-center">
                <Gift size={24} className="mr-2" />
                NFT Utility & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <Zap className="text-neon-cyan" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Travel Discounts</h4>
                  <p className="text-sm text-gray-400">Save 5-15% on all bookings through SafariQ platform</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-violet/20 flex items-center justify-center">
                    <Star className="text-neon-violet" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">SED Multipliers</h4>
                  <p className="text-sm text-gray-400">Earn 1.2x to 2x more SED tokens on every activity</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-green/20 flex items-center justify-center">
                    <Shield className="text-neon-green" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">VIP Access</h4>
                  <p className="text-sm text-gray-400">Priority support and exclusive partner benefits</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <Key className="text-neon-cyan" size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Governance</h4>
                  <p className="text-sm text-gray-400">Vote on platform decisions and future developments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mint Button */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <Button
            onClick={handleMint}
            disabled={isMinting || nftStats.totalMinted >= nftStats.maxSupply}
            size="lg"
            className={`px-12 py-6 text-lg font-bold transition-all duration-300 bg-${tiers[selectedTier].color} hover:bg-${tiers[selectedTier].color}/90 text-black brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
          >
            {isMinting 
              ? 'Minting...' 
              : nftStats.totalMinted >= nftStats.maxSupply
                ? 'Sold Out'
                : `Mint ${tiers[selectedTier].name} for ${tiers[selectedTier].price}`
            }
          </Button>
          
          {!isAuthenticated && (
            <p className="mt-4 text-sm text-gray-400">
              Please <Link href="/" className="text-neon-cyan hover:underline">sign up</Link> first to mint NFTs.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
