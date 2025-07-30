import { useState, useRef, memo, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StackedCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'cyan' | 'violet' | 'green' | 'orange' | 'pink';
  gradient: string;
}

interface StackedCardsProps {
  cards: readonly StackedCard[];
  className?: string;
}

const StackedCards = memo(function StackedCards({ cards, className = '' }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardHeight] = useState(280);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"]
  });

  // Use spring for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Memoize color classes for better performance
  const getColorClasses = useMemo(() => (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          text: 'text-neon-cyan',
          bg: 'bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5',
          border: 'border-neon-cyan/30',
          shadow: 'shadow-[0_0_30px_rgba(0,245,255,0.3)]',
          icon: 'bg-neon-cyan/20 text-neon-cyan'
        };
      case 'violet':
        return {
          text: 'text-neon-violet',
          bg: 'bg-gradient-to-br from-neon-violet/20 to-neon-violet/5',
          border: 'border-neon-violet/30',
          shadow: 'shadow-[0_0_30px_rgba(138,43,226,0.3)]',
          icon: 'bg-neon-violet/20 text-neon-violet'
        };
      case 'green':
        return {
          text: 'text-neon-green',
          bg: 'bg-gradient-to-br from-neon-green/20 to-neon-green/5',
          border: 'border-neon-green/30',
          shadow: 'shadow-[0_0_30px_rgba(0,255,127,0.3)]',
          icon: 'bg-neon-green/20 text-neon-green'
        };
      case 'orange':
        return {
          text: 'text-orange-400',
          bg: 'bg-gradient-to-br from-orange-500/20 to-orange-500/5',
          border: 'border-orange-400/30',
          shadow: 'shadow-[0_0_30px_rgba(251,146,60,0.3)]',
          icon: 'bg-orange-400/20 text-orange-400'
        };
      case 'pink':
        return {
          text: 'text-pink-400',
          bg: 'bg-gradient-to-br from-pink-500/20 to-pink-500/5',
          border: 'border-pink-400/30',
          shadow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
          icon: 'bg-pink-400/20 text-pink-400'
        };
      default:
        return {
          text: 'text-neon-cyan',
          bg: 'bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5',
          border: 'border-neon-cyan/30',
          shadow: 'shadow-[0_0_30px_rgba(0,245,255,0.3)]',
          icon: 'bg-neon-cyan/20 text-neon-cyan'
        };
    }
  }, []);

  return (
    <div className={`relative ${className}`} style={{ position: 'relative' }}>
      <div 
        ref={containerRef} 
        className="relative"
        style={{ height: `${cardHeight * cards.length + 150}px` }}
      >
        {cards.map((card, index) => {
          const targetY = index * 20;
          const colors = getColorClasses(card.color);
          
          // Progressive stacking as user scrolls
          const startScroll = Math.max(0, (index / cards.length) * 0.8);
          const endScroll = Math.min(1, startScroll + 0.3);
          
          // Use smooth spring animations for better performance
          const y = useTransform(
            smoothProgress,
            [startScroll, endScroll],
            [index * cardHeight * 0.6, targetY]
          );
          
          const scale = useTransform(
            smoothProgress,
            [startScroll, endScroll],
            [1, 0.97 - index * 0.015]
          );
          
          const opacity = useTransform(
            smoothProgress,
            [startScroll, endScroll],
            [1, Math.max(0.6, 1 - index * 0.08)]
          );

          const rotate = useTransform(
            smoothProgress,
            [startScroll, endScroll],
            [0, index * 1.2 - 1.2]
          );

          return (
            <motion.div
              key={card.id}
              className="absolute w-full will-change-transform"
              style={{
                y,
                scale,
                opacity,
                rotate,
                zIndex: cards.length - index,
                transformOrigin: "center center"
              }}
              initial={{ y: index * cardHeight * 0.6 + 30, opacity: 0 }}
              animate={{ y: index * cardHeight * 0.6, opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                type: "tween",
                ease: "easeOut"
              }}
            >
              <Card 
                className={`
                  ${colors.bg} ${colors.border} ${colors.shadow}
                  border-2 backdrop-blur-sm
                  transform-gpu will-change-transform
                  transition-transform duration-200 ease-out
                  hover:scale-[1.02] hover:${colors.shadow.replace('0.3', '0.4')}
                `}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`
                      w-16 h-16 rounded-xl ${colors.icon}
                      flex items-center justify-center text-2xl font-bold
                      shadow-lg transform-gpu transition-transform duration-300
                      group-hover:scale-110
                    `}>
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-space font-bold text-2xl mb-3 ${colors.text}`}>
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative gradient overlay */}
                  <div 
                    className={`
                      absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full
                      ${card.gradient}
                    `}
                  />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

export default StackedCards;