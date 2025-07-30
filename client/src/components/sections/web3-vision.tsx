import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useWeb3 } from '@/hooks/use-web3';
import { Link } from 'wouter';
import { 
  Coins, 
  Key, 
  Lock, 
  Gem, 
  Plus, 
  Hammer, 
  Users, 
  Plane, 
  DollarSign, 
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Web3Vision() {
  const { nftStats } = useWeb3();
  const isMobile = useIsMobile();
  const mintProgress = (nftStats.totalMinted / nftStats.maxSupply) * 100;

  return (
    <section id="web3" className="py-20 gradient-bg">
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
            Own Your Travel, With{' '}
            <span className="text-neon-green">SED Tokens</span>,{' '}
            <span className="text-neon-violet">NFTs</span>, and Real Utility
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* SED Token Utility */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              variants={fadeInUp}
              className="font-space font-bold text-2xl text-neon-green mb-6"
            >
              SED Token Utility
            </motion.h3>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-800 border-neon-green/30 p-6">
                <div className="flex items-center mb-4">
                  <Coins className="text-neon-green text-2xl mr-4" />
                  <h4 className="font-bold text-xl">Rewards System</h4>
                </div>
                <p className="text-gray-400 mb-4">
                  Earn SED tokens for referrals, travel bookings, and platform engagement
                </p>
                <div className="bg-neon-green/10 p-4 rounded border border-neon-green/20">
                  <div className="flex justify-between">
                    <span>Current Status:</span>
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green">
                      Active on Polygon
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-800 border-neon-green/30 p-6">
                <div className="flex items-center mb-4">
                  <Lock className="text-neon-green text-2xl mr-4" />
                  <h4 className="font-bold text-xl">Staking Rewards</h4>
                </div>
                <p className="text-gray-400">
                  Stake SED tokens to earn additional rewards and platform benefits
                </p>
              </Card>
            </motion.div>
          </motion.div>

          {/* NFT Vault */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              variants={fadeInUp}
              className="font-space font-bold text-2xl text-neon-violet mb-6"
            >
              NFT Vault Overview
            </motion.h3>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-800 border-neon-violet/30 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Key className="text-neon-violet text-2xl mr-4" />
                    <h4 className="font-bold text-xl">Serialized Key NFTs</h4>
                  </div>
                  <Badge className="bg-neon-violet/20 text-neon-violet border-neon-violet">
                    Limited Edition
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">
                  Exclusive NFTs that unlock premium travel benefits and enhanced rewards
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-neon-violet/10 p-4 rounded text-center border border-neon-violet/20">
                    <Gem className="text-neon-violet text-xl mb-2 mx-auto" />
                    <div className="text-sm text-neon-violet font-bold">#001</div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded text-center border border-gray-600">
                    <Plus className="text-gray-500 text-xl mb-2 mx-auto" />
                    <div className="text-sm text-gray-500">Mint</div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded text-center border border-gray-600">
                    <Plus className="text-gray-500 text-xl mb-2 mx-auto" />
                    <div className="text-sm text-gray-500">Mint</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-800 border-neon-violet/30 p-6">
                <h4 className="font-bold text-xl mb-4">Minting Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Minted</span>
                    <span>{nftStats.totalMinted} / {nftStats.maxSupply}</span>
                  </div>
                  <Progress value={mintProgress} className="h-2" />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* RWA Infographic */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-space font-bold text-2xl mb-8">The SafariQ Ownership Loop</h3>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center items-center ${isMobile ? 'space-y-4' : 'space-x-6'} bg-gray-800 p-8 rounded-lg border border-neon-cyan/30`}>
            {[
              { icon: Hammer, label: 'NFT Mint', color: 'neon-violet' },
              { icon: Users, label: 'Referral', color: 'neon-green' },
              { icon: Plane, label: 'Booking', color: 'neon-violet' },
              { icon: Coins, label: 'SED Rewards', color: 'neon-green' },
              { icon: DollarSign, label: 'Claim / Hold', color: 'neon-cyan' }
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <step.icon className={`text-${step.color}`} size={20} />
                  <span className="font-bold">{step.label}</span>
                </div>
                {index < 4 && (
                  <>
                    {isMobile ? (
                      <ArrowDown className="text-neon-cyan mx-auto my-2" />
                    ) : (
                      <ArrowRight className="text-neon-cyan mx-3" />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/nft-mint">
              <Button className="px-8 py-4 bg-neon-violet text-white font-bold text-lg hover:bg-neon-violet/90 transition-all duration-300 brutalist-shadow-violet hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                Mint NFT
              </Button>
            </Link>
            <Button
              variant="outline"
              className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-bold text-lg hover:bg-neon-cyan/10 transition-all duration-300"
            >
              Connect Wallet
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 border-2 border-neon-green text-neon-green font-bold text-lg hover:bg-neon-green/10 transition-all duration-300"
              onClick={() => {
                const signupSection = document.querySelector('#signup');
                if (signupSection) {
                  signupSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Signup
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
