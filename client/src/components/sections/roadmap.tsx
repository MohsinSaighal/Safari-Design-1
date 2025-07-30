import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Check, 
  Coins, 
  Rocket, 
  Trophy, 
  Store, 
  Brain,
  BookOpen
} from 'lucide-react';

export default function Roadmap() {
  const isMobile = useIsMobile();

  const milestones = [
    {
      id: 1,
      title: 'MVP Build',
      description: 'Core platform development completed',
      status: 'completed',
      icon: Check,
      color: 'neon-green',
    },
    {
      id: 2,
      title: 'SED Token Creation',
      description: 'Token deployed on Polygon network',
      status: 'completed',
      icon: Coins,
      color: 'neon-green',
    },
    {
      id: 3,
      title: 'NFT Campaign Launch',
      description: 'Limited edition Key NFTs minting',
      status: 'current',
      icon: Rocket,
      color: 'neon-cyan',
    },
    {
      id: 4,
      title: 'Referral Leaderboard',
      description: 'Competition and rewards system',
      status: 'upcoming',
      icon: Trophy,
      color: 'gray',
    },
    {
      id: 5,
      title: 'Loyalty Marketplace',
      description: 'Redeem rewards for travel benefits',
      status: 'upcoming',
      icon: Store,
      color: 'gray',
    },
    {
      id: 6,
      title: 'AI Smart Alerts',
      description: 'Intelligent travel notifications',
      status: 'upcoming',
      icon: Brain,
      color: 'gray',
    },
    {
      id: 7,
      title: 'Post-Trip Journals',
      description: 'AI-powered travel memory system',
      status: 'future',
      icon: BookOpen,
      color: 'gray',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-neon-green text-black border-neon-green';
      case 'current':
        return 'bg-neon-cyan text-black border-neon-cyan animate-pulse-neon';
      case 'upcoming':
        return 'bg-gray-700 text-gray-400 border-gray-600';
      case 'future':
        return 'bg-gray-700 text-gray-400 border-gray-600';
      default:
        return 'bg-gray-700 text-gray-400 border-gray-600';
    }
  };

  const getCardBorder = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-neon-green/30';
      case 'current':
        return 'border-neon-cyan/50';
      default:
        return 'border-gray-600';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-neon-green';
      case 'current':
        return 'text-neon-cyan';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <section id="roadmap" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-space font-bold text-4xl lg:text-5xl mb-6">
            Building the New Era of Travel — Step by Step
          </h2>
        </motion.div>

        {/* Desktop Timeline */}
        {!isMobile && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="hidden md:block mb-16"
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-gray-600 transform -translate-y-1/2" />
              
              <div className="flex justify-between items-center relative">
                {milestones.slice(0, 6).map((milestone) => {
                  const IconComponent = milestone.icon;
                  const statusColor = getStatusColor(milestone.status);
                  const textColor = getTextColor(milestone.status);
                  
                  return (
                    <div key={milestone.id} className="flex flex-col items-center">
                      <motion.div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-gray-900 ${statusColor}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <IconComponent size={24} />
                      </motion.div>
                      
                      <Card className={`max-w-xs bg-gray-800 ${getCardBorder(milestone.status)}`}>
                        <CardContent className="p-4">
                          <h3 className={`font-bold mb-2 ${textColor}`}>
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {milestone.description}
                          </p>
                          {milestone.status === 'current' && (
                            <Badge className="mt-2 bg-neon-cyan/20 text-neon-cyan border-neon-cyan">
                              In Progress
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="md:hidden space-y-8"
        >
          {milestones.map((milestone) => {
            const IconComponent = milestone.icon;
            const statusColor = getStatusColor(milestone.status);
            const textColor = getTextColor(milestone.status);
            
            return (
              <motion.div
                key={milestone.id}
                variants={fadeInUp}
                className="flex items-start space-x-4"
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${statusColor}`}
                  whileHover={{ scale: 1.1 }}
                >
                  <IconComponent size={20} />
                </motion.div>
                
                <Card className={`flex-1 bg-gray-800 ${getCardBorder(milestone.status)}`}>
                  <CardContent className="p-4">
                    <h3 className={`font-bold mb-2 ${textColor}`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {milestone.description}
                    </p>
                    {milestone.status === 'current' && (
                      <Badge className="mt-2 bg-neon-cyan/20 text-neon-cyan border-neon-cyan">
                        In Progress
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Future Milestones Note */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="bg-gray-800 border-neon-violet/30 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="font-space font-bold text-xl text-neon-violet mb-4">
                What's Next?
              </h3>
              <p className="text-gray-400">
                Our roadmap continues to evolve based on community feedback and market demands. 
                Join our community to participate in governance decisions and help shape the future of SafariQ.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
