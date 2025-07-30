import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { fadeInUp } from '@/lib/animations';
import { RANK_REQUIREMENTS } from '@/lib/constants';
import { 
  Coins, 
  TrendingUp, 
  Award, 
  Users,
  ArrowUpRight,
  Target
} from 'lucide-react';
import type { User } from '@/types';

interface TokenStatsProps {
  user: User;
}

export default function TokenStats({ user }: TokenStatsProps) {
  const getCurrentRankReward = (rank: string) => {
    switch (rank) {
      case 'Ambassador': return 25;
      case 'Trailblazer': return 15;
      default: return 10;
    }
  };

  const getNextRank = (currentRank: string) => {
    switch (currentRank) {
      case 'Explorer': return { rank: 'Trailblazer', requirement: 15 };
      case 'Trailblazer': return { rank: 'Ambassador', requirement: 50 };
      case 'Ambassador': return { rank: 'Ambassador', requirement: 50 };
      default: return { rank: 'Trailblazer', requirement: 15 };
    }
  };

  const nextRank = getNextRank(user.rank);
  const progressToNext = user.rank !== 'Ambassador' 
    ? (user.totalInvites / nextRank.requirement) * 100 
    : 100;

  const currentReward = getCurrentRankReward(user.rank);
  const estimatedMonthlyEarnings = user.totalInvites * currentReward * 0.3; // Rough estimate

  const stats = [
    {
      label: 'Total SED Balance',
      value: user.sedEarned,
      suffix: 'SED',
      icon: Coins,
      color: 'neon-green',
      trend: '+12.5%'
    },
    {
      label: 'Referral Rewards',
      value: user.totalInvites * currentReward,
      suffix: 'SED',
      icon: Users,
      color: 'neon-cyan',
      trend: `+${user.totalInvites} invites`
    },
    {
      label: 'Current Rank',
      value: user.rank,
      suffix: '',
      icon: Award,
      color: 'neon-violet',
      trend: `${currentReward} SED/referral`
    },
    {
      label: 'Est. Monthly',
      value: Math.round(estimatedMonthlyEarnings),
      suffix: 'SED',
      icon: TrendingUp,
      color: 'neon-green',
      trend: 'projected'
    }
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Token Balance Overview */}
      <Card className="bg-gray-800 border-neon-green/30">
        <CardHeader>
          <CardTitle className="text-neon-green flex items-center">
            <Coins className="mr-2" size={24} />
            SED Token Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              
              return (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`text-${stat.color}`} size={16} />
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold text-${stat.color}`}>
                      {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                    </span>
                    {stat.suffix && (
                      <span className="text-sm text-gray-500">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight className="text-green-500" size={12} />
                    <span className="text-xs text-green-500">{stat.trend}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rank Progression */}
      <Card className="bg-gray-800 border-neon-violet/30">
        <CardHeader>
          <CardTitle className="text-neon-violet flex items-center">
            <Target className="mr-2" size={24} />
            Rank Progression
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge className={`${
                user.rank === 'Ambassador' ? 'bg-neon-green/20 text-neon-green border-neon-green' :
                user.rank === 'Trailblazer' ? 'bg-neon-violet/20 text-neon-violet border-neon-violet' :
                'bg-neon-cyan/20 text-neon-cyan border-neon-cyan'
              }`}>
                {user.rank}
              </Badge>
              <p className="text-sm text-gray-400 mt-1">
                Current earning: {currentReward} SED per referral
              </p>
            </div>
            
            {user.rank !== 'Ambassador' && (
              <div className="text-right">
                <p className="text-sm text-gray-400">Next rank</p>
                <p className="font-bold text-neon-violet">{nextRank.rank}</p>
              </div>
            )}
          </div>

          {user.rank !== 'Ambassador' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextRank.rank}</span>
                <span>{user.totalInvites} / {nextRank.requirement}</span>
              </div>
              <Progress value={Math.min(progressToNext, 100)} className="h-2" />
              <p className="text-xs text-gray-500">
                {nextRank.requirement - user.totalInvites} more invites to rank up
              </p>
            </div>
          )}

          {/* Rank Benefits */}
          <div className="bg-gray-700/30 p-3 rounded border border-gray-600">
            <h5 className="font-bold text-sm mb-2">Current Benefits</h5>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• {currentReward} SED tokens per successful referral</li>
              <li>• Access to {user.rank.toLowerCase()} tier community</li>
              {user.rank === 'Ambassador' && <li>• Governance voting rights</li>}
              {user.rank !== 'Explorer' && <li>• Priority customer support</li>}
              <li>• Enhanced NFT minting benefits</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Earning Breakdown */}
      <Card className="bg-gray-800 border-neon-cyan/30">
        <CardHeader>
          <CardTitle className="text-neon-cyan">Earning Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Referral Rewards</span>
              <span className="font-bold text-neon-green">
                {user.totalInvites * currentReward} SED
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Signup Bonus</span>
              <span className="font-bold text-neon-cyan">50 SED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Activity Rewards</span>
              <span className="font-bold text-neon-violet">
                {Math.max(0, user.sedEarned - (user.totalInvites * currentReward) - 50)} SED
              </span>
            </div>
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between font-bold">
                <span>Total Balance</span>
                <span className="text-neon-green">{user.sedEarned} SED</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
