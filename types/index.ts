export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  type: 'full-time' | 'intern' | 'co-op' | 'founder';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
    appStore?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  status: 'active' | 'completed';
  type: 'ios' | 'web' | 'ml' | 'full-stack';
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  url?: string;
}
