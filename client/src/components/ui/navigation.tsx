import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { useWeb3 } from '@/hooks/use-web3';
import { ROUTES } from '@/lib/constants';

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { walletAddress, connectWallet, isConnecting } = useWeb3();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#ecosystem', label: 'Ecosystem' },
    { href: '#web3', label: 'Web3' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#community', label: 'Community' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleConnectWallet = async () => {
    if (isConnecting || walletAddress) return;
    
    try {
      const result = await connectWallet();
      if (!result.success) {
        console.error('Failed to connect wallet:', result.error);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-neon-cyan/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME}>
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="text-neon-cyan text-2xl animate-pulse-neon" />
              <span className="font-space font-bold text-xl">SafariQ</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {location === ROUTES.HOME && navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-neon-cyan transition-colors font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.button>
            ))}
            
            {isAuthenticated && user && (
              <div className="flex items-center space-x-4">
                <Link href={ROUTES.DASHBOARD}>
                  <motion.span 
                    className="hover:text-neon-cyan transition-colors font-medium cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </motion.span>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Welcome,</span>
                  <span className="text-neon-cyan font-medium">{user.name}</span>
                  <Badge className="bg-neon-violet/20 text-neon-violet border-neon-violet/30">
                    {user.rank}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center space-x-4">
            <EnhancedButton
              onClick={handleConnectWallet}
              disabled={isConnecting}
              variant="cyber-cyan"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 min-h-[44px] touch-manipulation"
            >
              <Wallet size={16} />
              <span className="whitespace-nowrap">
                {isConnecting 
                  ? 'Connecting...' 
                  : walletAddress 
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : 'Connect Wallet'
                }
              </span>
            </EnhancedButton>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-neon-cyan"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              {location === ROUTES.HOME && navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left py-2 hover:text-neon-cyan transition-colors"
                >
                  {link.label}
                </button>
              ))}
              
              {isAuthenticated && (
                <Link href={ROUTES.DASHBOARD}>
                  <div className="block py-2 hover:text-neon-cyan transition-colors cursor-pointer">
                    Dashboard
                  </div>
                </Link>
              )}

              <div className="pt-2 border-t border-gray-700">
                <EnhancedButton
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  variant="cyber-cyan"
                  className="w-full flex items-center justify-center space-x-2 py-3 min-h-[48px] touch-manipulation"
                >
                  <Wallet size={16} />
                  <span className="whitespace-nowrap">
                    {isConnecting 
                      ? 'Connecting...' 
                      : walletAddress 
                        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                        : 'Connect Wallet'
                    }
                  </span>
                </EnhancedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
