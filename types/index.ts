export type Category =
  | 'Web Development'
  | 'Graphic Design'
  | 'Photography'
  | 'Illustration'
  | 'UX/UI Design'
  | 'Motion Graphics'
  | 'Game Development';

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  author: string;
  category: Category;
  url: string;
  thumbnail: string;
  createdAt: Date;
}