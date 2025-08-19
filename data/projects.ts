import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'portfolio-3d',
    title: '3D Portfolio Website',
    description:
      'Interactive portfolio featuring Three.js animations, particle effects, and immersive user experience.',
    longDescription:
      'A cutting-edge portfolio website built with Next.js 14 and Three.js, featuring interactive 3D graphics, particle systems, and smooth animations. The site showcases modern web development techniques with a focus on performance and user experience.',
    images: {
      thumbnail: '/projects/portfolio-3d-thumb.jpg',
      gallery: [
        '/projects/portfolio-3d-1.jpg',
        '/projects/portfolio-3d-2.jpg',
        '/projects/portfolio-3d-3.jpg',
      ],
    },
    techStack: [
      { name: 'Next.js', icon: '⚡', color: '#000000', proficiency: 95 },
      { name: 'Three.js', icon: '🎮', color: '#049EF4', proficiency: 90 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 95 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
    ],
    metrics: {
      performance: 98,
      users: 1000,
      rating: 5,
    },
    links: {
      live: 'https://portfolio-3d.vercel.app',
      github: 'https://github.com/johnkim/portfolio-3d',
    },
    featured: true,
    category: '3d-graphics',
    year: 2024,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    longDescription:
      'A comprehensive e-commerce platform built from scratch, featuring user authentication, product management, shopping cart functionality, secure payment processing with Stripe, and a powerful admin dashboard for inventory and order management.',
    images: {
      thumbnail: '/projects/ecommerce-thumb.jpg',
      gallery: [
        '/projects/ecommerce-1.jpg',
        '/projects/ecommerce-2.jpg',
        '/projects/ecommerce-3.jpg',
      ],
    },
    techStack: [
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 90 },
      { name: 'PostgreSQL', icon: '🐘', color: '#4169E1', proficiency: 85 },
      { name: 'Redis', icon: '📮', color: '#DC382D', proficiency: 80 },
    ],
    metrics: {
      performance: 95,
      users: 5000,
      rating: 4.8,
    },
    links: {
      live: 'https://shop.example.com',
      case_study: '/case-studies/ecommerce-platform',
    },
    featured: true,
    category: 'web-app',
    year: 2024,
  },
  {
    id: 'data-viz-dashboard',
    title: 'Data Visualization Dashboard',
    description:
      'Interactive dashboard with D3.js and WebGL for real-time data analysis and visualization.',
    longDescription:
      'A powerful data visualization dashboard that combines D3.js and WebGL to create stunning, interactive visualizations. Features real-time data updates, customizable charts, and export functionality.',
    images: {
      thumbnail: '/projects/dataviz-thumb.jpg',
      gallery: [
        '/projects/dataviz-1.jpg',
        '/projects/dataviz-2.jpg',
        '/projects/dataviz-3.jpg',
      ],
    },
    techStack: [
      { name: 'D3.js', icon: '📊', color: '#F68E56', proficiency: 90 },
      { name: 'WebGL', icon: '🎯', color: '#990000', proficiency: 85 },
      { name: 'Vue.js', icon: '💚', color: '#4FC08D', proficiency: 90 },
      { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 85 },
    ],
    metrics: {
      performance: 92,
      users: 2000,
      rating: 4.9,
    },
    links: {
      live: 'https://dashboard.example.com',
      github: 'https://github.com/johnkim/data-viz',
    },
    featured: false,
    category: 'web-app',
    year: 2023,
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracking App',
    description:
      'Cross-platform mobile app for fitness tracking with AI-powered workout recommendations.',
    longDescription:
      'A React Native fitness application that helps users track their workouts, monitor progress, and receive AI-powered recommendations. Features include exercise library, progress charts, and social sharing.',
    images: {
      thumbnail: '/projects/fitness-thumb.jpg',
      gallery: [
        '/projects/fitness-1.jpg',
        '/projects/fitness-2.jpg',
        '/projects/fitness-3.jpg',
      ],
    },
    techStack: [
      { name: 'React Native', icon: '📱', color: '#61DAFB', proficiency: 90 },
      { name: 'Firebase', icon: '🔥', color: '#FFCA28', proficiency: 85 },
      { name: 'TensorFlow', icon: '🤖', color: '#FF6F00', proficiency: 75 },
      { name: 'GraphQL', icon: '◈', color: '#E10098', proficiency: 85 },
    ],
    metrics: {
      performance: 94,
      users: 10000,
      rating: 4.7,
    },
    links: {
      live: 'https://apps.apple.com/app/fitness-tracker',
    },
    featured: false,
    category: 'mobile-app',
    year: 2023,
  },
  {
    id: 'open-source-cli',
    title: 'DevTools CLI',
    description:
      'Open-source command-line tool for streamlining development workflows and automation.',
    longDescription:
      'A powerful CLI tool written in Go that helps developers automate repetitive tasks, manage projects, and improve productivity. Features include project scaffolding, git workflow automation, and cloud deployment.',
    images: {
      thumbnail: '/projects/cli-thumb.jpg',
      gallery: ['/projects/cli-1.jpg', '/projects/cli-2.jpg'],
    },
    techStack: [
      { name: 'Go', icon: '🐹', color: '#00ADD8', proficiency: 85 },
      { name: 'Cobra', icon: '🐍', color: '#333333', proficiency: 90 },
      { name: 'Docker', icon: '🐳', color: '#2496ED', proficiency: 85 },
    ],
    metrics: {
      performance: 99,
      users: 500,
      rating: 4.9,
    },
    links: {
      github: 'https://github.com/johnkim/devtools-cli',
    },
    featured: false,
    category: 'open-source',
    year: 2023,
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Support Bot',
    description:
      'Intelligent chatbot using NLP for automated customer support with 95% resolution rate.',
    longDescription:
      'An advanced AI-powered chatbot that handles customer inquiries using natural language processing. Integrates with multiple platforms and features sentiment analysis, multi-language support, and learning capabilities.',
    images: {
      thumbnail: '/projects/chatbot-thumb.jpg',
      gallery: [
        '/projects/chatbot-1.jpg',
        '/projects/chatbot-2.jpg',
        '/projects/chatbot-3.jpg',
      ],
    },
    techStack: [
      { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 90 },
      { name: 'FastAPI', icon: '⚡', color: '#009688', proficiency: 85 },
      { name: 'OpenAI', icon: '🤖', color: '#412991', proficiency: 80 },
      { name: 'Redis', icon: '📮', color: '#DC382D', proficiency: 85 },
    ],
    metrics: {
      performance: 96,
      users: 50000,
      rating: 4.6,
    },
    links: {
      live: 'https://chatbot.example.com',
    },
    featured: false,
    category: 'machine-learning',
    year: 2024,
  },
];
