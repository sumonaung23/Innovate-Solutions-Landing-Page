
import React from 'react';
import type { NavLink, Feature, Testimonial } from './types';
import { ChartBarIcon, CpuChipIcon, ShieldCheckIcon } from './components/Icons';

export const NAV_LINKS: NavLink[] = [
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About Us' },
  { href: '#testimonials', label: 'Testimonials' },
];

export const FEATURES: Feature[] = [
  {
    icon: <ChartBarIcon />,
    title: 'Data-Driven Insights',
    description: 'Leverage the power of your data with our advanced analytics to make smarter, faster decisions.',
  },
  {
    icon: <CpuChipIcon />,
    title: 'Scalable Infrastructure',
    description: 'Our robust cloud infrastructure scales with your business, ensuring reliability and performance.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: '24/7 Expert Support',
    description: 'Get peace of mind with around-the-clock support from our team of dedicated professionals.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Innovate Solutions transformed our workflow. Their platform is intuitive, powerful, and has significantly boosted our productivity. Highly recommended!',
    author: 'Jane Doe',
    role: 'CEO, TechCorp',
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
  },
  {
    quote: 'The level of support and expertise from the Innovate team is unparalleled. They are true partners in our success.',
    author: 'John Smith',
    role: 'CTO, FutureGadgets',
    avatarUrl: 'https://picsum.photos/id/1012/100/100',
  },
    {
    quote: 'From integration to daily use, the experience has been seamless. The results speak for themselves - a 40% increase in efficiency.',
    author: 'Samantha Bee',
    role: 'COO, MarketLeap',
    avatarUrl: 'https://picsum.photos/id/1027/100/100',
  },
];
