export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  NFT_MINT: '/nft-mint',
  LEGAL: '/legal',
} as const;

export const RANKS = {
  EXPLORER: 'Explorer',
  TRAILBLAZER: 'Trailblazer',
  AMBASSADOR: 'Ambassador',
} as const;

export const RANK_REQUIREMENTS = {
  [RANKS.EXPLORER]: 0,
  [RANKS.TRAILBLAZER]: 15,
  [RANKS.AMBASSADOR]: 50,
} as const;

export const COLORS = {
  NEON_CYAN: '#00f5ff',
  NEON_VIOLET: '#8a2be2',
  NEON_GREEN: '#00ff7f',
} as const;

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/SafariQ_W3',
  TELEGRAM: 'https://t.me/safariq',
  DISCORD: 'https://discord.gg/safariq',
  LENS: 'https://lens.xyz/u/safariq',
} as const;

export const PARTNER_LOGOS = [
  'Booking.com',
  'Skyscanner', 
  'Agoda',
  'Airbnb',
  'Emirates',
  'Uber',
] as const;

export const PARTNER_INTEGRATIONS = [
  {
    id: '1',
    title: 'Booking.com',
    description: 'Access millions of accommodations worldwide with exclusive member rates and instant SED token rewards on every booking.',
    icon: '🏨',
    color: 'cyan' as const,
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600'
  },
  {
    id: '2', 
    title: 'Skyscanner',
    description: 'Compare and book flights across all airlines with AI-powered price prediction and guaranteed best deals.',
    icon: '✈️',
    color: 'violet' as const,
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600'
  },
  {
    id: '3',
    title: 'Agoda',
    description: 'Unlock hidden hotel deals in Asia-Pacific with loyalty points that convert directly to SED tokens.',
    icon: '🌏',
    color: 'green' as const,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600'
  },
  {
    id: '4',
    title: 'Airbnb',
    description: 'Discover unique stays and experiences with verified hosts, plus earn tokens for hosting and traveling.',
    icon: '🏠',
    color: 'orange' as const,
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    id: '5',
    title: 'Emirates',
    description: 'Premium airline experiences with first-class service, exclusive lounges, and triple SED token rewards.',
    icon: '🛫',
    color: 'pink' as const,
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-600'
  },
  {
    id: '6',
    title: 'Uber',
    description: 'Seamless ground transportation in 70+ countries with integrated ride-sharing and delivery rewards.',
    icon: '🚗',
    color: 'cyan' as const,
    gradient: 'bg-gradient-to-br from-cyan-500 to-teal-600'
  }
] as const;

export const FEATURES = [
  {
    icon: 'route',
    title: 'Smart Journey Planner',
    description: 'AI-powered itinerary optimization across all travel touchpoints',
    color: 'cyan'
  },
  {
    icon: 'layer-group',
    title: 'All-in-One Booking',
    description: 'Single platform for flights, hotels, activities, and more',
    color: 'violet'
  },
  {
    icon: 'vault',
    title: 'Loyalty Vault',
    description: 'Unified rewards system across all travel partners',
    color: 'green'
  },
  {
    icon: 'bell',
    title: 'Travel Alerts',
    description: 'Real-time notifications for deals, delays, and opportunities',
    color: 'cyan'
  },
  {
    icon: 'brain',
    title: 'AI-powered Suggestions',
    description: 'Personalized recommendations based on your travel history',
    color: 'violet'
  },
  {
    icon: 'wallet',
    title: 'Web3 Wallet Ready',
    description: 'Seamless integration with your crypto wallet',
    color: 'green'
  },
  {
    icon: 'exchange-alt',
    title: 'FX Currency Exchange',
    description: 'Best rates for international currency conversion',
    color: 'cyan'
  },
  {
    icon: 'sim-card',
    title: 'Free Global eSIM',
    description: 'Stay connected worldwide with built-in connectivity',
    color: 'violet'
  },
  {
    icon: 'coins',
    title: 'Earn as you Go',
    description: 'Accumulate rewards and tokens with every trip',
    color: 'green'
  }
] as const;
