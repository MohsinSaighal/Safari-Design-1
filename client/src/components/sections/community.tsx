import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { 
  Twitter, 
  MessageCircle, 
  Users, 
  Radio,
  ExternalLink,
  Mail,
  Send
} from 'lucide-react';

export default function Community() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter/subscribe', { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive weekly updates about SafariQ development and Web3 travel insights.",
      });
      setEmail('');
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Unable to subscribe. Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const socialPlatforms = [
    {
      name: 'Twitter / X',
      handle: '@SafariQ_W3',
      description: 'Latest updates and announcements',
      icon: Twitter,
      color: 'neon-cyan',
      href: SOCIAL_LINKS.TWITTER,
    },
    {
      name: 'Telegram',
      handle: 'SafariQ Community',
      description: 'Join our community discussions',
      icon: MessageCircle,
      color: 'neon-violet',
      href: SOCIAL_LINKS.TELEGRAM,
    },
    {
      name: 'Discord',
      handle: 'SafariQ Server',
      description: 'Chat with the SafariQ community',
      icon: Users,
      color: 'neon-green',
      href: SOCIAL_LINKS.DISCORD,
    },
    {
      name: 'Lens Protocol',
      handle: 'safariq.lens',
      description: 'Follow us on decentralized social',
      icon: Radio,
      color: 'neon-cyan',
      href: SOCIAL_LINKS.LENS,
    },
  ];

  const mockTweets = [
    {
      content: '🚀 NFT Campaign is live! Join the first wave of SafariQ Key holders and unlock exclusive travel benefits. Limited to 1,000 NFTs. #Web3Travel #SafariQ',
      time: '2 hours ago',
      color: 'neon-cyan',
    },
    {
      content: '🌍 The future of travel is decentralized. Own your data, earn rewards, and travel smarter with SafariQ\'s Web3 ecosystem. #TravelTech #Blockchain',
      time: '1 day ago',
      color: 'neon-violet',
    },
  ];

  return (
    <section id="community" className="py-20 bg-gray-800/30">
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
            Join Our <span className="text-neon-cyan">Community</span> & Stay Updated
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with fellow travelers, get the latest updates, and be part of the Web3 travel revolution.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Social Links */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-space font-bold text-2xl text-neon-cyan mb-6">
              Follow Us
            </h3>
            
            <div className="space-y-4">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                
                return (
                  <motion.a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-${platform.color}/50 transition-all duration-300 hover:translate-x-2 group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className={`text-${platform.color} text-2xl`} />
                    <div className="flex-1">
                      <h4 className="font-bold group-hover:text-white transition-colors">
                        {platform.name}
                      </h4>
                      <p className="text-sm text-gray-400">{platform.description}</p>
                      <p className="text-xs text-gray-500">{platform.handle}</p>
                    </div>
                    <ExternalLink className="text-gray-500 group-hover:text-gray-300 transition-colors" size={16} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Newsletter Signup and Live Feed */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="font-space font-bold text-2xl text-neon-violet mb-6">
              Newsletter & Updates
            </h3>
            
            {/* Newsletter Subscription */}
            <Card className="bg-gray-800 border-neon-violet/30">
              <CardHeader>
                <CardTitle className="text-neon-violet flex items-center">
                  <Mail size={20} className="mr-2" />
                  Weekly Newsletter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Get weekly updates on SafariQ development, Web3 travel insights, and exclusive community benefits.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 focus:border-neon-violet"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={newsletterMutation.isPending}
                    className="w-full bg-neon-violet text-white hover:bg-neon-violet/90 transition-all duration-300"
                  >
                    <Send size={16} className="mr-2" />
                    {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe to Updates'}
                  </Button>
                </form>
                
                <p className="text-xs text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </CardContent>
            </Card>

            {/* Live Feed Preview */}
            <Card className="bg-gray-800 border-neon-green/30">
              <CardHeader>
                <CardTitle className="text-neon-green flex items-center">
                  <Twitter size={20} className="mr-2" />
                  Latest from @SafariQ_W3
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTweets.map((tweet, index) => (
                  <div key={index} className={`border-l-2 border-${tweet.color} pl-4`}>
                    <p className="text-sm text-gray-300 mb-2">{tweet.content}</p>
                    <span className="text-xs text-gray-500">{tweet.time}</span>
                  </div>
                ))}
                
                <a
                  href={SOCIAL_LINKS.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-neon-cyan hover:text-neon-cyan/80 transition-colors"
                >
                  <span className="text-sm">View all tweets</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-cyan">2.4K+</div>
                    <div className="text-sm text-gray-400">Discord Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-violet">1.8K+</div>
                    <div className="text-sm text-gray-400">Twitter Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-green">950+</div>
                    <div className="text-sm text-gray-400">Telegram Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-cyan">24/7</div>
                    <div className="text-sm text-gray-400">Community Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-neon-cyan/30 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="font-space font-bold text-2xl text-neon-cyan mb-4">
                Ready to Join the Revolution?
              </h3>
              <p className="text-gray-400 mb-6">
                Become part of the SafariQ community and help shape the future of Web3 travel. 
                Connect with like-minded travelers, developers, and crypto enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-neon-cyan text-black hover:bg-neon-cyan/90"
                >
                  <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-neon-violet text-neon-violet hover:bg-neon-violet/10"
                >
                  <a href={SOCIAL_LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer">
                    Join Telegram
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
