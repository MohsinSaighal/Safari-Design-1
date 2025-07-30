import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useWeb3 } from '@/hooks/use-web3';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TokenStats from '@/components/features/token-stats';
import NFTVault from '@/components/features/nft-vault';
import Leaderboard from '@/components/features/leaderboard';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Users, Trophy, Coins, Key, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { nfts, nftStats } = useWeb3();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <h1 className="font-space font-bold text-4xl mb-6 text-neon-cyan">
            Access Restricted
          </h1>
          <p className="text-gray-400 mb-8">
            Please register to access your SafariQ dashboard.
          </p>
          <Link href="/">
            <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
              Go to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Ambassador': return 'text-neon-green';
      case 'Trailblazer': return 'text-neon-violet';
      default: return 'text-neon-cyan';
    }
  };

  const getProgressToNext = () => {
    if (user.rank === 'Explorer') {
      return { current: user.totalInvites, next: 15, nextRank: 'Trailblazer' };
    } else if (user.rank === 'Trailblazer') {
      return { current: user.totalInvites, next: 50, nextRank: 'Ambassador' };
    }
    return { current: user.totalInvites, next: user.totalInvites, nextRank: 'Max Rank' };
  };

  const progress = getProgressToNext();
  const progressPercentage = (progress.current / progress.next) * 100;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="font-space font-bold text-4xl lg:text-5xl mb-2">
                Welcome back, <span className="text-neon-cyan">{user.name}</span>
              </h1>
              <div className="flex items-center space-x-4">
                <Badge className={`${getRankColor(user.rank)} border-current`}>
                  <Trophy size={14} className="mr-1" />
                  {user.rank}
                </Badge>
                <span className="text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-gray-800 border-neon-cyan/30 hover:border-neon-cyan/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Users size={16} className="mr-2" />
                  Total Invites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-cyan">{user.totalInvites}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gray-800 border-neon-green/30 hover:border-neon-green/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Coins size={16} className="mr-2" />
                  SED Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-green">{user.sedEarned}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gray-800 border-neon-violet/30 hover:border-neon-violet/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Key size={16} className="mr-2" />
                  NFTs Owned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-violet">{nfts.length}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Progress to {progress.nextRank}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{progress.current}/{progress.next}</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-neon-${user.rank === 'Explorer' ? 'violet' : 'green'} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Referral Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Card className="bg-gray-800 border-neon-cyan/30">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Your Referral Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-3 py-2 rounded text-neon-cyan font-mono text-lg flex-1">
                    {user.referralCode}
                  </code>
                  <Button
                    onClick={() => navigator.clipboard.writeText(user.referralCode)}
                    variant="outline"
                    size="sm"
                    className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  Share this code with friends to earn SED tokens when they join SafariQ.
                </p>
              </CardContent>
            </Card>

            <TokenStats user={user} />
          </motion.div>

          {/* NFT Vault */}
          <motion.div variants={fadeInUp}>
            <NFTVault nfts={nfts} nftStats={nftStats} />
          </motion.div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Leaderboard />
        </motion.div>
      </div>
    </div>
  );
}
