import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, Compass } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-md"
      >
        <Card className="bg-gray-800 border-neon-cyan/30">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Compass className="h-16 w-16 text-neon-cyan animate-pulse-neon" />
                <AlertCircle className="h-6 w-6 text-red-500 absolute -top-1 -right-1" />
              </div>
            </div>

            <h1 className="font-space font-bold text-3xl text-white mb-2">
              404 - Lost in Space
            </h1>
            
            <p className="text-gray-400 mb-6">
              Looks like this page took a wrong turn on the Web3 highway. 
              Let's get you back to SafariQ.
            </p>

            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/90 brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300">
                  <Home size={16} className="mr-2" />
                  Return Home
                </Button>
              </Link>
              
              <div className="text-xs text-gray-500">
                <p>Error Code: 404 | SafariQ Travel Platform</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
