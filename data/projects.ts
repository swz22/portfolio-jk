import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'crescendo',
    title: 'Crescendo',
    description:
      'Music discovery platform powered by Spotify API for exploring artists, tracks, and creating personalized playlists.',
    longDescription:
      'Crescendo is a full-stack music discovery application that leverages the Spotify Web API to provide users with an intuitive platform for exploring music. Features include artist search, top track discovery, related artist recommendations, and seamless playlist creation. Built with React and Node.js, it showcases OAuth authentication, real-time data fetching, and responsive design principles.',
    highlights: [
      'Spotify OAuth 2.0 authentication for secure user access',
      'Real-time artist and track search with autocomplete',
      'Dynamic playlist creation and management',
      'Related artist discovery algorithm',
      'Responsive design optimized for all devices',
      'RESTful API design with Node.js backend',
    ],
    challenges:
      'Implemented efficient caching strategies to minimize API calls while maintaining real-time data freshness. Solved complex state management for playlist operations and user preferences.',
    images: {
      thumbnail: '/projects/crescendo/thumbnail.jpg',
      screenshots: [
        '/projects/crescendo/screenshot-1.jpg',
        '/projects/crescendo/screenshot-2.jpg',
        '/projects/crescendo/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 90 },
      { name: 'Spotify API', icon: '🎵', color: '#1DB954', proficiency: 85 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
      { name: 'Express.js', icon: '⚡', color: '#000000', proficiency: 88 },
    ],
    metrics: {
      performance: 96,
      users: 500,
      rating: 4.9,
    },
    links: {
      live: 'https://crescendo-music.netlify.app/',
      github: 'https://github.com/swz22/crescendo',
    },
    featured: true,
    category: 'music',
    year: 2024,
  },
  {
    id: 'insight-buddy',
    title: 'Insight Buddy',
    description:
      'AI-powered journaling assistant that provides personalized insights and tracks emotional patterns for mental wellness.',
    longDescription:
      "Insight Buddy is an innovative mental wellness application that combines the power of AI with thoughtful journaling practices. Using OpenAI's GPT technology, it analyzes journal entries to provide personalized insights, identify emotional patterns, and offer supportive guidance. The application features a beautiful, calming interface built with Next.js and includes data visualization for mood tracking over time.",
    highlights: [
      'AI-powered journal entry analysis using OpenAI API',
      'Interactive mood tracking with data visualization',
      'Personalized insights and reflection prompts',
      'Secure user authentication and data privacy',
      'Beautiful, accessible UI with smooth animations',
      'Export functionality for journal entries',
    ],
    challenges:
      'Designed a context-aware AI system that maintains conversation history while respecting user privacy. Implemented sophisticated prompt engineering to ensure supportive and helpful responses.',
    images: {
      thumbnail: '/projects/insight-buddy/thumbnail.jpg',
      screenshots: [
        '/projects/insight-buddy/screenshot-1.jpg',
        '/projects/insight-buddy/screenshot-2.jpg',
        '/projects/insight-buddy/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'Next.js', icon: '⚡', color: '#000000', proficiency: 95 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 90 },
      { name: 'OpenAI API', icon: '🤖', color: '#412991', proficiency: 85 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
      { name: 'Framer Motion', icon: '🎭', color: '#FF0080', proficiency: 85 },
    ],
    metrics: {
      performance: 98,
      users: 300,
      rating: 5.0,
    },
    links: {
      live: 'https://insight-buddy-two.vercel.app/',
      github: 'https://github.com/swz22/insight-buddy',
    },
    featured: true,
    category: 'ai-powered',
    year: 2024,
  },
  {
    id: 'bearbnb',
    title: 'Bearbnb',
    description:
      'Full-featured Airbnb clone with property listings, search functionality, and interactive map integration.',
    longDescription:
      'Bearbnb is a comprehensive vacation rental platform that replicates core Airbnb functionality. It features property search with filters, date-based availability checking, Google Maps integration for location-based browsing, and a responsive design. Built with React and Firebase, it demonstrates proficiency in building complex, real-world applications with modern web technologies.',
    highlights: [
      'Advanced search with multiple filter options',
      'Interactive map view with Google Maps API',
      'Date picker for checking availability',
      'Responsive property cards with image galleries',
      'Firebase integration for data persistence',
      'Clean, intuitive user interface',
    ],
    images: {
      thumbnail: '/projects/bearbnb/thumbnail.jpg',
      screenshots: [
        '/projects/bearbnb/screenshot-1.jpg',
        '/projects/bearbnb/screenshot-2.jpg',
        '/projects/bearbnb/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Firebase', icon: '🔥', color: '#FFCA28', proficiency: 85 },
      { name: 'Google Maps', icon: '🗺️', color: '#4285F4', proficiency: 80 },
      { name: 'Material-UI', icon: '🎨', color: '#0081CB', proficiency: 85 },
    ],
    metrics: {
      performance: 92,
      users: 200,
      rating: 4.7,
    },
    links: {
      live: 'https://bearbnb.vercel.app/',
      github: 'https://github.com/swz22/bearbnb',
    },
    featured: false,
    category: 'clone',
    year: 2023,
  },
  {
    id: 'discord-clone',
    title: 'Discord Clone',
    description:
      'Real-time chat application with channels, direct messaging, and user authentication.',
    longDescription:
      'A feature-rich Discord clone that implements real-time messaging, channel management, and user presence indicators. Built with React and Firebase, it showcases expertise in building real-time applications with complex state management using Redux. Features include server creation, channel organization, direct messaging, and Google authentication.',
    highlights: [
      'Real-time messaging with Firebase Firestore',
      'Server and channel creation/management',
      'Google OAuth authentication',
      'User presence and online status',
      'Redux for complex state management',
      'Responsive design for desktop and mobile',
    ],
    images: {
      thumbnail: '/projects/discord-clone/thumbnail.jpg',
      screenshots: [
        '/projects/discord-clone/screenshot-1.jpg',
        '/projects/discord-clone/screenshot-2.jpg',
        '/projects/discord-clone/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Firebase', icon: '🔥', color: '#FFCA28', proficiency: 88 },
      { name: 'Redux', icon: '🔄', color: '#764ABC', proficiency: 85 },
      { name: 'Material-UI', icon: '🎨', color: '#0081CB', proficiency: 85 },
    ],
    metrics: {
      performance: 94,
      users: 150,
      rating: 4.8,
    },
    links: {
      live: 'https://chatdsc-520c3.web.app/',
      github: 'https://github.com/swz22/discord_clone',
    },
    featured: false,
    category: 'real-time',
    year: 2023,
  },
  {
    id: 'chat-buddy',
    title: 'Chat Buddy AI',
    description:
      'AI-powered chatbot interface with customizable personas and conversation history.',
    longDescription:
      'Chat Buddy is an intelligent conversational AI application that provides users with a friendly and helpful chat interface. Built with Next.js and the OpenAI API, it features conversation persistence, typing indicators, and a clean, modern UI. The application demonstrates proficiency in working with AI APIs and creating engaging user experiences.',
    highlights: [
      'Integration with OpenAI GPT models',
      'Conversation history and context retention',
      'Smooth typing indicators and animations',
      'Responsive design with mobile optimization',
      'Clean, minimalist user interface',
      'Fast response times with optimized API calls',
    ],
    images: {
      thumbnail: '/projects/chat-buddy/thumbnail.jpg',
      screenshots: [
        '/projects/chat-buddy/screenshot-1.jpg',
        '/projects/chat-buddy/screenshot-2.jpg',
        '/projects/chat-buddy/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'Next.js', icon: '⚡', color: '#000000', proficiency: 95 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 90 },
      { name: 'OpenAI API', icon: '🤖', color: '#412991', proficiency: 85 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
    ],
    metrics: {
      performance: 95,
      users: 250,
      rating: 4.6,
    },
    links: {
      live: 'https://chatbuddy-sand.vercel.app/',
      github: 'https://github.com/swz22/chat-buddy-ai',
    },
    featured: false,
    category: 'ai-powered',
    year: 2024,
  },
];
