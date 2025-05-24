import {
  Code,
  Database,
  Server,
  UserCheck,
  BarChart2,
  FileText,
} from 'lucide-react';

export const teamMembers = [
  {
    name: 'Xhesika Gjikola',
    role: 'Frontend Developer',
    icon: Code,
    bio: 'Xhesika is a creative frontend developer with a passion for building beautiful and responsive user interfaces.',
  },
  {
    name: 'Nafije Gjuzi',
    role: 'Backend Developer',
    icon: Server,
    bio: 'Nafije specializes in server-side development and API integration, ensuring the backend is robust and efficient.',
  },
  {
    name: 'Eanda Pajaj',
    role: 'Database Administrator',
    icon: Database,
    bio: 'Eanda is responsible for managing the database, ensuring data integrity, and optimizing performance.',
  },
  {
    name: 'Rea Topi',
    role: 'QA Tester',
    icon: UserCheck,
    bio: 'Rea ensures the highest quality in every release, meticulously testing each feature to guarantee a flawless user experience.',
  },
  {
    name: 'Alban Ismajli',
    role: 'Risk and Budget Analyst',
    icon: BarChart2,
    bio: 'Alban analyzes project risks and manages budgets, ensuring every project is delivered on time and within financial constraints.',
  },
  {
    name: 'Viola Makishti',
    role: 'API Specialist & Documentation Support & Backend',
    icon: FileText,
    bio: 'Viola is a backend developer with a focus on API design and technical documentation.',
  },
];

export const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Project Manager',
    image: '/images/client1.jpeg',
    text: 'Biba X transformed our commercial project into a reality. Their attention to detail and commitment to quality is unmatched.',
  },
  {
    name: 'Anna Smith',
    role: 'Architect',
    image: '/images/client2.jpeg',
    text: 'Working with Biba X was a game-changer. They bring innovative designs and exceptional craftsmanship to every project.',
  },
  {
    name: 'Michael Johnson',
    role: 'Homeowner',
    image: '/images/client3.jpeg',
    text: 'Biba X made my dream home come true. The team was professional, responsive, and delivered on time.',
  },
];

export const USER_ROLES = ['admin', 'client', 'worker'];
export const PROJECT_TYPE = ['Residential', 'Commercial', 'Industrial'];
export const PROJECT_STATUS = [
  'Not Started',
  'Ongoing',
  'On Hold',
  'Completed',
];
export const TASK_STATUS = ['Pending', 'In Progress', 'Completed', 'Blocked'];
