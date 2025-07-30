import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'cyber-cyan' | 'cyber-violet' | 'cyber-green';
  glowEffect?: boolean;
  pulseEffect?: boolean;
  floatEffect?: boolean;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    glowEffect = false, 
    pulseEffect = false, 
    floatEffect = false,
    children, 
    ...props 
  }, ref) => {
    
    const getVariantClasses = (variant: string) => {
      switch (variant) {
        case 'cyber-cyan':
          return cn(
            'bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan',
            'hover:bg-neon-cyan hover:text-gray-900 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]',
            'active:bg-neon-cyan/80 active:scale-95',
            'transition-all duration-300 transform hover:scale-105',
            'font-space font-semibold tracking-wide',
            'backdrop-blur-sm touch-manipulation',
            'focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          );
        case 'cyber-violet':
          return cn(
            'bg-neon-violet/20 border-2 border-neon-violet text-neon-violet',
            'hover:bg-neon-violet hover:text-white hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]',
            'active:bg-neon-violet/80 active:scale-95',
            'transition-all duration-300 transform hover:scale-105',
            'font-space font-semibold tracking-wide',
            'backdrop-blur-sm touch-manipulation',
            'focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          );
        case 'cyber-green':
          return cn(
            'bg-neon-green/20 border-2 border-neon-green text-neon-green',
            'hover:bg-neon-green hover:text-gray-900 hover:shadow-[0_0_30px_rgba(0,255,127,0.5)]',
            'active:bg-neon-green/80 active:scale-95',
            'transition-all duration-300 transform hover:scale-105',
            'font-space font-semibold tracking-wide',
            'backdrop-blur-sm touch-manipulation',
            'focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          );
        default:
          return '';
      }
    };

    const baseClasses = cn(
      'relative overflow-hidden group',
      glowEffect && 'animate-glow-cyan',
      pulseEffect && 'animate-pulse-neon',
      floatEffect && 'animate-float',
      getVariantClasses(variant),
      className
    );

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Button
          ref={ref}
          variant={variant.startsWith('cyber') ? 'outline' : variant as any}
          className={baseClasses}
          {...props}
        >
          {/* Animated background gradient for cyber variants */}
          {variant.startsWith('cyber') && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-[-16px] mr-[-16px] mt-[2px] mb-[2px] pl-[22px] pr-[22px] pt-[10px] pb-[10px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </div>
          )}
          
          <span className="relative z-10">{children}</span>
        </Button>
      </motion.div>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton };