
export type Role = 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
}

export interface RundownItem {
  timeRange: string;
  activity: string;
  notes?: string;
}

export interface MaterialStatus {
  id: string;
  title: string;
  type: 'Material' | 'Quiz' | 'Video';
  status: 'Draft' | 'Waiting for Admin Validation' | 'Approved' | 'Revision Required';
  adminNotes?: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  date: string;
}

export interface CollaborationRate {
  service: string;
  price: string;
}

export interface Trainer extends User {
  headline: string;
  specialization: string;
  rating: number;
  totalStudents: number;
  bio: string;
  skills: string[];
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
  phone: string;
  location: string;
  achievements: Achievement[];
  collaborationRates: CollaborationRate[];
  totalEarnings: number;
  socials?: {
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Online' | 'Onsite' | 'Hybrid';
  attendees: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  description: string;
  image: string;
  rundown: RundownItem[];
}

export interface Course {
  id: string;
  title: string;
  students: number;
  modules: number;
  rating: number;
  image: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'alert' | 'info';
}

export interface Feedback {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  targetId: string;
  targetName: string;
  targetType: 'Event' | 'Course';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}
