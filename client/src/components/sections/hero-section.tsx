import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { fadeInUp, staggerContainer, floatAnimation, glowAnimation } from '@/lib/animations';
import { 
  Plane, 
  Hotel, 
  Car, 
  UtensilsCrossed, 
  ArrowRight, 
  ArrowDown, 
  Compass,
  Tag,
  Wallet,
  Key,
  Coins
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function HeroSection() {
  const isMobile = useIsMobile();

  const handleScrollToSignup = () => {
    const signupSection = document.querySelector('#signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const ecosystemSection = document.querySelector('#ecosystem');
    if (ecosystemSection) {
      ecosystemSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10"
        >
          <Plane className="text-neon-cyan text-4xl" />
        </motion.div>
        <motion.div
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20"
        >
          <Hotel className="text-neon-violet text-3xl" />
        </motion.div>
        <motion.div
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-40 left-20"
        >
          <Car className="text-neon-green text-3xl" />
        </motion.div>
        <motion.div
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '0.5s' }}
          className="absolute bottom-20 right-10"
        >
          <UtensilsCrossed className="text-neon-cyan text-2xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Patent-Pending Badge */}
          <motion.div variants={fadeInUp}>
            <Badge className="inline-flex items-center px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
              <Tag className="mr-2" size={16} />
              Patent-Pending Core AI
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-space font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight"
          >
            Travel is <span className="text-neon-cyan">Broken</span>.<br />
            We're <span className="text-neon-violet">Fixing</span> It —<br />
            With <span className="text-neon-green">Web3</span> + Patent-Ready AI.
          </motion.h1>

          {/* Subheadlines */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto">
              From scattered bookings to zero loyalty, the travel industry is fragmented.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
              SafariQ is building a unified ecosystem powered by Web3 and a revolutionary AI core, 
              bridging global services into one intelligent travel experience.
            </p>
          </motion.div>

          {/* Bridge Visual */}
          <motion.div variants={fadeInUp} className="py-8">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center ${isMobile ? 'space-y-4' : 'space-x-8'}`}>
              {/* Travel Services */}
              <div className="flex flex-wrap justify-center gap-4 opacity-60">
                {[Plane, Hotel, Car, UtensilsCrossed].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700"
                    whileHover={{ scale: 1.1, opacity: 1 }}
                  >
                    <Icon className="text-gray-400" size={20} />
                  </motion.div>
                ))}
              </div>

              {/* Bridge Arrow */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                {isMobile ? (
                  <ArrowDown className="text-neon-cyan text-2xl" />
                ) : (
                  <ArrowRight className="text-neon-cyan text-2xl" />
                )}
              </motion.div>

              {/* SafariQ Core */}
              <motion.div
                variants={glowAnimation}
                initial="initial"
                animate="animate"
                className="relative"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-green rounded-xl flex items-center justify-center">
                  <Compass className="text-white text-2xl" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-neon-cyan whitespace-nowrap">
                  AI + Web3
                </div>
              </motion.div>

              {/* Bridge Arrow */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="flex items-center"
              >
                {isMobile ? (
                  <ArrowDown className="text-neon-green text-2xl" />
                ) : (
                  <ArrowRight className="text-neon-green text-2xl" />
                )}
              </motion.div>

              {/* Ownership Icons */}
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { Icon: Wallet, color: 'neon-cyan' },
                  { Icon: Key, color: 'neon-violet' },
                  { Icon: Coins, color: 'neon-green' }
                ].map(({ Icon, color }, index) => (
                  <motion.div
                    key={index}
                    className={`w-12 h-12 bg-${color}/20 rounded-lg flex items-center justify-center border border-${color}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className={`text-${color}`} size={20} />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-center text-neon-cyan font-medium mt-6 text-lg"
            >
              "SafariQ — Bridging Travel with Ownership, Loyalty & Intelligence"
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <EnhancedButton
              onClick={handleScrollToSignup}
              variant="cyber-cyan"
              size="lg"
              glowEffect
              className="px-8 py-4 text-lg"
            >
              Join the Journey
            </EnhancedButton>
            <EnhancedButton
              onClick={handleLearnMore}
              variant="cyber-violet"
              size="lg"
              className="px-8 py-4 text-lg"
            >
              How SafariQ Works
            </EnhancedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
