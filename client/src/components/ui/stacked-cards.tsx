import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

export default function StackedCards({ cards, className = '' }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(400);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  useEffect(() => {
    if (containerRef.current) {
      setCardHeight(350); // Fixed height for better spacing
    }
  }, [cards.length]);

  const getColorClasses = (color: string) => {
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
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={containerRef} 
        className="relative"
        style={{ height: `${cardHeight * cards.length + 600}px` }}
      >
        {cards.map((card, index) => {
          const targetY = index * 25; // Tighter stack offset when stacked
          const colors = getColorClasses(card.color);
          
          // Initial vertical separation - cards start far apart
          const initialSeparation = index * 180;
          
          const y = useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [initialSeparation, initialSeparation * 0.3, targetY, targetY]
          );
          
          const scale = useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [1, 0.98, 0.94 - index * 0.03, 0.94 - index * 0.03]
          );
          
          const opacity = useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [1, 1, Math.max(0.4, 1 - index * 0.15), Math.max(0.4, 1 - index * 0.15)]
          );

          const rotate = useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [0, 0, index * 1.5 - 1.5, index * 1.5 - 1.5]
          );

          return (
            <motion.div
              key={card.id}
              className="absolute w-full"
              style={{
                y,
                scale,
                opacity,
                rotate,
                zIndex: cards.length - index,
              }}
              initial={{ y: initialSeparation + 50, opacity: 0 }}
              animate={{ y: initialSeparation, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                damping: 25,
                stiffness: 100
              }}
            >
              <Card 
                className={`
                  ${colors.bg} ${colors.border} ${colors.shadow}
                  border-2 backdrop-blur-sm
                  transform-gpu transition-all duration-300
                  hover:scale-105 hover:${colors.shadow.replace('0.3', '0.5')}
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
}