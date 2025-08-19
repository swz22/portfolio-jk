export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: {
    thumbnail: string;
    gallery: string[];
    preview?: string;
  };
  model3D?: string;
  techStack: TechItem[];
  metrics: {
    users?: number;
    performance?: number;
    rating?: number;
  };
  links: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  featured: boolean;
  category: ProjectCategory;
  year: number;
}

export type ProjectCategory =
  | 'web-app'
  | 'mobile-app'
  | 'open-source'
  | 'client-work'
  | '3d-graphics'
  | 'machine-learning';

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  proficiency: number;
}

export interface SkillCategory {
  name: string;
  skills: TechItem[];
}

export interface Experience {
  id: string;
  company: string;
  logo: string;
  model3D?: string;
  role: string;
  type: 'full-time' | 'contract' | 'internship';
  duration: {
    start: Date;
    end: Date | 'present';
  };
  location: string;
  description: string[];
  achievements: Achievement[];
  technologies: TechItem[];
  projects: string[];
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  impact?: string;
}

export interface Asset3D {
  id: string;
  type: 'model' | 'texture' | 'hdri';
  path: string;
  preload: boolean;
  quality: {
    high: string;
    medium: string;
    low: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export type Theme = 'dark' | 'light' | 'system';

export interface Command {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  action: () => void;
  category?: string;
}
