export const CURRENT_TRAINER = {
  id: 't1',
  name: 'Sarah Jenkins',
  email: 'sarah.j@edutrain.com',
  role: 'trainer',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  specialization: 'UI/UX Design',
  status: 'active',
  rating: 4.8,
  totalStudents: 1250,
  joinedDate: '2023-01-15',
  bio: 'Senior Product Designer with 10 years of experience in building digital products.',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA'
};

export const EVENTS = [
  {
    id: 'e1',
    title: 'Introduction to Figma',
    date: '2023-10-25',
    time: '10:00 AM - 12:00 PM',
    location: 'Zoom Meeting',
    type: 'Online',
    attendees: 45,
    status: 'Upcoming',
    description: 'Learn the basics of Figma, from constraints to auto-layout.',
    image: 'https://picsum.photos/id/1/800/400'
  },
  {
    id: 'e2',
    title: 'Advanced Prototyping Workshop',
    date: '2023-11-02',
    time: '02:00 PM - 05:00 PM',
    location: 'Tech Hub Hall A',
    type: 'Offline',
    attendees: 20,
    status: 'Upcoming',
    description: 'Deep dive into variables, conditionals, and advanced prototyping logic.',
    image: 'https://picsum.photos/id/2/800/400'
  },
  {
    id: 'e3',
    title: 'Design Systems 101',
    date: '2023-10-10',
    time: '01:00 PM - 03:00 PM',
    location: 'Google Meet',
    type: 'Online',
    attendees: 120,
    status: 'Completed',
    description: 'How to build and maintain a scalable design system.',
    image: 'https://picsum.photos/id/3/800/400'
  }
];

export const COURSES = [
  {
    id: 'c1',
    title: 'Mastering Web Design',
    students: 850,
    modules: 12,
    progress: 0,
    rating: 4.9,
    price: 199,
    image: 'https://picsum.photos/id/6/800/400',
    description: 'A complete guide to modern web design principles and practices.',
    level: 'Intermediate'
  },
  {
    id: 'c2',
    title: 'UX Research Fundamentals',
    students: 400,
    modules: 8,
    progress: 0,
    rating: 4.7,
    price: 149,
    image: 'https://picsum.photos/id/20/800/400',
    description: 'Learn how to conduct user interviews, usability testing, and synthesis.',
    level: 'Beginner'
  }
];

export const FEEDBACKS = [
  {
    id: 'f1',
    studentName: 'Alex Johnson',
    studentAvatar: 'https://picsum.photos/id/100/50/50',
    rating: 5,
    comment: 'The session on Figma variables was mind-blowing! Sarah explains things very clearly.',
    date: '2023-10-26',
    targetId: 'e1',
    targetName: 'Introduction to Figma',
    targetType: 'Event'
  },
  {
    id: 'f2',
    studentName: 'Maria Garcia',
    studentAvatar: 'https://picsum.photos/id/101/50/50',
    rating: 4,
    comment: 'Great course content, but I wish there were more practical exercises in Module 3.',
    date: '2023-10-20',
    targetId: 'c1',
    targetName: 'Mastering Web Design',
    targetType: 'Course'
  }
];

export const TRAINERS_LIST = [
  CURRENT_TRAINER,
  {
    id: 't2',
    name: 'Michael Chen',
    email: 'm.chen@edutrain.com',
    role: 'trainer',
    avatarUrl: 'https://picsum.photos/id/65/200/200',
    specialization: 'Data Science',
    status: 'pending',
    rating: 0,
    totalStudents: 0,
    joinedDate: '2023-10-20',
    bio: 'Data Scientist seeking to share knowledge.',
    phone: '123-456-7890',
    location: 'San Francisco, USA'
  },
  {
    id: 't3',
    name: 'Emily Davis',
    email: 'emily.d@edutrain.com',
    role: 'trainer',
    avatarUrl: 'https://picsum.photos/id/66/200/200',
    specialization: 'Digital Marketing',
    status: 'active',
    rating: 3.5,
    totalStudents: 450,
    joinedDate: '2022-11-05',
    bio: 'Marketing guru with a passion for SEO.',
    phone: '987-654-3210',
    location: 'London, UK'
  }
];
