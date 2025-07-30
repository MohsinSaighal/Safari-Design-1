import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';
import { SOCIAL_LINKS, ROUTES } from '@/lib/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { 
  Compass, 
  Twitter, 
  MessageCircle, 
  Users, 
  Radio,
  Heart
} from 'lucide-react';

export default function Footer() {
  const { connectWallet, walletAddress, isConnecting } = useWeb3();

  const handleConnectWallet = async () => {
    if (!walletAddress) {
      await connectWallet();
    }
  };

  const platformLinks = [
    { href: ROUTES.DASHBOARD, label: 'Dashboard' },
    { href: ROUTES.NFT_MINT, label: 'NFT Mint' },
    { href: '#signup', label: 'Referrals' },
    { href: '#web3', label: 'Rewards' },
  ];

  const legalLinks = [
    { href: `${ROUTES.LEGAL}#terms`, label: 'Terms & Conditions' },
    { href: `${ROUTES.LEGAL}#privacy`, label: 'Privacy Policy' },
    { href: `${ROUTES.LEGAL}#cookies`, label: 'Cookie Policy' },
    { href: 'mailto:hello@safariq.com', label: 'Contact' },
  ];

  const socialPlatforms = [
    { href: SOCIAL_LINKS.TWITTER, icon: Twitter, label: 'Twitter', color: 'neon-cyan' },
    { href: SOCIAL_LINKS.TELEGRAM, icon: MessageCircle, label: 'Telegram', color: 'neon-violet' },
    { href: SOCIAL_LINKS.DISCORD, icon: Users, label: 'Discord', color: 'neon-green' },
    { href: SOCIAL_LINKS.LENS, icon: Radio, label: 'Lens', color: 'neon-cyan' },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href={ROUTES.HOME}>
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Compass className="text-neon-cyan text-2xl animate-pulse-neon" />
                <span className="font-space font-bold text-xl">SafariQ</span>
              </motion.div>
            </Link>
            
            <p className="text-gray-400 text-sm max-w-sm">
              Bridging travel with ownership, loyalty & intelligence through Web3 and AI innovation.
            </p>
            
            <Button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-neon-cyan to-neon-violet text-white font-bold hover:opacity-90 transition-opacity"
            >
              {isConnecting 
                ? 'Connecting...' 
                : walletAddress 
                  ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : 'Connect Wallet'
              }
            </Button>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-neon-cyan mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                {platformLinks.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-gray-400 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link href={link.href}>
                        <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-neon-violet mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="font-bold text-neon-green mb-4">Community</h4>
            
            <div className="flex space-x-4 mb-6">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                
                return (
                  <motion.a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-${platform.color}/20 hover:text-${platform.color} transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
            
            {/* Web3 Indicators */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-gray-400">Polygon Network</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                <span className="text-gray-400">SED Token Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-violet rounded-full animate-pulse" />
                <span className="text-gray-400">NFT Minting Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SafariQ. All rights reserved. Patent-pending AI core technology.
          </p>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Built with</span>
            <Heart className="text-red-500 text-sm animate-pulse" size={14} />
            <span className="text-xs text-gray-500">for the Web3 travel community</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
