import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SignupForm from '@/components/features/signup-form';
import Leaderboard from '@/components/features/leaderboard';

export default function ReferralSignup() {
  return (
    <section id="signup" className="py-20 bg-gray-800/30">
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
            Join or Invite Friends, Earn{' '}
            <span className="text-neon-green">AED pegged SED Tokens</span>, and Travel Rewards
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Signup Form */}
          <motion.div variants={fadeInUp}>
            <SignupForm />
          </motion.div>

          {/* Referral Dashboard Preview */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-space font-bold text-2xl text-neon-violet">
              Referral Dashboard Preview
            </h3>

            <Card className="bg-gray-800 border-neon-violet/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Progress</CardTitle>
                  <div className="bg-neon-violet/20 px-3 py-1 rounded-full text-sm text-neon-violet">
                    Explorer
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Invites</span>
                  <span className="font-bold text-2xl text-neon-green">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">SED Earned</span>
                  <span className="font-bold text-2xl text-neon-cyan">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Rank</span>
                  <span className="font-bold text-lg text-neon-violet">Explorer</span>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Trailblazer</span>
                    <span>7/15</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-neon-violet h-2 rounded-full transition-all duration-300"
                      style={{ width: '46.7%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Leaderboard isPreview />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
