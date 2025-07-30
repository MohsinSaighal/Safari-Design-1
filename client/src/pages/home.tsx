import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/hero-section';
import TravelTechEcosystem from '@/components/sections/travel-tech-ecosystem';
import Web3Vision from '@/components/sections/web3-vision';
import ReferralSignup from '@/components/sections/referral-signup';
import Roadmap from '@/components/sections/roadmap';
import Community from '@/components/sections/community';
import Footer from '@/components/sections/footer';
import { fadeIn } from '@/lib/animations';

export default function Home() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="min-h-screen"
    >
      <HeroSection />
      <TravelTechEcosystem />
      <Web3Vision />
      <ReferralSignup />
      <Roadmap />
      <Community />
      <Footer />
    </motion.div>
  );
}
