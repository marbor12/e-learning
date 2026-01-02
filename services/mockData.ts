
import { Trainer, Event, Course, Notification, Feedback, MaterialStatus } from '../types';

export const CURRENT_TRAINER: Trainer = {
  id: 't1',
  name: 'Sarah Jenkins',
  email: 'sarah.j@idspora.com',
  role: 'trainer',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  headline: 'Senior Product Design Specialist',
  specialization: 'UI/UX Design',
  status: 'active',
  rating: 4.8,
  totalStudents: 1250,
  joinedDate: '2023-01-15',
  bio: 'Transforming complex problems into elegant user-centric solutions. With over 10 years in the industry, I have helped brands like Google, Airbnb, and Spotify scale their design systems.',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  skills: ['Figma', 'System Design', 'Visual Branding', 'User Research'],
  achievements: [
    { id: 'a1', title: 'Top Rated Mentor 2023', icon: 'Award', date: 'Dec 2023' }
  ],
  socials: {
    linkedin: 'linkedin.com/in/sarahjenkins',
    website: 'sarahjenkins.design',
    twitter: '@sarahj_design'
  },
  totalEarnings: 12450.00,
  collaborationRates: [
    { service: '1-on-1 Mentorship', price: '$150/hr' },
    { service: 'Corporate Workshop', price: '$2,500/day' },
    { service: 'Curriculum Audit', price: '$800/course' }
  ]
};

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Advanced Figma Constraints',
    date: '2024-03-25',
    time: '09:00 AM - 12:00 PM',
    location: 'Zoom Meeting',
    type: 'Online',
    attendees: 45,
    status: 'Upcoming',
    description: 'Deep dive into responsive design systems using Figma variables and advanced constraints.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    rundown: [
      { timeRange: '09:00 - 09:10', activity: 'Opening & Introduction' },
      { timeRange: '09:10 - 10:30', activity: 'Main Session: Constraints Logic', notes: 'Trainer Sarah Jenkins' },
      { timeRange: '10:30 - 10:45', activity: 'Coffee Break' },
      { timeRange: '10:45 - 11:30', activity: 'Practical Workshop' },
      { timeRange: '11:30 - 12:00', activity: 'Q&A and Closing' }
    ]
  }
];

export const INVITATIONS: Event[] = [
  {
    id: 'e2',
    title: 'Interaction Design for Mobile',
    date: '2024-04-12',
    time: '02:00 PM - 04:00 PM',
    location: 'Hybrid / Google Meet',
    type: 'Hybrid',
    attendees: 0,
    status: 'Upcoming',
    description: 'Lead a comprehensive masterclass on mobile interaction patterns, focusing on haptic feedback, accessibility, and micro-interactions for modern iOS and Android apps.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    rundown: [
      { timeRange: '02:00 - 02:15', activity: 'Introduction to Mobile Gestures' },
      { timeRange: '02:15 - 03:00', activity: 'Platform Specific Patterns (iOS vs Android)' },
      { timeRange: '03:00 - 03:45', activity: 'Accessibility in Motion' },
      { timeRange: '03:45 - 04:00', activity: 'Review & Assignment' }
    ]
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Visual Branding Architecture',
    students: 850,
    modules: 8,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    description: 'A professional curriculum for building scalable brand identities for digital products.',
    level: 'Intermediate'
  }
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Material Approved', message: 'Your Figma slides for "Advanced Constraints" have been approved by Admin.', time: '1h ago', read: false, type: 'success' },
  { id: 'n2', title: 'Admin Note', message: 'Please update Module 4 quiz on Visual Branding.', time: '3h ago', read: false, type: 'warning' }
];

export const MATERIAL_STATUSES: MaterialStatus[] = [
  { id: 'm1', title: 'Figma Auto-Layout Slides', type: 'Material', status: 'Approved', timestamp: '2024-03-10' },
  { id: 'm2', title: 'Constraints Practical Guide', type: 'Material', status: 'Waiting for Admin Validation', timestamp: '2024-03-12' },
  { id: 'm3', title: 'Module 4 Certification Quiz', type: 'Quiz', status: 'Revision Required', adminNotes: 'Check question 4 options.', timestamp: '2024-03-14' },
  { id: 'm4', title: 'Introduction to Design Systems', type: 'Video', status: 'Waiting for Admin Validation', timestamp: '2024-03-20' }
];

export const FEEDBACKS: Feedback[] = [
  {
    id: 'f1',
    studentName: 'Alex Johnson',
    studentAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
    rating: 5,
    comment: 'Sarah is an incredible teacher. The Figma session was very detailed.',
    date: '2024-03-20',
    targetId: 'e1',
    targetName: 'Advanced Figma Constraints',
    targetType: 'Event'
  }
];

export const TRAINERS_LIST: Trainer[] = [
  CURRENT_TRAINER,
  {
    id: 't2',
    name: 'Michael Chen',
    email: 'm.chen@idspora.com',
    role: 'trainer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    headline: 'Fullstack Engineer & Data Scientist',
    specialization: 'Data Science',
    status: 'pending',
    rating: 0,
    totalStudents: 0,
    joinedDate: '2024-01-10',
    bio: 'Bridging the gap between engineering and data science through education.',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, USA',
    skills: ['Python', 'React', 'TensorFlow', 'SQL'],
    achievements: [],
    totalEarnings: 0,
    collaborationRates: [
        { service: 'Data Strategy Consulting', price: '$200/hr' }
    ]
  }
];

// Mock data for AdminSubmissionDetail.tsx
export const COURSE_SUBMISSIONS = [
  {
    id: 's1',
    type: 'Course Material',
    courseTitle: 'Visual Branding Architecture',
    trainerName: 'Sarah Jenkins',
    date: '2024-03-20',
    message: 'This is the updated material for Module 4. I have added new slides and a comprehensive quiz.',
    attachments: ['Visual_Branding_Architecture_M4.pdf', 'Branding_Assets.zip'],
    quizData: [
      {
        question: 'What are the three pillars of visual identity?',
        options: ['Color, Typography, Logo', 'Price, Product, Promotion', 'Size, Shape, Space', 'Red, Green, Blue'],
        correctAnswer: 0
      }
    ]
  }
];
