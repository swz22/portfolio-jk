import type { NavItem, SocialLink } from '@/types';

export const SITE_CONFIG = {
  name: 'John Kim',
  title: 'Full Stack Developer',
  description:
    'Full Stack Developer specializing in modern web technologies, 3D graphics, and creating exceptional digital experiences.',
  url: 'https://johnkim.dev',
  email: 'jkdev220@gmail.com',
  location: 'Dallas, Texas',
  availability: 'Available for freelance',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/swz22',
    icon: 'github',
    color: '#181717',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jkim022/',
    icon: 'linkedin',
    color: '#0A66C2',
  },
  {
    platform: 'Twitter',
    url: 'https://x.com/jkdev220',
    icon: 'twitter',
    color: '#1DA1F2',
  },
  {
    platform: 'Email',
    url: 'mailto:jkdev220@gmail.com',
    icon: 'email',
    color: '#EA4335',
  },
];

export const ANIMATIONS = {
  fast: { duration: 0.2, ease: 'easeOut' },
  normal: { duration: 0.3, ease: 'easeInOut' },
  slow: { duration: 0.5, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 100, damping: 10 },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const PERFORMANCE = {
  maxBundleSize: 500 * 1024, // 500KB
  maxImageSize: 200 * 1024, // 200KB
  maxModelSize: 2 * 1024 * 1024, // 2MB
  targetFPS: 60,
  reducedMotionFPS: 30,
} as const;

export const SCENE_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5],
  },
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  },
  lights: {
    ambient: {
      intensity: 0.5,
      color: '#ffffff',
    },
    directional: {
      intensity: 1,
      color: '#ffffff',
      position: [10, 10, 5],
    },
  },
} as const;

export const TERMINAL_COMMANDS = {
  help: 'Show available commands',
  about: 'Learn more about me',
  skills: 'View my technical skills',
  projects: 'Browse my projects',
  contact: 'Get in touch',
  clear: 'Clear terminal',
  theme: 'Theme commands (list, set, current)',
  'effects on/off': 'Toggle visual effects',
  resume: 'Download resume',
  socials: 'View social links',
  easter: 'Try to find easter eggs',
} as const;

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'open-source', label: 'Open Source' },
  { value: 'client-work', label: 'Client Work' },
  { value: '3d-graphics', label: '3D Graphics' },
  { value: 'machine-learning', label: 'Machine Learning' },
] as const;

export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
] as const;
