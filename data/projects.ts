import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'crescendo',
    title: 'Crescendo',
    description:
      'A premium music streaming experience showcasing modern web development with Spotify integration and advanced queue management.',
    longDescription:
      'Crescendo is a premium music streaming application that delivers a polished, feature-rich experience without requiring Spotify login. It showcases modern web development best practices with global music discovery across 15+ countries, 16 genre categories, and sophisticated queue management. Built with React 18 and Express.js, it features drag-and-drop playlist management, smart preview caching, persistent state, and a stunning dark theme with glassmorphism effects. The application demonstrates production-ready code with 20+ custom React hooks, performance monitoring, and enterprise patterns like circuit breakers and request deduplication.',
    highlights: [
      'Global music discovery - Browse top charts from 15+ countries',
      '16 genre categories - From Pop to Lo-Fi with custom icons',
      'Advanced search - Find songs, artists, and albums instantly',
      'Smart preview caching - Faster load times with intelligent prefetching',
      '30-second Spotify previews - No login required',
      'Drag & drop reordering - Works on desktop and mobile',
      'Multiple contexts - Switch between Queue, Albums, and Playlists',
      'Smart navigation - Seamless track transitions with preview loading',
      'Persistent queue - Your music continues where you left off',
      'Create custom playlists - Build your personal collection',
      'Community playlists - Discover Spotify-curated collections',
      'Inline editing - Rename and manage playlists effortlessly',
      'Dynamic artwork - Auto-generated 4-image mosaics',
      '100% responsive design - Optimized for mobile, tablet, and desktop',
      'Three layout modes - Adaptive UI for every screen size',
      'Smooth animations - Polished transitions and micro-interactions',
      'Dark theme - Modern gradient design with glassmorphism effects',
      'Performance monitor - Real-time metrics (FPS, memory, cache stats)',
      'Keyboard shortcuts - Space (play/pause), arrows (skip), M (mute)',
      '20+ custom React hooks - Reusable, production-ready code',
      'Circuit breaker pattern - Automatic failure recovery',
    ],
    challenges:
      'Engineered a sophisticated preview URL system using spotify-preview-finder to work around Spotify API limitations. Implemented advanced performance optimizations including request deduplication, smart caching strategies, and preview preloading. Built a complex state management system with Redux Toolkit that handles queue persistence, optimistic updates, and seamless context switching between different playback sources.',
    images: {
      thumbnail: '/projects/crescendo/thumbnail.jpg',
      screenshots: [
        '/projects/crescendo/screenshot-1.jpg',
        '/projects/crescendo/screenshot-2.jpg',
        '/projects/crescendo/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'React 18', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Redux Toolkit', icon: '🔄', color: '#764ABC', proficiency: 90 },
      { name: 'Express.js', icon: '⚡', color: '#000000', proficiency: 88 },
      { name: 'Spotify API', icon: '🎵', color: '#1DB954', proficiency: 85 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
      { name: 'Vite', icon: '⚡', color: '#646CFF', proficiency: 85 },
      { name: 'React Router', icon: '🔀', color: '#CA4245', proficiency: 88 },
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
    category: 'production',
    year: 2024,
  },
  {
    id: 'insight-buddy',
    title: 'Insight Buddy',
    description:
      'AI-powered meeting intelligence platform that transforms meetings into actionable insights with transcription, summaries, and real-time collaboration.',
    longDescription:
      'Insight Buddy is a comprehensive meeting intelligence platform that leverages AI to transform how teams capture, analyze, and act on meeting content. Using AssemblyAI for automatic transcription and OpenAI for intelligent summaries, it provides real-time collaboration features, speaker analytics, and automated action item extraction. Built with Next.js 15 and Supabase, it offers enterprise-grade security with password-protected sharing and multiple export formats.',
    highlights: [
      'Automatic Transcription - Speech-to-text with speaker detection via AssemblyAI',
      'Smart Summaries - AI-generated meeting overviews with key decisions',
      'Action Item Extraction - Intelligent task detection with priorities and assignees',
      'Meeting Analytics - Speaker metrics, sentiment analysis, and engagement scores',
      "Live Presence - See who's viewing in real-time",
      'Shared Annotations - Collaborative highlights and comments',
      'Secure Sharing - Password-protected links with expiration',
      'Export Options - PDF, DOCX, or TXT with email delivery',
      'Multi-format Support - Audio/video upload with drag-and-drop',
      'Audio Visualization - Interactive waveform player',
      'Advanced Search - Filter by title, participants, date, content',
      'Authentication - Email, Google OAuth, Anonymous sign-in',
    ],
    challenges:
      'Implemented real-time collaboration features with Supabase Realtime, ensuring low-latency updates across multiple users. Optimized audio processing pipeline to handle large files efficiently while maintaining responsive UI through streaming and chunked processing.',
    images: {
      thumbnail: '/projects/insight-buddy/thumbnail.jpg',
      screenshots: [
        '/projects/insight-buddy/screenshot-1.jpg',
        '/projects/insight-buddy/screenshot-2.jpg',
        '/projects/insight-buddy/screenshot-3.jpg',
      ],
    },
    techStack: [
      { name: 'Next.js 15', icon: '⚡', color: '#000000', proficiency: 95 },
      { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 90 },
      { name: 'Supabase', icon: '⚡', color: '#3ECF8E', proficiency: 88 },
      { name: 'AssemblyAI', icon: '🎙️', color: '#5E5ADB', proficiency: 85 },
      { name: 'OpenAI', icon: '🤖', color: '#412991', proficiency: 85 },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', proficiency: 90 },
      { name: 'TanStack Query', icon: '⚛️', color: '#FF4154', proficiency: 85 },
      { name: 'WaveSurfer.js', icon: '🎵', color: '#FF6B6B', proficiency: 82 },
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
    category: 'production',
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
    category: 'prototype',
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
    category: 'prototype',
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
    category: 'prototype',
    year: 2024,
  },
];
