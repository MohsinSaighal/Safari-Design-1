import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fadeInUp } from '@/lib/animations';
import { Trophy, Crown, Medal, Star } from 'lucide-react';
import type { User } from '@/types';

interface LeaderboardProps {
  isPreview?: boolean;
  limit?: number;
}

export default function Leaderboard({ isPreview = false, limit = 10 }: LeaderboardProps) {
  const { data, isLoading, error } = useQuery<{ leaderboard: User[] }>({
    queryKey: ['/api/leaderboard'],
    queryFn: async () => {
      const response = await fetch(`/api/leaderboard?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return response.json();
    },
  });

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Medal className="text-orange-600" size={20} />;
      default: return <Star className="text-gray-500" size={16} />;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-orange-600';
      default: return 'text-gray-300';
    }
  };

  const getRankBadgeColor = (rank: string) => {
    switch (rank) {
      case 'Ambassador': return 'bg-neon-green/20 text-neon-green border-neon-green';
      case 'Trailblazer': return 'bg-neon-violet/20 text-neon-violet border-neon-violet';
      default: return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan';
    }
  };

  if (isLoading) {
    return (
      <Card className={`bg-gray-800 ${isPreview ? 'border-neon-green/30' : 'border-gray-700'}`}>
        <CardHeader>
          <CardTitle className={isPreview ? 'text-neon-green' : ''}>
            {isPreview ? 'Top Referrers' : 'Leaderboard'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: isPreview ? 3 : 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-24 h-4" />
              </div>
              <Skeleton className="w-16 h-4" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`bg-gray-800 ${isPreview ? 'border-red-500/30' : 'border-gray-700'}`}>
        <CardHeader>
          <CardTitle className={isPreview ? 'text-red-500' : ''}>
            {isPreview ? 'Top Referrers' : 'Leaderboard'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">
            Unable to load leaderboard data. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  const leaderboard = data?.leaderboard || [];

  if (leaderboard.length === 0) {
    return (
      <Card className={`bg-gray-800 ${isPreview ? 'border-neon-green/30' : 'border-gray-700'}`}>
        <CardHeader>
          <CardTitle className={isPreview ? 'text-neon-green' : ''}>
            {isPreview ? 'Top Referrers' : 'Leaderboard'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Trophy className="mx-auto text-gray-500 mb-4" size={48} />
            <p className="text-gray-400">
              No referral data yet. Be the first to start earning SED tokens!
            </p>
          </div>
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
      <Card className={`bg-gray-800 ${isPreview ? 'border-neon-green/30' : 'border-gray-700'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${isPreview ? 'text-neon-green' : ''}`}>
            <Trophy className="mr-2" size={24} />
            {isPreview ? 'Top Referrers' : 'Leaderboard'}
          </CardTitle>
          {!isPreview && (
            <p className="text-gray-400 text-sm">
              Top performers earning SED tokens through referrals
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.slice(0, isPreview ? 3 : limit).map((user, index) => {
            const position = index + 1;
            const displayName = user.name || `User${user.id.slice(-4)}`;
            
            return (
              <motion.div
                key={user.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  position <= 3 ? 'bg-gray-700/50' : 'bg-gray-800/50'
                } hover:bg-gray-700 transition-colors`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center ${getRankColor(position)}`}>
                    {getRankIcon(position)}
                  </div>
                  <div>
                    <div className="font-medium">{displayName}</div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getRankBadgeColor(user.rank)}`}>
                        {user.rank}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {user.totalInvites} invites
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neon-green">
                    {user.sedEarned} SED
                  </div>
                  <div className="text-xs text-gray-500">
                    #{position}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {isPreview && (
            <Button
              variant="outline"
              className="w-full mt-4 border-neon-green text-neon-green hover:bg-neon-green/10"
            >
              View Full Leaderboard
            </Button>
          )}
          
          {!isPreview && leaderboard.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="mx-auto text-gray-500 mb-4" size={48} />
              <p className="text-gray-400">
                No data available yet. Start referring friends to see your ranking!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
