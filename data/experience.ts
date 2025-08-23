import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'samsung-electronics',
    company: 'Samsung Electronics America',
    logo: '/companies/samsung-logo.png',
    role: 'Project Manager',
    type: 'full-time',
    duration: {
      start: new Date('2024-08-01'),
      end: 'present',
    },
    location: 'Plano, TX',
    description: [
      "Spearheaded cross-functional initiatives to enhance Samsung's device repair ecosystem, acting as the primary liaison between stakeholders, service partners, and development teams",
      'Managed high-impact projects including platform enhancements, process automation, and service optimizations to improve system performance and user experience',
      'Drove system improvements for critical software systems integral to device repair operations (GCIC / GSPN), minimizing downtime and enhancing platform stability',
      'Led the implementation of a KPI tracking dashboard, providing real-time visibility into service center performance and enabling data-driven decision-making',
    ],
    achievements: [
      {
        icon: '📊',
        title: 'KPI Dashboard Implementation',
        description:
          'Developed and deployed real-time tracking system for service center performance metrics',
        impact: 'Enabled data-driven decisions across 200+ service centers',
      },
      {
        icon: '🔧',
        title: 'System Optimization',
        description:
          'Enhanced critical repair software systems to improve stability and reduce downtime',
        impact: 'Reduced system errors by 40% and improved uptime to 99.5%',
      },
      {
        icon: '🤝',
        title: 'Cross-functional Leadership',
        description:
          'Coordinated between development teams, stakeholders, and service partners',
        impact:
          'Streamlined communication and reduced project delivery time by 25%',
      },
    ],
    technologies: [
      { name: 'SAP', icon: '💼', color: '#0FAAFF', proficiency: 85 },
      { name: 'JavaScript', icon: '🟨', color: '#F7DF1E', proficiency: 90 },
      { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 85 },
      { name: 'SQL', icon: '🗄️', color: '#336791', proficiency: 88 },
      { name: 'Agile', icon: '🔄', color: '#41B883', proficiency: 92 },
    ],
    projects: [],
  },
  {
    id: 'fresh-k-market',
    company: 'Fresh K Market',
    logo: '/companies/fresh-k-market-logo.png',
    role: 'IT Manager',
    type: 'full-time',
    duration: {
      start: new Date('2022-11-01'),
      end: new Date('2023-12-31'),
    },
    location: 'Carrollton, TX',
    description: [
      'Oversaw all IT operations including network administration, POS management, and systems security',
      'Designed, developed, and maintained company website with SEO optimization',
      'Streamlined workflows by analyzing operational bottlenecks and standardizing processes',
      'Conducted training sessions for office staff to improve technical proficiency',
    ],
    achievements: [
      {
        icon: '⚡',
        title: 'POS Efficiency Optimization',
        description:
          'Streamlined checkout workflows and automated routine processes',
        impact: 'Saved 20+ labor hours weekly across all locations',
      },
      {
        icon: '📈',
        title: 'Website Traffic Growth',
        description:
          'Implemented targeted SEO strategies and content optimization',
        impact: 'Achieved 25% increase in organic website traffic',
      },
      {
        icon: '🛡️',
        title: 'System Stability',
        description:
          'Enhanced system reliability through proactive maintenance',
        impact: 'Reduced system downtime by 80%',
      },
    ],
    technologies: [
      { name: 'JavaScript', icon: '🟨', color: '#F7DF1E', proficiency: 88 },
      { name: 'HTML/CSS', icon: '🎨', color: '#E34C26', proficiency: 90 },
      { name: 'MySQL', icon: '🐬', color: '#4479A1', proficiency: 85 },
      { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 82 },
    ],
    projects: [],
  },
  {
    id: 'bitwise-industries',
    company: 'Bitwise Industries',
    logo: '/companies/bitwise-logo.png',
    role: 'Full Stack Developer',
    type: 'full-time',
    duration: {
      start: new Date('2020-02-01'),
      end: new Date('2022-11-01'),
    },
    location: 'Remote',
    description: [
      'Developed and deployed enterprise-level web applications with focus on scalability and performance',
      'Partnered with designers, back-end engineers, and product owners to deliver client-facing solutions',
      'Optimized database queries and implemented strategic caching for improved performance',
      'Mentored junior developers and contributed to agile development cycles',
    ],
    achievements: [
      {
        icon: '🚀',
        title: 'Performance Optimization',
        description:
          'Refactored code and optimized database queries across multiple applications',
        impact: 'Boosted application speed by 20-40%',
      },
      {
        icon: '💼',
        title: 'Client Success',
        description:
          'Delivered high-impact projects that improved user satisfaction',
        impact: 'Earned repeat business from key enterprise accounts',
      },
      {
        icon: '👥',
        title: 'Team Leadership',
        description: 'Mentored junior developers and improved team processes',
        impact: 'Increased sprint velocity by 30%',
      },
    ],
    technologies: [
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 92 },
      { name: 'Angular', icon: '🅰️', color: '#DD0031', proficiency: 88 },
      { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 90 },
      { name: 'PostgreSQL', icon: '🐘', color: '#4169E1', proficiency: 85 },
      { name: 'GraphQL', icon: '◈', color: '#E10098', proficiency: 82 },
      { name: 'Docker', icon: '🐳', color: '#2496ED', proficiency: 80 },
    ],
    projects: [],
  },
];
