import { Portfolio, Category } from '@/types';

// Mock API functions for demonstration purposes
// In a real application, these would make actual API calls

export async function fetchFeaturedPortfolios(): Promise<Portfolio[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: '1',
      title: 'Modern Web App',
      description: 'A sleek and responsive web application built with Vue.js',
      author: 'John Doe',
      category: 'Web Development',
      url: 'https://example.com/portfolio1',
      thumbnail: 'https://via.placeholder.com/300x200',
      createdAt: new Date('2023-04-01'),
    },
    // Add more mock featured portfolios here
  ];
}

export async function fetchRecentPortfolios(): Promise<Portfolio[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: '2',
      title: 'Nature Photography Collection',
      description: 'A stunning collection of nature photographs from around the world',
      author: 'Jane Smith',
      category: 'Photography',
      url: 'https://example.com/portfolio2',
      thumbnail: 'https://via.placeholder.com/300x200',
      createdAt: new Date('2023-03-28'),
    },
    // Add more mock recent portfolios here
  ];
}

export async function fetchCategories(): Promise<Category[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    'Web Development',
    'Graphic Design',
    'Photography',
    'Illustration',
    'UX/UI Design',
    'Motion Graphics',
    'Game Development',
  ];
}

export async function submitPortfolio(portfolioData: Partial<Portfolio>): Promise<Portfolio> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, this would send the data to the server
  // and return the newly created portfolio with an ID and createdAt date
  return {
    ...portfolioData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  } as Portfolio;
}