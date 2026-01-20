import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  icon: LucideIcon;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}