import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StackedCards from '@/components/ui/stacked-cards';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { FEATURES, PARTNER_INTEGRATIONS } from '@/lib/constants';
import { ArrowRight, Plane, MapPin, CreditCard, Users, Shield, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function TravelTechEcosystem() {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Zap;
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyan': return 'text-neon-cyan bg-neon-cyan/20 border-neon-cyan/50';
      case 'violet': return 'text-neon-violet bg-neon-violet/20 border-neon-violet/50';
      case 'green': return 'text-neon-green bg-neon-green/20 border-neon-green/50';
      default: return 'text-neon-cyan bg-neon-cyan/20 border-neon-cyan/50';
    }
  };

  return (
    <section id="ecosystem" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-space font-bold text-4xl lg:text-5xl mb-6"
          >
            The Future of Travel is Here — Powered by{' '}
            <span className="text-neon-cyan">AI</span> +{' '}
            <span className="text-neon-violet">Web3</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            SafariQ bridges all major travel services into one intelligent, reward-based platform.
          </motion.p>
        </motion.div>

        {/* Partner Integration Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="font-space font-bold text-3xl mb-4 text-neon-cyan">
              Expected Integrations
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Seamlessly connect with your favorite travel platforms and earn SED tokens with every interaction
            </p>
          </motion.div>
          
          <StackedCards 
            cards={PARTNER_INTEGRATIONS} 
            className="max-w-4xl mx-auto"
          />
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {FEATURES.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            const colorClasses = getColorClass(feature.color);
            
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:translate-y-[-2px] h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses}`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="font-space font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Infographic */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-800 p-8 rounded-lg border border-neon-cyan/30">
            <Badge variant="outline" className="font-bold text-lg px-4 py-2">
              Travel
            </Badge>
            <ArrowRight className="text-neon-cyan hidden md:block" />
            <div className="md:hidden">
              <ArrowRight className="text-neon-cyan rotate-90" />
            </div>
            <Badge className="font-bold text-lg px-4 py-2 bg-neon-cyan/20 text-neon-cyan border-neon-cyan">
              AI + SafariQ
            </Badge>
            <ArrowRight className="text-neon-violet hidden md:block" />
            <div className="md:hidden">
              <ArrowRight className="text-neon-violet rotate-90" />
            </div>
            <Badge className="font-bold text-lg px-4 py-2 bg-neon-violet/20 text-neon-violet border-neon-violet">
              Web3 Ownership
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
