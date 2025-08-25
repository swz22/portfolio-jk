import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'samsung-data-analyst',
    company: 'Samsung Electronics America',
    logo: '/companies/samsung-logo.png',
    role: 'Data Analyst II (Big Data Team)',
    type: 'full-time',
    duration: {
      start: new Date('2024-09-01'),
      end: 'present',
    },
    location: 'Plano, TX',
    description: [
      'Modernized reporting infrastructure by converting legacy Excel Power Query trackers into a department-wide Power BI dashboard used by 100+ employees, cutting manual reporting effort by 40%',
      'Built automated data pipelines and standardized reporting frameworks, reducing discrepancies by 30% and improving cross-team accuracy',
      'Extracted and analyzed large-scale datasets from GCIC & NERP via SAP to support critical operational and financial decision-making',
      'Leveraged SQL, Tableau, and Superset to convert complex datasets into actionable insights, collaborating with leadership to guide strategic planning',
    ],
    achievements: [
      {
        icon: '📊',
        title: 'Power BI Dashboard Implementation',
        description:
          'Developed department-wide dashboard replacing legacy Excel systems',
        impact: '40% reduction in manual reporting effort for 100+ employees',
      },
      {
        icon: '🔧',
        title: 'Reporting Framework Standardization',
        description:
          'Built automated frameworks improving data consistency across teams',
        impact: '30% reduction in reporting discrepancies',
      },
      {
        icon: '📈',
        title: 'Data-Driven Decision Support',
        description:
          'Delivered actionable insights for operational and financial planning',
        impact: 'Guided resource allocation and strategic initiatives',
      },
    ],
    technologies: [
      { name: 'SQL', icon: '🗄️', color: '#336791', proficiency: 90 },
      { name: 'Power BI', icon: '📊', color: '#F2C811', proficiency: 85 },
      { name: 'SAP', icon: '💼', color: '#0FAAFF', proficiency: 85 },
      { name: 'Tableau', icon: '📈', color: '#E97627', proficiency: 80 },
      { name: 'GCIC', icon: '🔧', color: '#4B5563', proficiency: 88 },
      { name: 'GSPN', icon: '🌐', color: '#6366F1', proficiency: 85 },
      { name: 'Superset', icon: '📊', color: '#20A6C9', proficiency: 78 },
    ],
    projects: [],
  },
  {
    id: 'samsung-project-manager',
    company: 'Samsung Electronics America',
    logo: '/companies/samsung-logo.png',
    role: 'Project Manager',
    type: 'full-time',
    duration: {
      start: new Date('2024-01-01'),
      end: new Date('2024-09-01'),
    },
    location: 'Plano, TX',
    description: [
      "Directed cross-functional initiatives with engineering, service, and partner teams to improve Samsung's device repair ecosystem, reducing downtime by 20%",
      'Oversaw improvements to software systems integral to device repair operations (GCIC/GSPN), minimizing critical errors and enhancing customer service metrics',
      'Defined success metrics and launched a KPI dashboard tracking turnaround time, defect rates, and customer satisfaction, adopted by 50+ service centers',
      'Developed scalable digital repair solutions for Samsung.com, increasing self-service adoption by 15%',
    ],
    achievements: [
      {
        icon: '⚡',
        title: 'Service Efficiency Optimization',
        description:
          'Led initiatives reducing device repair ecosystem downtime',
        impact: '20% reduction in downtime, improved service center efficiency',
      },
      {
        icon: '📊',
        title: 'KPI Dashboard Launch',
        description: 'Implemented comprehensive metrics tracking system',
        impact: 'Adopted by 50+ service centers nationwide',
      },
      {
        icon: '🚀',
        title: 'Digital Solutions Development',
        description:
          'Created scalable self-service repair solutions for Samsung.com',
        impact: '15% increase in self-service adoption',
      },
    ],
    technologies: [
      { name: 'SAP', icon: '💼', color: '#0FAAFF', proficiency: 90 },
      { name: 'GCIC', icon: '🔧', color: '#4B5563', proficiency: 88 },
      { name: 'GSPN', icon: '🌐', color: '#6366F1', proficiency: 85 },
      { name: 'JIRA', icon: '📋', color: '#0052CC', proficiency: 85 },
      { name: 'Agile', icon: '🔄', color: '#41B883', proficiency: 92 },
      { name: 'Scrum', icon: '🏃', color: '#509EE3', proficiency: 90 },
    ],
    projects: [],
  },
  {
    id: 'fresh-k-market',
    company: 'Fresh K Market',
    logo: '/companies/fresh-k-market-logo.png',
    role: 'IT Director',
    type: 'full-time',
    duration: {
      start: new Date('2022-12-01'),
      end: new Date('2023-12-30'),
    },
    location: 'Carrollton, TX',
    description: [
      'Oversaw all IT operations including network infrastructure, POS systems, and cybersecurity, ensuring seamless business continuity',
      'Designed and optimized company website, driving a 25% traffic increase through SEO improvements',
      'Modernized POS workflows, cutting transaction errors by 30% and saving 20+ weekly labor hours via automation and staff training',
      'Reduced system downtime by 40% with proactive maintenance, hardware upgrades, and improved server reliability',
    ],
    achievements: [
      {
        icon: '⚡',
        title: 'POS Efficiency Optimization',
        description:
          'Streamlined checkout workflows and automated routine processes',
        impact: '30% reduction in errors, 20+ hours saved weekly',
      },
      {
        icon: '📈',
        title: 'Website Traffic Growth',
        description:
          'Implemented targeted SEO strategies and content optimization',
        impact: '25% increase in organic website traffic',
      },
      {
        icon: '🛡️',
        title: 'System Reliability',
        description: 'Enhanced infrastructure through proactive maintenance',
        impact: '40% reduction in system downtime',
      },
    ],
    technologies: [],
    projects: [],
  },
  {
    id: 'bitwise-industries',
    company: 'Bitwise Industries',
    logo: '/companies/bitwise-logo.png',
    role: 'Full Stack Developer',
    type: 'full-time',
    duration: {
      start: new Date('2020-02-15'),
      end: new Date('2022-11-30'),
    },
    location: 'Remote',
    description: [
      'Developed and deployed enterprise-level web applications with focus on scalability, performance, and usability',
      'Boosted application speed by 20-40% through code refactoring, optimized database queries, and strategic caching implementations',
      'Delivered high-impact client projects that increased user satisfaction and retention, driving repeat business',
      'Integrated modern technologies into enterprise solutions and mentored junior developers',
    ],
    achievements: [
      {
        icon: '🚀',
        title: 'Performance Optimization',
        description:
          'Refactored code and optimized database queries across multiple applications',
        impact: 'Achieved 20-40% speed improvements',
      },
      {
        icon: '💼',
        title: 'Client Success',
        description:
          'Delivered high-impact projects improving user satisfaction',
        impact: 'Drove repeat business from key enterprise accounts',
      },
      {
        icon: '👥',
        title: 'Team Leadership',
        description: 'Mentored junior developers and improved team processes',
        impact: 'Increased sprint velocity by 30%',
      },
    ],
    technologies: [
      { name: 'JavaScript', icon: '🟨', color: '#F7DF1E', proficiency: 95 },
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 92 },
      { name: 'Angular', icon: '🅰️', color: '#DD0031', proficiency: 88 },
      { name: 'Redux', icon: '🔄', color: '#764ABC', proficiency: 85 },
      { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 90 },
      { name: 'PostgreSQL', icon: '🐘', color: '#4169E1', proficiency: 85 },
      { name: 'MongoDB', icon: '🍃', color: '#47A248', proficiency: 85 },
      { name: 'GraphQL', icon: '◈', color: '#E10098', proficiency: 82 },
      { name: 'Docker', icon: '🐳', color: '#2496ED', proficiency: 80 },
      { name: 'Git', icon: '📦', color: '#F05032', proficiency: 92 },
    ],
    projects: [],
  },
];
