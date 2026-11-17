export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  categories: string[];
  description: string;
}

export interface ManagedProject extends Project {
  isPublished: boolean;
  sortOrder: number;
}
