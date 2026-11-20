export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  categories: string[];
  description: string;
  client?: string;
  industry?: string;
  services?: string[];
  year?: string;
  liveUrl?: string;
  deliverables?: string[];
  gallery?: string[];
}

export interface ManagedProject extends Project {
  isPublished: boolean;
  sortOrder: number;
  imagePublicId?: string;
}
