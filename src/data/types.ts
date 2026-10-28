export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'ai-development' | 'fullstack-web' | 'academic-concept';
  status: 'Completed' | 'In Progress' | 'Academic Exploration';
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  technologies: string[];
  metricsOrScope: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  liveDemoUrl?: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    highlighted?: boolean;
    context?: string;
  }[];
}

export interface TimelineEntry {
  id: string;
  type: 'education' | 'leadership' | 'achievement' | 'internship' | 'certification';
  title: string;
  organization: string;
  period: string;
  location?: string;
  summary: string;
  details?: string[];
  badge?: string;
  highlight?: boolean;
  scoreOrAward?: string;
  credentialId?: string;
  verificationNote?: string;
  image?: string;
}

export interface CreativeArtifact {
  id: string;
  title: string;
  category: string;
  role: string;
  eventOrContext: string;
  description: string;
  image: string;
  tags: string[];
}
