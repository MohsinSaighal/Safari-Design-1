import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { fadeInUp } from '@/lib/animations';
import { CheckCircle, Copy } from 'lucide-react';

interface SignupFormData {
  name: string;
  email: string;
  country: string;
  walletAddress: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    country: '',
    walletAddress: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const countries = [
    'United States',
    'United Kingdom', 
    'United Arab Emirates',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Singapore',
    'Japan',
    'Other'
  ];

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.country) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      country: formData.country,
      walletAddress: formData.walletAddress || undefined,
    });

    if (result.success) {
      // Generate a mock referral code for display
      const mockCode = `SAFARI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReferralCode(mockCode);
      setIsSubmitted(true);
      
      toast({
        title: "Welcome to SafariQ!",
        description: "Your account has been created successfully. Start inviting friends to earn SED tokens!",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: result.error || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard.",
    });
  };

  if (isSubmitted && referralCode) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <Card className="bg-gray-800 border-neon-green/30">
          <CardHeader>
            <CardTitle className="text-neon-green flex items-center">
              <CheckCircle className="mr-2" size={24} />
              Welcome to SafariQ!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Your account has been created successfully! Here's your unique referral code:
            </p>
            
            <div className="flex items-center space-x-2">
              <code className="bg-gray-700 px-3 py-2 rounded text-neon-cyan font-mono text-lg flex-1">
                {referralCode}
              </code>
              <Button
                onClick={copyReferralCode}
                variant="outline"
                size="sm"
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
              >
                <Copy size={16} />
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-neon-violet">What's Next?</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Share your referral code with friends</li>
                <li>• Earn 10 SED tokens for each successful referral</li>
                <li>• Access your dashboard to track progress</li>
                <li>• Consider minting a SafariQ Key NFT for exclusive benefits</li>
              </ul>
            </div>

            <Badge className="w-full justify-center bg-neon-green/20 text-neon-green border-neon-green">
              🎉 You've earned 50 bonus SED tokens for joining!
            </Badge>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <Card className="bg-gray-800 border-neon-cyan/30">
        <CardHeader>
          <CardTitle className="text-neon-cyan">Join SafariQ Early Access</CardTitle>
          <p className="text-gray-400">
            Be among the first to experience the future of Web3 travel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-gray-700 border-gray-600 focus:border-neon-cyan"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-700 border-gray-600 focus:border-neon-cyan"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="country" className="text-sm font-medium mb-2 block">
                Country *
              </Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => handleInputChange('country', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 focus:border-neon-cyan">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="wallet" className="text-sm font-medium mb-2 block">
                Wallet Address (Optional)
              </Label>
              <Input
                id="wallet"
                type="text"
                placeholder="0x..."
                value={formData.walletAddress}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                className="bg-gray-700 border-gray-600 focus:border-neon-violet"
              />
              <p className="text-xs text-gray-500 mt-1">
                Connect your Web3 wallet to receive SED tokens directly
              </p>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-neon-cyan text-black font-bold text-lg hover:bg-neon-cyan/90 transition-all duration-300"
            >
              {isLoading ? 'Creating Account...' : 'Join the Journey'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <a href="/legal" className="text-neon-cyan hover:underline">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/legal" className="text-neon-cyan hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
